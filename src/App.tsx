import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import Game from "./Game";
import GameContext, { GameStatus, GameConfig, Minefield } from "./GameContext";
import { generateMinefield } from "./utils/mines";
import { GameTypes, GAME_TYPES } from "./constants";

const useStyles = createUseStyles({
  app: {
    textAlign: "center",
  },
});

function App() {
  const classes = useStyles();

  const [config, setConfig] = useState<GameConfig | undefined>();
  const [gameType, setGameType] = useState<GameTypes | undefined>();
  const [gameStatus, setGameStatus] = useState(GameStatus.Select);
  const [minefield, setMinefield] = useState<Minefield | undefined>();

  const startGame = (gameType: GameTypes) => {
    const config = GAME_TYPES[gameType];

    setConfig(config);
    setGameType(gameType);
    setGameStatus(GameStatus.Started);
    setMinefield(generateMinefield(config));
  };

  return (
    <div className={classes.app}>
      <GameContext.Provider
        value={{
          minefield,
          setMinefield,
          config,
          gameStatus,
          setGameStatus,
        }}
      >
        <h1>Minesweeper</h1>
        {gameStatus === GameStatus.Select && (
          <>
            <h2>Pick a level</h2>
            <button onClick={() => startGame(GameTypes.BEGINNER)}>
              Beginner
            </button>
            <button onClick={() => startGame(GameTypes.INTERMEDIATE)}>
              Intermediate
            </button>
            <button onClick={() => startGame(GameTypes.EXPERT)}>Expert</button>
          </>
        )}
        {gameStatus === GameStatus.Started && <h2>{gameType}</h2>}
        {[GameStatus.Started, GameStatus.Won, GameStatus.Lost].includes(
          gameStatus
        ) && <Game />}

        {gameStatus === GameStatus.Won && (
          <div>
            <h2>Congratulations, you won! :)</h2>
            <button onClick={() => setGameStatus(GameStatus.Select)}>
              New Game!
            </button>
          </div>
        )}

        {gameStatus === GameStatus.Lost && (
          <div>
            <h2>Oh No, you got blowed up :(</h2>
            <button onClick={() => setGameStatus(GameStatus.Select)}>
              New Game!
            </button>
          </div>
        )}
      </GameContext.Provider>
    </div>
  );
}

export default App;
