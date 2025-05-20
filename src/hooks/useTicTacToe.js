import {useEffect, useMemo, useState, useCallback} from "react";

const useTicTacToe = (boardSize)=>{
    const initialBoard= useCallback(() => Array(boardSize*boardSize).fill(null),[boardSize])
    const [isXNext,setIsXNext] = useState(true)
    const [board,setBoard] = useState([])
    const [isExploding, setIsExploding] = useState(false);

    const winningPatterns = useMemo(() => {
        if(boardSize){
            const returnArray=[]
            //horizontal
            for(let i=0; i<boardSize; i++){
                let pattern=[]
                for(let j=0; j<boardSize; j++){
                    pattern.push((i*boardSize) +j)
                }
                returnArray.push(pattern)
            }
            //vertical
            for(let i=0; i<boardSize; i++){
                let pattern=[]
                for(let j=0; j<boardSize; j++){
                    pattern.push((j*boardSize) +i)
                }
                returnArray.push(pattern)
            }
            //diagonal
            let diagonal1=[]
            let diagonal2=[]
            for(let i=0; i<boardSize; i++){
                let x = boardSize-1
                diagonal1.push((i*boardSize)+i)
                diagonal2.push((i*x)+(x))
            }
            returnArray.push(diagonal1)
            returnArray.push(diagonal2)
            return returnArray
        }

    }, [boardSize]);

    useEffect(()=>{
        setBoard(initialBoard())
    },[ boardSize,initialBoard])


    const getStatusMessage = ()=>{
        const winner = checkWinner()
        if(!winner){
            if(board.includes(null)){
                return <div className={isXNext ? 'player-x' : 'player-o'}>Player  {isXNext ? 'x':'O'} turn</div>
            }
        return <div className='draw'>Match draw</div>
        } 
        !isExploding && setIsExploding(true)
        return <div className={winner === 'X' ? 'player-x' : 'player-o'}>{winner} won the game!</div>
    }
    const checkWinner = () => {
        for (const i of winningPatterns ) {
            const firstValue = board[i[0]];
            let winner = true
            for(const j of i){
               if (firstValue !== board[j]){
                   winner = false
                   break
               }
            }
            if(winner){
                return firstValue
            }
        }
        return null

    };
    const handleClick = (index)=>{
       const winner =  checkWinner()
        if(winner || board[index]) return
        let newBoard = [...board]
        newBoard[index] = isXNext ? 'X' :'O'
        setBoard(newBoard)
        setIsXNext(!isXNext)
    }
    const reset = (boardLength)=>{
        setBoard(initialBoard(boardLength))
        setIsXNext(true)
        setIsExploding(false)

    }
   return {
    initialBoard,
    getStatusMessage,
    checkWinner,
    reset,
    isXNext,
    board,
    handleClick,
    isExploding
}
}

export default useTicTacToe