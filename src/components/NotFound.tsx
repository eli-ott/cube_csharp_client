const NotFound = ({ text }: { text: string }) => {
    return (
      <div className="flex flex-col items-center justify-center text-center px-4 py-8">
        <img
          className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64"
          src={require("../assets/images/not_found_image.svg").default}
          alt="Not found"
          title="Not found"
        />
        <h1 className="mt-4 text-lg md:text-xl lg:text-2xl font-bold text-[#333333]">{text}</h1>
      </div>
    );
  };
  
  export default NotFound;
  