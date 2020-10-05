import React from "react";
import { createUseStyles } from "react-jss";
import Cell from "./Cell";
import { Cell as CellType, CellState } from "../../GameContext";
import FlagImage from "./flag.png";

const useStyles = createUseStyles({
  unopenedCell: {
    backgroundColor: "#babdb6",
    "&:hover": {
      backgroundColor: "#d3d7cf",
    },
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
  },
  flag: {
    width: "70%",
    height: "70%",
    "margin-left": "6px",
  },
});

type UnopenedCellProps = {
  cell: CellType;
  onClick?: () => void;
  onContextMenu?: () => void;
};

const UnopenedCell: React.FC<UnopenedCellProps> = ({
  cell,
  onClick,
  onContextMenu,
}) => {
  const classes = useStyles();
  return (
    <Cell
      className={classes.unopenedCell}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {cell.state === CellState.Flagged && (
        <img className={classes.flag} src={FlagImage} alt="flag" />
      )}
    </Cell>
  );
};

export default UnopenedCell;
