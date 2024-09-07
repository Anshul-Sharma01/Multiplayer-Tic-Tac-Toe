import { useEffect, useState } from 'react'
import Square from './components/Square'

function App() {


  const [ gameState, setGameState ] = useState([
    [1,2,3],
    [4,5,6],
    [7,8,9]
  ])

  const [ currPlayer, setCurrPlayer ] = useState('circle');
  const [ finishedState, setFinishedState ] = useState(false);
  const [ finishedArrayState, setFinishedArrayState] = useState([]);

  const checkWinner = () => {

    for(let row = 0; row < gameState.length; row++){
      if(gameState[row][0] === gameState[row][1] && gameState[row][1] === gameState[row][2]){
        setFinishedArrayState(row * 3 + 0, row * 3 + 1, row * 3 + 2);
        return gameState[row][0];
      }
    }

    for(let col = 0; col < gameState.length; col++){
      if(gameState[0][col] === gameState[1][col] && gameState[1][col] === gameState[2][col]){
        return gameState[0][col];
      }
    }

    if (gameState[0][0] === gameState[1][1] && gameState[1][1] === gameState[2][2]) {
      return gameState[0][0];
    }
  

    if (gameState[0][2] === gameState[1][1] && gameState[1][1] === gameState[2][0]) {
      return gameState[0][2];
    }

    const isDrawn = gameState.flat().every(e => {
      if(e === 'circle' || e === 'cross'){
        return true;
      }
    })
    if(isDrawn){
      return "draw";
    }

    return null;

  }

  useEffect(() => {
    const winner = checkWinner();
    if(winner){
      setFinishedState(winner);
    }
  }, [gameState]);

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
            finishedArrayState = {finishedArrayState}
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
      <div>
        {
          finishedState && finishedState !== "draw" &&(
            <h3 className='text-white font-bold font-mono tracking-widest text-4xl capitalize px-4 py-2 mb-20'> {finishedState} won the game </h3>
          )
        }
        {
          finishedState && finishedState === "draw" && (
            <h3 className='text-5xl font-semibold text-white uppercase px-4 py-2 tracking-widest font-mono'>
              Game Drawn
            </h3>
          )
        }
      </div>
    </section>
  )
}

export default App
