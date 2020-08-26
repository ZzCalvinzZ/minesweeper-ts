import React, { ReactNode } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  cell: {
    width: "40px",
    height: "40px",
    borderRadius: "3px",
  },
});

type CellProps = {
  className: string;
  children?: ReactNode;
};

const Cell = ({ className, children }: CellProps) => {
  const classes = useStyles();
  return <div className={`${classes.cell} ${className}`}>{children}</div>;
};

export default Cell;
