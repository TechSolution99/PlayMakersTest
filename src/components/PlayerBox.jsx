import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandRock, faHandPaper, faHandScissors, faQuestion } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

const PlayerBox = ({name, choice, setChoice, onSelect, user, preparing, match}) => {
  const icons = [faHandRock, faHandScissors, faHandPaper]
  if ( user ) icons.push(faQuestion)

  const [timer, setTimer] = useState(0)
  
  const timerId = useRef()

  useEffect(() => {
    if ( preparing ) {
      setTimer(3)
      timerId.current = setInterval(() => {
        setChoice(prev => prev === 2 ? prev : prev + 1)
        setTimer(timer => {
          if ( timer === 0 ) {
            clearInterval(timerId.current)
            return 0
          }
          return timer - 1
        })
      }, 500)
      return () => clearInterval(timerId.current)
    }
  }, [preparing])

  return (
    <div className='p-4 my-6 text-[white] w-full max-w-[350px] min-w-[150px] relative'>
      <div className={twMerge(
        'border-2 border-[#e79c2a] w-full h-full top-0 left-0 absolute transition ease-in-out duration-300 pointer-events-none',
        preparing ? 'scale-110' : ''
        )}
      />
      <div className='font-black text-2xl'>{name}</div>
      <div className='h-[64px] my-4'>
        {
          preparing ?
          <div className='text-6xl font-bold'>
            {timer}
          </div> :
          <FontAwesomeIcon
            className={twMerge('', choice >= 0 ? 'text-[#e79c2a]' : '')}
            icon={choice >= 0 ? icons[choice] : faQuestion}
            size='4x'
          />
        }
      </div>
      <div className='flex justify-center gap-4'>
        {
          icons.map((icon, index) => (
            <div
              className={
                twMerge('cursor-pointer transition ease-in-out duration-500',
                  (match || !user) ? 'cursor-default' : 'hover:text-[#e79c2a]',
                  choice === index ? 'text-[#e79c2a]' : '')
              }
              key={index}
              onClick={() => user && !match && onSelect(index) }
            >
              <FontAwesomeIcon
                icon={icon}
                size={'2x'}
              />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default PlayerBox