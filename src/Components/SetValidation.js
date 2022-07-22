import React from 'react';

const checkSetType = (cards, numbers) =>{
    const uniqueShape = [...new Set(cards.map(card => card.shape))];
    // Checks if the cards are unique shape
    if (uniqueShape.length === 1) {
        const differenceAry = numbers.sort((a, b) => a - b).slice(1).map(function (n, i) { return n - numbers[i]; })
        const isSequence = differenceAry.every(value => value == 1);
        if (isSequence) {
            return {
                status: true,
                type: 'pure'
            };
        }
    } else {
        const uniqueCards = [...new Set(numbers.map(card => card))];
        if (uniqueCards.length === 1) {
            return {
                status: true,
                type: 'set'
            };
        }
    }
}

const checkScore = (cards, openJoker) =>{
    var score = 0;
        cards.map((card)=>{
            if(card.number !== openJoker[0].number){
                score+=Number(card.Points)
            }
        });
        return score
}
const SetValidation = (cards, count, openJoker) => {
    // Checks if three or more cards are present
    if (count < 3) return {
        status: false,
        score: checkScore(cards, openJoker)
    };
    if (count >= 3) {
        // lists all the numbers of the cards
        const numbers = cards.map((card) => {
            return card.number;
        })
        // checks if the cards are same shape
        if(checkSetType(cards, numbers)){
            return checkSetType(cards, numbers);
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
                return {
                    status: true,
                    type: 'impure'
                };
            };
        }
        return {
            status: false,
            score: checkScore(cards, openJoker)
        }
    }
        
}

export default SetValidation;