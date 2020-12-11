import { DEFAULT_CELL } from "../constants";
import { getRandomInt } from "./random";
import { Minefield, CellState, GameConfig } from "../GameContext";
import cloneDeep from "lodash.clonedeep";

export const generateMinefield = (config: GameConfig) => {
  const { columns, rows, mines } = config;

  // create empty field
  const minefield: Minefield = Array(rows)
    .fill(null)
    .map(() =>
      Array(columns)
        .fill(null)
        .map(() => ({ ...DEFAULT_CELL }))
    );

  const fillMine = () => {
    const column = getRandomInt(columns);
    const row = getRandomInt(rows);
    const cell = minefield[row][column];

    if (cell.hasMine) {
      fillMine();
    } else {
      cell.hasMine = true;
    }
  };

  // fill field with mines
  Array(mines)
    .fill(null)
    .forEach(() => {
      fillMine();
    });

  return minefield;
};

const getCell = (column: number, row: number, minefield: Minefield) => {
  if (!minefield[column]) return null;
  if (!minefield[column][row]) return null;

  return minefield[column][row];
};

export const revealCell = (
  column: number,
  row: number,
  minefield: Minefield
): Minefield => {
  let newMinefield = cloneDeep(minefield);
  const columns = [column - 1, column, column + 1];
  const rows = [row - 1, row, row + 1];
  const mainCell = getCell(column, row, newMinefield);

  // if cell is out of bounds or opened already
  if (!mainCell) return newMinefield;
  if (mainCell.state === CellState.Opened) return newMinefield;
  if (mainCell.state === CellState.Flagged) return newMinefield;

  // set the cell as opened
  mainCell.state = CellState.Opened;

  if (mainCell.hasMine) return newMinefield;

  let surroundingMines: number = 0;

  // check surrounding cells for mine
  columns.forEach((c) => {
    rows.forEach((r) => {
      const cell = getCell(c, r, newMinefield);
      if (!cell) return;
      if (cell.state === CellState.Opened) return newMinefield;
      if (cell.hasMine) surroundingMines = surroundingMines + 1;
    });
  });

  newMinefield[column][row].surroundingMines = surroundingMines;

  if (!surroundingMines) {
    //reveal surrounding cells
    columns.forEach((c) => {
      rows.forEach((r) => {
        newMinefield = revealCell(c, r, newMinefield);
      });
    });
  }

  return newMinefield;
};

export const toggleFlag = (
  column: number,
  row: number,
  minefield: Minefield
) => {
  const newMinefield = cloneDeep(minefield);
  const isFlagged = newMinefield[column][row].state === CellState.Flagged;

  newMinefield[column][row].state = isFlagged
    ? CellState.Unopened
    : CellState.Flagged;

  return newMinefield;
};

export const revealSurrounding = (
  column: number,
  row: number,
  minefield: Minefield
) => {
  let newMinefield = cloneDeep(minefield);
  const columns = [column - 1, column, column + 1];
  const rows = [row - 1, row, row + 1];

  columns.forEach((c) => {
    rows.forEach((r) => {
      newMinefield = revealCell(c, r, newMinefield);
    });
  });

  return newMinefield;
};
