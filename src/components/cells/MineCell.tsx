import React from "react";
import { createUseStyles } from "react-jss";
import Cell from "./Cell";
import { Cell as CellType } from "../../GameContext";
import MineImg from "./mine.png";

const useStyles = createUseStyles({
  mineCell: (won) => ({
    backgroundColor: won ? "lime" : "red",
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
  }),
  mine: {
    width: "70%",
    height: "70%",
  },
});

type MineCellProps = {
  cell: CellType;
  won?: boolean;
};

const MineCell: React.FC<MineCellProps> = ({ cell, won = false }) => {
  const classes = useStyles(won);
  return (
    <Cell className={classes.mineCell}>
      <img className={classes.mine} src={MineImg} alt="Mine" />
    </Cell>
  );
};

export default MineCell;
