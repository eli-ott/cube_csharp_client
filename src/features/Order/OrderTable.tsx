import React from 'react';
import OrderItem from './OrderItem';
import { useOrder } from '../../hooks/OrderContext';

const OrderTable = () => {
  const { order } = useOrder();
  return (
    <div className=" w-full max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Récapitulatif de vos commandes</h1>
      <div className="grid grid-cols-1  gap-6">
        {order?.items.map((orderLine, index) => (
          <OrderItem 
            key={index}
            orderLine={orderLine}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderTable;
