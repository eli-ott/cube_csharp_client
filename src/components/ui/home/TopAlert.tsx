
const TopAlert = ({text} : {text:string}) => {
  return (
    <div className="w-full h-auto py-2 bg-[#FDFFB5] text-center px-4">
      <p className="text-[#333333] text-sm sm:text-base md:text-lg">
      {text}
      </p>
    </div>
  );
};

export default TopAlert;
