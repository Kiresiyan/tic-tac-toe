import useTicTacToe from "../hooks/useTicTacToe";
import { useState } from "react";
import ConfettiExplosion from 'react-confetti-explosion';

const TicTacToe = () =>{
    const [boardSize,setBoardSize] = useState('')
    const [currentValue,setCurrentValue] = useState('')
    const {getStatusMessage,handleClick,reset,board,isExploding}=useTicTacToe(boardSize)
    
    const handleChange=(e)=>{
        const inputNumber=parseInt(e.target.value)
        inputNumber > 2 ? setCurrentValue(inputNumber) : setCurrentValue('')
    }
    const startGame=()=>{
        setBoardSize(currentValue)
        setCurrentValue('')
    }
    return (
        <div className={'main-container'}>
            {isExploding && <ConfettiExplosion />}
         <div className={'input-panel'}>
            <input
            value={currentValue}
            onChange={(e) => handleChange(e)}
                    className={'input'}
                    placeholder={'Enter the number'}
                />
                <button
                    onClick={startGame}
                    className={'start-button'}
                    disabled={!currentValue}
                >
                    Start
                </button>
            </div>
            <div className={'board-container'} style={{'maxWidth': `calc(${boardSize} * 100px)`}}>
                {board.length !== 0 && <>
                    <div className={'top-panel'}>
                        {getStatusMessage()}
                        <button
                            className={'reset-button'}
                            onClick={() => reset(3)}
                        >
                            Reset
                        </button>
                    </div>
                    <div className={'board'} style={{'gridTemplateColumns': `repeat(${boardSize},1fr)`}}>
                        {board.map((cell, index) =>
                            <button
                                onClick={() => handleClick(index)}
                                disabled={cell}
                                className={`cell ${cell}`}
                                key={index}
                            >
                                {cell}
                            </button>)
                        }
                    </div>
                </>}
            </div>
        </div>
    );
}

export default TicTacToe

