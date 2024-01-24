import { useState } from "react";
import Card from "../Card/Card";
import './Grid.css';
import isWinner from "../../helpers/checkWinner";

function Grid({ numberOfCards}){
    const[winner, setWinner] = useState(null);
    const[board, setBoard] = useState(Array(numberOfCards).fill(""));
    const[turn, setTurn] = useState(true);//true=>O
    function play(index){
        if(turn == true){
            board[index] = "O";
        }else{
            board[index] = "X";
        }
        const win = isWinner(board, turn ? "O" : "X");
        if(win) {
        setWinner(win);


        }


        setBoard([...board]);
        setTurn(!turn);
    }
    function reset(){
        setWinner(null);
        setTurn(true);
        setBoard(Array(numberOfCards).fill(""));
    }

    
    return(
        <div className="grid-wrapper">
            <h1 className="turn-highlight" id="current">Current Turn: {(turn)? 'O':'X'}</h1>
            <div className="grid">
                {board.map((el, idx) => <Card gameEnd={winner} key={idx} onPlay={play} player={el} index={idx}/>)}
            </div>
            <button className="reset" onClick={reset}>Reset Game</button>
            {
                winner &&(
                    <>
                        <h1 className="turn-highlight">Winner is {winner}</h1>
                        
                    </>
                )
            }
        </div>
    );
}

export default Grid;