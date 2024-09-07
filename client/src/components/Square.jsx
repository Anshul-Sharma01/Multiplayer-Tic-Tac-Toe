import React, { useState } from "react";
import { FaRegCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";

function Square({ id, currPlayer, setCurrPlayer, setGameState, finishedState, setFinishedState }){

    const [icon, setIcon] = useState(null);

    function updateSquareIcon(){
        if(!icon ){
            if(currPlayer === 'circle'){
                setIcon(<FaRegCircle/>);
            }else{
                setIcon(<ImCross/>);
            }

            const myCurrPlayer = currPlayer;

            setCurrPlayer ( currPlayer === 'circle' ? "cross" : "circle");
            setGameState(prev => {
                let newState = [...prev];
                const rowIndex = Math.floor(id / 3);
                const colIndex = id % 3;
                newState[rowIndex][colIndex] = myCurrPlayer

                console.log(prev);
                return newState;
            })
        }

    }

    return(
        <>
            <div onClick={updateSquareIcon}  className="text-white  text-5xl  flex justify-center items-center bg-slate-500 hover:cursor-pointer border-solid border-2 border-white w-[120px] h-[120px] rounded-lg">
                {icon}
            </div>
        </>
    )
}

export default Square;