import { useEffect, useState } from "react";
import { IOrder } from "../../models/orderModel";
import { getOrderById } from "../../services/order";
import { useNavigate, useParams } from "react-router-dom";
import { notify } from "../../utils/notify";
import placeholder from '../../assets/images/placeholder.png';

const OrderDetailsDisplay: React.FC = () => {
  const [order, setOrder] = useState<IOrder | null>(null);
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (orderId) {
        try {
          const fetchedOrder = await getOrderById(orderId);
          setOrder(fetchedOrder);
        } catch (error) {
          notify("Erreur lors de la récupération de la commande", "error");
        }
      } else {
        notify("Identifiant de commande non trouvé", "error");
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  if (!order)
    return <div className="text-center text-gray-600">Chargement...</div>;

  const { deliveryDate, status, customer, lines } = order;
  const formattedDate = new Date(deliveryDate).toLocaleDateString();

  return (
    <div className="max-w-4xl mx-auto  bg-white p-6 rounded-lg shadow-lg space-y-6 mt-20 mb-4">
        <button onClick={() => navigate(-1)} className="cursor-pointer absolute top-2 left-2 text-2xl font-semibold text-[#333333]">
            Retour
        </button>
      {/* En-tête de la commande */}
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Détails de la commande #{orderId}
        </h1>
        <div className="mt-2 text-gray-700">
          <p>
            <span className="font-semibold">Date de livraison :</span>{" "}
            {formattedDate}
          </p>
          <p>
            <span className="font-semibold">Statut :</span> {status.name}
          </p>
        </div>
      </div>

      {/* Informations du client */}
      <div className="border-b pb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Informations du client
        </h2>
        <p className="text-gray-700">
          {customer.firstName} {customer.lastName}
        </p>
        <p className="text-gray-700">{customer.email}</p>
        <p className="text-gray-700">{customer.phone}</p>
        <p className="text-gray-700">
          {customer.address.addressLine}, {customer.address.city} (
          {customer.address.zipCode})
        </p>
      </div>

      {/* Produits commandés */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Produits commandés
        </h2>
        <div className="space-y-4">
          {lines.map((line, index) => {
            const product = line.product;
            // Vérification de la promotion (discount)
            let finalPrice: number | undefined = product.unitPrice;
            if (product.discount) {
              const discountValue = product.discount.value;
              finalPrice =
                (finalPrice ?? 0) - ((finalPrice ?? 0) * discountValue) / 100;
            }

            // Utilisation de la première image ou d'un placeholder
            const imageUrl =
              product.images && product.images.length > 0
                ? product.images[0].imageUrl
                : placeholder;

            return (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center bg-gray-100 p-4 rounded-lg shadow"
              >
                <img
                onClick={() => navigate(`/product/${product.productId}`)}
                  src={imageUrl}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-md mb-2 sm:mb-0 sm:mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-gray-700">
                    Producteur : {product.supplier.firstName}{" "}
                    {product.supplier.lastName}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Prix unitaire :</span>{" "}
                    {product.unitPrice} €
                  </p>

                  {/* Affichage du prix après promotion si applicable */}
                  {product.discount && (
                    <p className="text-red-600">
                      <span className="font-semibold">
                        Prix après réduction :
                      </span>{" "}
                      {finalPrice && finalPrice.toFixed(2)} €
                    </p>
                  )}

                  <p className="text-gray-700">
                    <span className="font-semibold">Quantité :</span>{" "}
                    {line.quantity}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsDisplay;
