export const saveGameToStorage = ({ board, turn }) => {
    window.localStorage.setItem('board', JSON.stringify(board));
    window.localStorage.setItem('turn', JSON.stringify(turn));
}

export const resetGameStorage = () => {
    localStorage.removeItem('board');
    localStorage.removeItem('turn');
} 