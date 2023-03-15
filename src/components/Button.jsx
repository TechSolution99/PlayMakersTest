import { twMerge } from 'tailwind-merge'
const Button = ({className, text, onClick}) => {
  return (
    <button
      className={twMerge(
        'font-bold text-xl border-2 border-[#e79c2a] px-4 py-2 transition ease-in-out duration-300 hover:bg-[#e79c2a] hover:text-[#141e30]',
        className
      )}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button