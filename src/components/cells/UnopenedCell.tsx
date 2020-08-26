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

const UnopenedCell = () => {
  const classes = useStyles();
  return <Cell className={classes.unopenedCell}></Cell>;
};

export default UnopenedCell;
