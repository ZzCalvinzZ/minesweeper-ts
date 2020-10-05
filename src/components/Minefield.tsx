import React, { ReactNode, useContext } from "react";
import { createUseStyles } from "react-jss";
import UnopenedCell from "./cells/UnopenedCell";
import OpenedCell from "./cells/OpenedCell";
import MineCell from "./cells/MineCell";
import GameContext, {
  Minefield as MinefieldType,
  CellState,
} from "../GameContext";
import { revealCell, setFlag } from "../utils/mines";

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

  const onClick = (column: number, row: number) => {
    setMinefield((existingMinefield: MinefieldType) =>
      revealCell(column, row, existingMinefield)
    );
  };

  const onContextMenu = (column: number, row: number) => {
    const newMinefield = setFlag(column, row, minefield);
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
                      onClick={() => onClick(i, j)}
                      onContextMenu={() => {
                        onContextMenu(i, j);
                      }}
                    ></UnopenedCell>
                  )}
                  {cell.state === CellState.Opened && !cell.hasMine && (
                    <OpenedCell cell={cell}></OpenedCell>
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
