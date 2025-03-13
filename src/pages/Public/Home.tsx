import CarouselHome from '../../components/ui/home/CarouselHome';
import HomeSection from '../../components/ui/home/HomeInfoSection';
import TopAlert from '../../components/ui/home/TopAlert';
import { useProducts } from '../../hooks/HomeCarouselContext';
import { logOut } from '../../services/authentification';

const Home = () => {
    const text = "Nouveau client ? Bénéficiez d’une remise de 10% dès 60€ d’achat sur votre première commande !"
    const {products} = useProducts();
    return (
        <main>
            <TopAlert text={text}/>
            <CarouselHome products={products} />
            <HomeSection/>

            <button onClick={()=>logOut()}>Deco</button>
        </main>
    );
};

export default Home;