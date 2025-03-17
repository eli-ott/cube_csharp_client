import RedirectionButton from '../components/common/RedirectionButton';

const Error404 = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
            <img 
                src={require("../assets/images/error_page/404_illustration.svg").default} 
                alt="404 Not Found" 
                className="w-full max-w-md mb-6"
            />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Oups ! Page introuvable</h1>
            <p className="text-gray-600 mb-6">La page que vous recherchez n'existe pas ou a été déplacée.</p>
            <RedirectionButton label="Retour à l'accueil" destination="/"/>
        </div>
    );
};

export default Error404;
