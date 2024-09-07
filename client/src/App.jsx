import { useState } from 'react'
import Square from './components/Square'

function App() {

  const [ gameState, setGameState ] = useState([
    [1,2,3],
    [4,5,6],
    [7,8,9]
  ])

  const [ currPlayer, setCurrPlayer ] = useState('circle');
  const [ finishedState, setFinishedState ] = useState(false);


  return (
    <section className='flex justify-center items-center h-screen gap-20 flex-col'>
      <div className='flex justify-between items-center gap-40'>
        <div className='bg-orange-200 rounded-bl-3xl rounded-tr-3xl px-4 py-2'>
            Opponent
        </div>
        <div className='bg-red-200 px-4 py-2 rounded-bl-3xl rounded-tr-3xl'>
            You
        </div>
      </div>
      <h1 className='bg-slate-400 px-4 py-2 text-3xl font-mono rounded-md uppercase tracking-wider'> Tic-Tac-Toe </h1>
      <div className='w-fit grid gap-2 grid-cols-3'>
        {
          gameState.map((ele, rowIndex) =>
            ele.map((el, colIndex) => <Square
            finishedState={finishedState}
            setFinishedState={setFinishedState}
            id={rowIndex * 3 + colIndex}
            setGameState = {setGameState} 
            currPlayer={currPlayer} 
            setCurrPlayer={setCurrPlayer}  
            key={rowIndex * 3 + colIndex}/>
          )
          )
        }
      </div>
    </section>
  )
}

export default App
