/**
 * 
 * @param state gamestate
 * @param lastCell row, column of last cell played
 * @param player player number: 1 or 2
 */
export const checkWin = (state: number[][], lastCell: [number, number], player: number) => {

    // check horizontal win
    var col = lastCell[1] - 1;
    var horizontalCount = 1;
    while (col >= 0 && state[lastCell[0]][col] === player) {
        horizontalCount++;
        col--;
    }
    var col = lastCell[1] + 1;
    while (col < 7 && state[lastCell[0]][col] === player) {
        horizontalCount++;
        col++;
    }
    if (horizontalCount >= 4) {
        return true;
    }

    // check vertical win
    var row = lastCell[0] - 1;
    var vertCount = 1;
    while (row >= 0 && state[row][lastCell[1]] === player) {
        vertCount++;
        row--;
    }
    var row = lastCell[1] + 1;
    while (row < 7 && state[row][lastCell[1]] === player) {
        vertCount++;
        row++;
    }
    if (vertCount >= 4) {
        return true;
    }

    // check LtoR diagonal win
    var row = lastCell[0] - 1;
    var col = lastCell[1] - 1;
    var count = 1;
    while (row >=0 && col >= 0 && state[row][col] == player) {
        count++;
        row--;
        col--;
    }
    var row = lastCell[0] + 1;
    var col = lastCell[1] + 1;
    while (row < 7 && col < 7 && state[row][col] == player) {
        count++;
        row++;
        col++;
    }
    if (count >= 4) {
        return true;
    }

    // check RtoL diagonal win
    var row = lastCell[0] - 1;
    var col = lastCell[1] + 1;
    var count = 1;
    while (row >=0 && col < 7 && state[row][col] == player) {
        count++;
        row--;
        col++;
    }
    var row = lastCell[0] + 1;
    var col = lastCell[1] - 1;
    while (row < 7 && col >= 0 && state[row][col] == player) {
        count++;
        row++;
        col--;
    }
    if (count >= 4) {
        return true;
    }

    return false;
}

export const checkNoMoreMoves = (state: number[][]) => {
    return !state[0].some(cell => cell === 0)
}

export const makeMove = (state: number[][], column: number, player: number) => {
    var row = 5;
    while (row >= 0 && state[row][column] !== 0) {
        row--;
    }

    if (row < 0) {
        return null;
    }

    state[row][column] = player;
    return state;
}