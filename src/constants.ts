import { CellState, Cell, GameConfig } from "./GameContext";

export const CELL_WIDTH = 30;
export const CELL_HEIGHT = 30;

export const DEFAULT_CELL: Cell = {
  state: CellState.Unopened,
  hasMine: false,
  flagged: false,
};

export const GAME_TYPES: Record<any, GameConfig> = {
  beginner: {
    columns: 8,
    rows: 8,
    mines: 10,
  },
  intermediate: {
    columns: 16,
    rows: 16,
    mines: 40,
  },
  expert: {
    columns: 30,
    rows: 16,
    mines: 99,
  },
};

export enum GameTypes {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  EXPERT = "expert",
}
