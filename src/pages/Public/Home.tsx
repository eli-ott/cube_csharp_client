import { logOut } from '../../services/authentification';

const Home = () => {
    return (
        <main className="">
            <button onClick={()=>logOut()}>Deco</button>
        </main>
    );
};

export default Home;