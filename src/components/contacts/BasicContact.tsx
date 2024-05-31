interface BasicContactProps {
  children: React.ReactNode;
  url: string;
}

const BasicContact = ({ children, url }: BasicContactProps) => {
  return (
    <a
      href={url}
      className="text-[8px] sm:text-[10px] bg-mid-blue-300 sm:bg-slate-350/[25%] backdrop-blur-xl drop-shadow-2xl-c text-white font-bold sm:font-normal sm:text-slate-200/[35%] rounded-xl py-1 px-2 whitespace-nowrap grow text-center"
    >
      {children}
    </a>
  );
};

export default BasicContact;
