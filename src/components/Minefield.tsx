import React, { useContext, useEffect } from "react";
import { createUseStyles } from "react-jss";
import UnopenedCell from "./cells/UnopenedCell";
import OpenedCell from "./cells/OpenedCell";
import MineCell from "./cells/MineCell";
import GameContext, {
  Minefield as MinefieldType,
  CellState,
  GameStatus,
  Cell,
} from "../GameContext";
import {
  revealCell as revealCellUtil,
  toggleFlag as toggleFlagUtil,
  revealSurrounding as revealSurroundingUtil,
} from "../utils/mines";

const useStyles = createUseStyles({
  minefield: {
    display: "flex",
    "justify-content": "center",
  },
});

const Minefield: React.FC = () => {
  const classes = useStyles();
  const {
    minefield,
    setMinefield,
    gameStatus,
    setGameStatus,
    config,
  } = useContext(GameContext);

  useEffect(() => {
    if (!minefield || !config) return;
    const totalSpaces = config.columns * config.rows - config.mines;
    let spacesRevealed = 0;
    let lost = false;

    minefield.forEach((column) => {
      column.forEach((cell) => {
        if (cell.state === CellState.Opened && !cell.hasMine) {
          spacesRevealed += 1;
        }
        if (cell.state === CellState.Opened && cell.hasMine) {
          lost = true;
        }
      });
    });

    if (lost) {
      setGameStatus(GameStatus.Lost);
    }

    if (spacesRevealed === totalSpaces) {
      setGameStatus(GameStatus.Won);
    }
  }, [config, minefield, setGameStatus]);

  if (!minefield) throw Error("There must be a minefield duh");

  const revealCell = (column: number, row: number) => {
    setMinefield((existingMinefield: MinefieldType) =>
      revealCellUtil(column, row, existingMinefield)
    );
  };

  const setFlag = (column: number, row: number) => {
    const newMinefield = toggleFlagUtil(column, row, minefield);
    setMinefield(newMinefield);
  };

  const revealSurrounding = (column: number, row: number) => {
    const newMinefield = revealSurroundingUtil(column, row, minefield);
    setMinefield(newMinefield);
  };

  const renderCell = (cell: Cell, i: number, j: number) => {
    if (gameStatus === GameStatus.Lost && cell.hasMine) {
      return <MineCell cell={cell}></MineCell>;
    } else if (gameStatus === GameStatus.Won && cell.hasMine) {
      return <MineCell won cell={cell}></MineCell>;
    } else if (
      cell.state === CellState.Unopened ||
      cell.state === CellState.Flagged
    ) {
      return (
        <UnopenedCell
          cell={cell}
          onClick={() => revealCell(i, j)}
          onContextMenu={() => {
            setFlag(i, j);
          }}
        ></UnopenedCell>
      );
    } else if (cell.state === CellState.Opened && !cell.hasMine) {
      return (
        <OpenedCell
          onContextMenu={() => {
            revealSurrounding(i, j);
          }}
          cell={cell}
        ></OpenedCell>
      );
    } else if (cell.state === CellState.Opened && cell.hasMine) {
      return <MineCell cell={cell}></MineCell>;
    }
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
                <td key={j}>{renderCell(cell, i, j)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Minefield;
