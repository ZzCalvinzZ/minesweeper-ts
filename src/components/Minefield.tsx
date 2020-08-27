import React, { ReactNode, useContext } from "react";
import { createUseStyles } from "react-jss";
import UnopenedCell from "./cells/UnopenedCell";
import GameContext from "../GameContext";

const useStyles = createUseStyles({
  minefield: {},
});

type CellProps = {
  className: string;
  children?: ReactNode;
};

const Minefield = () => {
  const classes = useStyles();
  const { minefield } = useContext(GameContext);
  if (!minefield) throw Error("There must be a minefield duh");

  return (
    <div className={classes.minefield}>
      <table>
        {minefield.map((row) => (
          <tr>
            {row.map((cell) => (
              <td>
                <UnopenedCell></UnopenedCell>
              </td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Minefield;
