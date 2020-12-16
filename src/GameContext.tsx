import React from "react";
import Minefield from "./components/Minefield";

export enum CellState {
  Unopened,
  Opened,
  Flagged,
}

export enum GameStatus {
  Select,
  Started,
  Won,
  Lost,
}

export type GameConfig = {
  columns: number;
  rows: number;
  mines: number;
};

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
  gameStatus?: GameStatus;
  setGameStatus: React.Dispatch<any>;
  config?: GameConfig;
};

const GameContext = React.createContext<GameContextType>({
  setMinefield: () => {},
  setGameStatus: () => {},
});

export default GameContext;
