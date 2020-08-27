import { DEFAULT_CELL } from "../constants";
import { getRandomInt } from "./random";
import { Minefield } from "../GameContext";

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
