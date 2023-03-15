import { twMerge } from 'tailwind-merge'
const ScoreBox = ({className, userWin, tie, botWin}) => {

  return (
    <div className={twMerge('border-2 border-[#e79c2a] p-4 text-[white] min-w-[160px]', className)}>
      <div className='font-black text-2xl'>SCOREBOARD</div>
      <div className='grid grid-cols-3 py-2 gap-y-2 font-bold'>
        <div>WIN</div>
        <div>TIE</div>
        <div>LOSE</div>
        <div key={'user' + userWin} className='transition ease-in-out duration-300 animate-appear text-xl'>{userWin}</div>
        <div key={'tie' + tie} className='transition ease-in-out duration-300 animate-appear text-xl'>{tie}</div>
        <div key={'bot' + botWin} className='transition ease-in-out duration-300 animate-appear text-xl'>{botWin}</div>
      </div>
    </div>
  )
}

export default ScoreBox