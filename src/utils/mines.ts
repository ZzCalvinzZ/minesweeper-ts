import { DEFAULT_CELL } from "../constants";
import { getRandomInt } from "./random";
import { Minefield, CellState } from "../GameContext";

export const generateMinefield = (
  columns: number,
  rows: number,
  mines: number
) => {
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
) => {
  const columns = [column - 1, column, column + 1];
  const rows = [row - 1, row, row + 1];
  const mainCell = getCell(column, row, minefield);

  // if cell is out of bounds or opened already
  if (!mainCell) return;
  if (mainCell.state === CellState.Opened) return;

  // set the cell as opened
  mainCell.state = CellState.Opened;

  let surroundingMines: number = 0;

  // check surrounding cells for mine
  columns.forEach((c) => {
    rows.forEach((r) => {
      const cell = getCell(c, r, minefield);
      if (!cell) return;
      if (cell.state === CellState.Opened) return;
      if (cell.hasMine) surroundingMines = surroundingMines + 1;
    });
  });

  minefield[column][row].surroundingMines = surroundingMines;

  if (!surroundingMines) {
    //reveal surrounding cells
    columns.forEach((c) => {
      rows.forEach((r) => {
        revealCell(c, r, minefield);
      });
    });
  }
};
