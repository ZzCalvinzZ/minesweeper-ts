import React, { ReactNode } from "react";
import { createUseStyles } from "react-jss";
import { CELL_WIDTH, CELL_HEIGHT } from "../../constants";

const useStyles = createUseStyles({
  cell: {
    width: `${CELL_WIDTH}px`,
    height: `${CELL_HEIGHT}px`,
    borderRadius: "3px",
  },
});

type CellProps = {
  className: string;
  children?: ReactNode;
  onClick?: () => void;
  onContextMenu?: () => void;
};

const Cell: React.FC<CellProps> = ({
  className,
  children,
  onClick,
  onContextMenu,
}) => {
  const classes = useStyles();
  return (
    <div
      onClick={onClick}
      onContextMenu={onContextMenu}
      className={`${classes.cell} ${className}`}
    >
      {children}
    </div>
  );
};

export default Cell;
