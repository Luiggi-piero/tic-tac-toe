import { WINNER_COMBOS } from "../constants";

export const checkWinnerFrom = (boardToCheck) => {
    // revisar la combiaciones ganadoras para ver si gano X u O
    for (const combo of WINNER_COMBOS) {
        const [a, b, c] = combo;
        if (
            boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[b] === boardToCheck[c]
        ) {
            return boardToCheck[a];
        }
    }
    // si no hay ganador
    return null;
}

// revisa si todos los espacios fueron marcados (son distintos de null)
export const checkEndGame = (newBoard) => {
    return newBoard.every(square => square !== null);
}