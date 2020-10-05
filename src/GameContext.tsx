import React from "react";
import Minefield from "./components/Minefield";

export enum CellState {
  Unopened,
  Opened,
  Flagged,
}

export type Cell = {
  state: CellState;
  hasMine: Boolean;
  flagged: Boolean;
  surroundingMines?: number;
};
export type Minefield = Cell[][];

export type GameContextType = {
  minefield?: Minefield;
  setMinefield: React.Dispatch<any>;
  gameStarted?: Boolean;
  setGameStarted: React.Dispatch<any>;
  config?: {
    columns: number;
    rows: number;
    mines: number;
  };
};

const GameContext = React.createContext<GameContextType>({
  setMinefield: () => {},
  setGameStarted: () => {},
});

export default GameContext;
