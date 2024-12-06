import React from 'react';
import {range} from "../../utils";
import {NUM_OF_GUESSES_ALLOWED} from "../../constants";
import {checkGuess} from "../../game-helpers";

function GuessResults({guessList, answer, handleOnGameHasFinished}) {
  return (
    <div className="guess-results">
      {range(0, NUM_OF_GUESSES_ALLOWED, 1).map(row => {
        const currentRow = guessList[row];
        const checkedWord = checkGuess(currentRow?.word, answer);

        const hasWon = checkedWord?.every(cell => cell.status === 'correct');
        if (hasWon) handleOnGameHasFinished(true);
        if (row === NUM_OF_GUESSES_ALLOWED - 1 && !hasWon && currentRow !== undefined) handleOnGameHasFinished(false);

        return (
          <p key={row} className="guess">
            {range(0, 5, 1).map(cell => {
              if (currentRow === undefined) return <span key={cell} className="cell"></span>

              const {letter, status} = checkedWord[cell];
              return (
                <span key={cell} className={`cell ${status}`}>{letter}</span>
              )
            })}
          </p>
        )
      })}
    </div>
  )
}

export default GuessResults;
