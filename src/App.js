import './App.css'
import { useEffect, useState } from 'react'
import PlayerBox from './components/PlayerBox'
import ScoreBox from './components/ScoreBox'
import Button from './components/Button'

function App() {
  const [userChoice, setUserChoice] = useState(-1)
  const [botChoice, setBotChoice] = useState(-1)
  const [matchStatus, setMatchStatus] = useState(false)
  const [userPreparing, setUserPreparing] = useState(false)
  const [botPreparing, setBotPreparing] = useState(false)
  const [userWin, setUserWin] = useState(0)
  const [tie, setTie] = useState(0)
  const [botWin, setBotWin] = useState(0)
  const [message, setMessage] = useState()

  const rand = () => Math.ceil(Math.random() * 1000) % 3

  const onSelect = (choice) => {
    setMatchStatus(true)
    setMessage('')
    if ( choice === 3 ) {
      setUserChoice(0)
      setBotChoice(-1)
      setUserPreparing(true)
      setTimeout(() => {
        setUserChoice(rand())
        setUserPreparing(false)
        botThrow()
      }, 1500)
      return
    }
    setUserChoice(choice)
    botThrow()
  }

  useEffect(() => {
    if ( matchStatus === false && userChoice >= 0 && botChoice >= 0 ) {
      if ( userChoice === botChoice ){
        setTie( prev => prev + 1 )
        setMessage(`It's a tie!`)
      } else if ( (userChoice + 1) % 3 === botChoice ) {
        setUserWin( prev => prev + 1 )
        setMessage('You win!')
      } else {
        setBotWin( prev => prev +1 )
        setMessage('You Lose!')
      }
    }
  }, [userChoice, botChoice, matchStatus])

  const botThrow = () => {
    setTimeout(() => {
      setBotPreparing(true)
      setBotChoice(0)
      setTimeout(() => {
        setBotChoice(rand())
        setBotPreparing(false)
        setMatchStatus(false)
      }, 1500)
    }, 500)
  }

  const reset = () => {
    setUserWin(0)
    setBotWin(0)
    setTie(0)
    setMessage('')
    setUserChoice(-1)
    setBotChoice(-1)
  }

  return (
    <div className='text-[white] text-center'>
      <div className='text-5xl font-bold py-8'>ROCK, PAPER, SCISSORS</div>
      <ScoreBox className='w-[30%] md:min-w-[160px] md:max-w-[720px] m-auto my-4' userWin={userWin} tie={tie} botWin={botWin}/>
      <div className='flex flex-col md:flex-row items-center justify-center w-[70%] md:min-w-[480px] m-auto'>
        <PlayerBox name='PLAYER' choice={userChoice} setChoice={setUserChoice} onSelect={onSelect} user={true} preparing={userPreparing} match={matchStatus}/>
        <div className='flex flex-col px-10 gap-4'>
          <Button text='RESET' onClick={reset}/>
          <div className='font-black text-3xl'>VS</div>
        </div>
        <PlayerBox name='COMPUTER' choice={botChoice} setChoice={setBotChoice} preparing={botPreparing}/>
      </div>
      <div className='py-2 text-xl font-bold'>{message}</div>
    </div>
  )
}

export default App
