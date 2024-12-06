import Header from '../Header';
import GuessInput from "../GuessInput";
import GuessResults from "../GuessResults";
import React from 'react';
import {sample} from "../../utils";
import {WORDS} from "../../data";

const answer = sample(WORDS);
console.info({answer});

function App() {
  const [guessList, setGuessList] = React.useState([]);
  const [hasFinishedGame, setHasFinishedGame] = React.useState(undefined);

  const handleOnGuessSubmitted = (guess) => {
    if (guess.length !== 5) {
      return;
    }

    setGuessList((prevGuessList) => {
      const newGuessList = [...prevGuessList];
      newGuessList.push({
        id: Date.now(),
        word: guess,
      });

      return newGuessList;
    });
  }

  const handleOnGameHasFinished = (won) => {
    setHasFinishedGame(won);
  }

  return (
    <div className="wrapper">
      <Header/>

      <div className="game-wrapper">
        <GuessResults
          guessList={guessList}
          answer={answer}
          handleOnGameHasFinished={handleOnGameHasFinished}
        />
        <GuessInput
          handleOnSubmitted={handleOnGuessSubmitted}
          disabled={hasFinishedGame !== undefined}
        />
      </div>

      {hasFinishedGame === true && (
        <div className="happy banner">
          <p>
            <strong>Congratulations!</strong> Got it in {' '}
            <strong>{guessList.length} guesses</strong>.
          </p>
        </div>
      )}

      {hasFinishedGame === false && (
        <div className="sad banner">
          <p>Sorry, the correct answer is <strong>{answer}</strong>.</p>
        </div>
      )}
    </div>
  );
}

export default App;
