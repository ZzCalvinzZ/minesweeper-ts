import React, { ReactNode, useContext } from "react";
import { createUseStyles } from "react-jss";
import UnopenedCell from "./cells/UnopenedCell";
import OpenedCell from "./cells/OpenedCell";
import MineCell from "./cells/MineCell";
import GameContext, {
  Minefield as MinefieldType,
  CellState,
} from "../GameContext";
import { revealCell } from "../utils/mines";

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
    console.log("hi", column, row);
    setMinefield((existingMinefield: MinefieldType) =>
      revealCell(column, row, existingMinefield)
    );
  };

  return (
    <div className={classes.minefield}>
      <table>
        <tbody>
          {minefield.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>
                  {cell.state === CellState.Unopened && (
                    <UnopenedCell onClick={() => onClick(i, j)}></UnopenedCell>
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
