import React from "react";
import { createUseStyles } from "react-jss";
import Cell from "./Cell";
import { Cell as CellType } from "../../GameContext";

const useStyles = createUseStyles({
  openedCell: {
    backgroundColor: "#d8dad6",
    "&:hover": {
      backgroundColor: "#d3d7cf",
    },
  },
});

type OpenedCellProps = {
  cell: CellType;
};

const OpenedCell: React.FC<OpenedCellProps> = ({ cell }) => {
  const classes = useStyles();
  return (
    <Cell className={classes.openedCell}>{cell.surroundingMines || ""}</Cell>
  );
};

export default OpenedCell;
