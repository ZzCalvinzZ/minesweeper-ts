import React, { ReactNode, useContext } from "react";
import { createUseStyles } from "react-jss";
import UnopenedCell from "./cells/UnopenedCell";
import OpenedCell from "./cells/OpenedCell";
import MineCell from "./cells/MineCell";
import GameContext, {
  Minefield as MinefieldType,
  CellState,
} from "../GameContext";
import {
  revealCell as revealCellUtil,
  setFlag as setFlagUtil,
  revealSurrounding as revealSurroundingUtil,
} from "../utils/mines";

const useStyles = createUseStyles({
  minefield: {},
});

type CellProps = {
  className: string;
  children?: ReactNode;
};

const Minefield: React.FC = () => {
  const classes = useStyles();
  const { minefield, setMinefield } = useContext(GameContext);
  if (!minefield) throw Error("There must be a minefield duh");

  const revealCell = (column: number, row: number) => {
    setMinefield((existingMinefield: MinefieldType) =>
      revealCellUtil(column, row, existingMinefield)
    );
  };

  const setFlag = (column: number, row: number) => {
    const newMinefield = setFlagUtil(column, row, minefield);
    setMinefield(newMinefield);
  };

  const revealSurrounding = (column: number, row: number) => {
    const newMinefield = revealSurroundingUtil(column, row, minefield);
    setMinefield(newMinefield);
  };

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
      }}
      className={classes.minefield}
    >
      <table>
        <tbody>
          {minefield.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>
                  {(cell.state === CellState.Unopened ||
                    cell.state === CellState.Flagged) && (
                    <UnopenedCell
                      cell={cell}
                      onClick={() => revealCell(i, j)}
                      onContextMenu={() => {
                        setFlag(i, j);
                      }}
                    ></UnopenedCell>
                  )}
                  {cell.state === CellState.Opened && !cell.hasMine && (
                    <OpenedCell
                      onContextMenu={() => {
                        revealSurrounding(i, j);
                      }}
                      cell={cell}
                    ></OpenedCell>
                  )}
                  {cell.state === CellState.Opened && cell.hasMine && (
                    <MineCell cell={cell}></MineCell>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Minefield;
