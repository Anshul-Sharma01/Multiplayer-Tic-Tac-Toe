import { useEffect, useState } from 'react'
import Square from './components/Square.jsx'
import { io } from "socket.io-client";
const socket = io("http://localhost:3000", {
  autoConnect : true
})


function App() {


  const [ gameState, setGameState ] = useState([
    [1,2,3],
    [4,5,6],
    [7,8,9]
  ])

  const [ currPlayer, setCurrPlayer ] = useState('circle');
  const [ finishedState, setFinishedState ] = useState(false);
  const [ finishedArrayState, setFinishedArrayState] = useState([]);
  const [ playOnline, setPlayOnline ] = useState(false);

  const checkWinner = () => {
    // Check rows
    for(let row = 0; row < gameState.length; row++){
      if(gameState[row][0] === gameState[row][1] && gameState[row][1] === gameState[row][2]){
        setFinishedArrayState([row * 3 + 0, row * 3 + 1, row * 3 + 2]);
        return gameState[row][0];
      }
    }
    
    // Check columns
    for(let col = 0; col < gameState.length; col++){
      if(gameState[0][col] === gameState[1][col] && gameState[1][col] === gameState[2][col]){
        setFinishedArrayState([0 * 3 + col, 1 * 3 + col, 2 * 3 + col]); // Updated
        return gameState[0][col];
      }
    }
  
    // Check diagonal (left to right)
    if (gameState[0][0] === gameState[1][1] && gameState[1][1] === gameState[2][2]) {
      setFinishedArrayState([0, 4, 8]);
      return gameState[0][0];
    }
  
    // Check diagonal (right to left)
    if (gameState[0][2] === gameState[1][1] && gameState[1][1] === gameState[2][0]) {
      setFinishedArrayState([2, 4, 6]);
      return gameState[0][2];
    }
  
    // Check draw
    const isDrawn = gameState.flat().every(e => e === 'circle' || e === 'cross');
    if(isDrawn){
      return "draw";
    }
  
    return null;
  };


  
  useEffect(() => {
    const winner = checkWinner();
    if(winner){
      setFinishedState(winner);
    }
  }, [gameState]);

  if(!playOnline){
    return <div className='flex flex-col justify-center items-center h-[100vh]'>
      <button className='bg-yellow-400 font-extrabold px-6 py-4 rounded-lg font-mono tracking-widest text-4xl uppercase hover:bg-yellow-500'>Play Online</button>
    </div>
  }

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
