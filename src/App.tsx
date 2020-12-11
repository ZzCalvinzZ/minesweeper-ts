import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import Game from "./Game";
import GameContext, { GameConfig, GameStatus } from "./GameContext";
import { generateMinefield } from "./utils/mines";
import { GameTypes, GAME_TYPES } from "./constants";

const useStyles = createUseStyles({
  app: {
    textAlign: "center",
  },
});

function App() {
  const classes = useStyles();

  const [config, setConfig] = useState();
  const [gameType, setGameType] = useState();
  const [gameStatus, setGameStatus] = useState(GameStatus.Select);
  const [minefield, setMinefield] = useState();

  const startGame = (gameType: GameTypes) => {
    const config = GAME_TYPES[gameType];
    console.log(gameType);

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
        {gameStatus === GameStatus.Started && <Game />}
      </GameContext.Provider>
    </div>
  );
}

export default App;
