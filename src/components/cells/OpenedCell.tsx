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
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    "font-size": "24px",
    "font-weight": "bold",
    cursor: "default",
    color: (props: OpenedCellProps) => {
      switch (props.cell.surroundingMines) {
        case 1:
          return "blue";
        case 2:
          return "green";
        case 3:
          return "red";
        case 4:
          return "purple";
        case 5:
          return "maroon";
      }
    },
  },
});

type OpenedCellProps = {
  cell: CellType;
  onContextMenu?: () => void;
};

const OpenedCell: React.FC<OpenedCellProps> = (props) => {
  const classes = useStyles(props);
  const { cell, onContextMenu } = props;
  return (
    <Cell onContextMenu={onContextMenu} className={classes.openedCell}>
      {cell.surroundingMines || ""}
    </Cell>
  );
};

export default OpenedCell;
