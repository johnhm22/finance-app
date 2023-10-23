type ButtonProps = {
  label: string;
  iconURL?: string;
  onClick?: () => void;
};

const ButtonLarge = ({ label, iconURL, onClick }: ButtonProps) => {
  return (
    <button
      className={
        'flex bg-blue-700 justify-center items-center rounded-full h-6 md:h-12 w-full p-5 hover:bg-blue-800 text-base md:text-xl text-white'
      }
      onClick={onClick}
    >
      {label}
      {iconURL && (
        <img
          src={iconURL}
          alt='arrow right icon'
          className='ml-2 rounded-full bg-white w-5 h-5'
        />
      )}
    </button>
  );
};

export default ButtonLarge;
