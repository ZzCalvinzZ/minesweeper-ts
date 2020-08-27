import { CellState, Cell } from "./GameContext";

export const CELL_WIDTH = 40;
export const CELL_HEIGHT = 40;

export const COLUMNS = 8;
export const ROWS = 8;
export const MINES = 10;

export const DEFAULT_CELL: Cell = {
  state: CellState.Unopened,
  hasMine: false,
};
