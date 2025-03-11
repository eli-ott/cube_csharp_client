import { logOut } from '../../services/authentification';

const Home = () => {
    return (
        <main className="text-3xl font-bold underline">
            Hello world!
            <button onClick={()=>logOut()}>Deco</button>
        </main>
    );
};

export default Home;