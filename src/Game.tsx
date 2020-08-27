import React, { useState } from "react";
import Minefield from "./components/Minefield";
import GameContext from "./GameContext";
import { COLUMNS, ROWS, MINES } from "./constants";
import { generateMinefield } from "./utils/mines";

function App() {
  const [config, setConfig] = useState({
    columns: COLUMNS,
    rows: ROWS,
    mines: MINES,
  });
  const [minefield, setMinefield] = useState(
    generateMinefield(config.columns, config.rows, config.mines)
  );
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <GameContext.Provider
      value={{
        minefield,
        setMinefield,
        gameStarted,
        setGameStarted,
        config
      }}
    >
      <div className="Game">
        <Minefield></Minefield>
      </div>
    </GameContext.Provider>
  );
}

export default App;
