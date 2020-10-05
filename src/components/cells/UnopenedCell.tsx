import React from "react";
import { createUseStyles } from "react-jss";
import Cell from "./Cell";

const useStyles = createUseStyles({
  unopenedCell: {
    backgroundColor: "#babdb6",
    "&:hover": {
      backgroundColor: "#d3d7cf",
    },
  },
});

type UnopenedCellProps = {
  onClick?: () => void;
};

const UnopenedCell: React.FC<UnopenedCellProps> = ({onClick}) => {
  const classes = useStyles();
  return <Cell className={classes.unopenedCell} onClick={onClick}></Cell>;
};

export default UnopenedCell;
