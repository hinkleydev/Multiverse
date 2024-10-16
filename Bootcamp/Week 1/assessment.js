/*
Azz Hinkley - 04/10/2024 - Bootcamp week 1 - EOW challenge

Elements needed :
- Player generation - Randomly choose rock, paper or scissors for both players
- Checking system - Efficient system of checking who won
- Display output - State what both players got and state the winner
*/

function getItem() {
    // this function will return a string resprenting a choice
    let num = Math.floor((Math.random() * 3) + 1); // Pick 1 to 3 randomly
    if (num == 1) {
        return 'Rock';
    } else if (num == 2) {
        return 'Paper';
    } else {
        return 'Scissors';
    }
}

function checkWinner(attacker, defender) {
    // this compares an attacker and defender, if the attacker wins, return true
    if (attacker == 'Rock' && defender == 'Scissors') {
        return true;
    } else if (attacker == 'Paper' && defender == 'Rock') {
        return true;
    } else if (attacker == 'Scissors' && defender == 'Paper') {
        return true;
    }
}

console.log("===="); // make the output easier to read

player1 = getItem(); player2 = getItem(); // both players pick a choice
console.log("Player one has chosen " + player1.toLowerCase() + "!");
console.log("Player two has chosen " + player2.toLowerCase() + "!");

if (checkWinner(player1, player2) ){
    console.log(player1 + " beats " + player2.toLowerCase() + "! Player one wins!");
} else if (checkWinner(player2, player1)) {
    console.log(player2 + " beats " + player1.toLowerCase() + "! Player two wins!")
} else {
    console.log("It's a draw!");
}

console.log("===="); // make the output easier to read