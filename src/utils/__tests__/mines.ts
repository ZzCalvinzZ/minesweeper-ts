import { generateMinefield, revealCell } from "../mines";
import { Minefield } from "../../GameContext";

const stringUpMinefield = (minefield: Minefield) => {
  return minefield
    .map((col) =>
      col
        .map((cell) =>
          cell.hasMine
            ? "x"
            : cell.state === 0
            ? "U"
            : cell.surroundingMines || 0
        )
        .join()
    )
    .join("\n");
};

describe("mines.ts", () => {
  test("minefield generates", () => {
    const field = generateMinefield(9, 9, 10);
    console.log(field);
    const stringField = field
      .map((col) => col.map((cell) => (cell.hasMine ? "x" : "0")).join())
      .join("\n");
    console.log(stringField);
  });

  test("reveal cell", () => {
    const minefield: Minefield = [
      [
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: true },
        { state: 0, hasMine: false },
        { state: 0, hasMine: true },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
      ],
      [
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
      ],
      [
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: true },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
      ],
      [
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
      ],
      [
        { state: 0, hasMine: false },
        { state: 0, hasMine: true },
        { state: 0, hasMine: true },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
      ],
      [
        { state: 0, hasMine: false },
        { state: 0, hasMine: true },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: true },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
      ],
      [
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: true },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
      ],
      [
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
      ],
      [
        { state: 0, hasMine: false },
        { state: 0, hasMine: true },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: false },
        { state: 0, hasMine: true },
        { state: 0, hasMine: false },
      ],
    ];

    /*
     *
    0,0,x,0,x,0,0,0,0
    0,0,0,0,0,0,0,0,0
    0,0,0,x,0,0,0,0,0
    0,0,0,0,0,0,0,0,0
    0,x,x,0,0,0,0,0,0
    0,x,0,0,0,0,x,0,0
    0,0,x,0,0,0,0,0,0
    0,0,0,0,0,0,0,0,0
    0,x,0,0,0,0,0,x,0

    */

    const newMinefield = revealCell(0, 3, minefield);
    expect(stringUpMinefield(newMinefield)).toEqual(
      `U,U,x,2,x,U,U,U,U
U,U,U,U,U,U,U,U,U
U,U,U,x,U,U,U,U,U
U,U,U,U,U,U,U,U,U
U,x,x,U,U,U,U,U,U
U,x,U,U,U,U,x,U,U
U,U,x,U,U,U,U,U,U
U,U,U,U,U,U,U,U,U
U,x,U,U,U,U,U,x,U`
    );

    const evenNewerMinefield = revealCell(0, 0, newMinefield);
    expect(stringUpMinefield(evenNewerMinefield)).toEqual(
      `0,1,x,2,x,U,U,U,U
0,1,2,U,U,U,U,U,U
0,0,1,x,U,U,U,U,U
1,2,3,U,U,U,U,U,U
U,x,x,U,U,U,U,U,U
U,x,U,U,U,U,x,U,U
U,U,x,U,U,U,U,U,U
U,U,U,U,U,U,U,U,U
U,x,U,U,U,U,U,x,U`
    );
  });
});
