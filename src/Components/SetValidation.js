import React from 'react';

const checkSetType = (cards, numbers) =>{
    const unique = [...new Set(cards.map(card => card.shape))];
    // Checks if the cards are unique shape
    if (unique.length === 1) {
        const differenceAry = numbers.sort((a, b) => a - b).slice(1).map(function (n, i) { return n - numbers[i]; })
        const isSequence = differenceAry.every(value => value == 1);
        if (isSequence) {
            return true;
        }
    } else {
        const uniqueCards = [...new Set(numbers.map(card => card))];
        if (uniqueCards.length === 1) {
            return true;
        }
    }
}
const SetValidation = (cards, count, openJoker) => {
    // Checks if three or more cards are present
    if (count < 3) return false;
    if (count >= 3) {
        // lists all the numbers of the cards
        const numbers = cards.map((card) => {
            return card.number;
        })
        // checks if the cards are same shape
        if(checkSetType(cards, numbers)){
            return true;
        };
        const [joker] = openJoker;
        if (numbers.includes(joker.number)) {
            // const luckySequence = differenceAry.every(value => value == differenceAry.length - 1);
            const jokerExcluded = cards.filter((card) => {
                return card.number !== joker.number;
            })
            const values = jokerExcluded.map((card) => {
                return card.number;
            })
            if(checkSetType(jokerExcluded, values)){
                return true;
            };
        }
        return false;
    }
}

export default SetValidation;