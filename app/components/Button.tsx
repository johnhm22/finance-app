type ButtonProps = {
  label: string;
  backgroundColour: string;
  borderColour?: string;
  textColour: string;
  iconURL?: string;
  onClick?: () => void;
};

const Button = ({
  label,
  backgroundColour,
  borderColour,
  textColour,
  iconURL,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`flex justify-center items-center rounded-full w-28 md:w-48 md:text-base text-sm mt-5 gap-2 px-2 md:px-5 py-1 md:py-3 hover:cursor-pointer border  font-semibold leading-none ${backgroundColour} ${backgroundColour} ${textColour} ${borderColour}`}
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

export default Button;
