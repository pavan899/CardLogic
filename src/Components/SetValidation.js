import React from 'react';

const checkSetType = (cards, numbers, JokerCount) => {
    const uniqueShape = [...new Set(cards.map(card => card.shape))];
    const uniqueCards = [...new Set(numbers.map(card => card))];
    // Checks if the cards are unique shape
    if (!JokerCount || JokerCount<0) {
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
            if (uniqueCards.length === 1) {
                return {
                    status: true,
                    type: 'set'
                };
            }
        }
    }else{
        var count = JokerCount; // 1
        var cardNumbers = numbers.sort((a,b)=>a-b);  // [1, 3, 4]
        var valid = 0;
        for(var i =0; i<cardNumbers.length - 1;i++){
            var j = i+1;
            if(j<cardNumbers.length){
                if((cardNumbers[j]-cardNumbers[i]- 1)<=(count)){
                    count-=(cardNumbers[j]-cardNumbers[i]-1);
                    valid += 1;
                }
            }
        }
        console.log("valid: ", valid)
        if(valid === (numbers.length - 1)&&(uniqueShape.length === 1||uniqueCards.length === 1)){
            return {
                status: true,
                type: 'impure'
            }
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
    const [joker] = openJoker;
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
        if(checkSetType(cards, numbers, false)){
            return checkSetType(cards, numbers, false);
        };
        if (numbers.includes(joker.number)) {
            // const luckySequence = differenceAry.every(value => value == differenceAry.length - 1);
            const jokerExcluded = cards.filter((card) => {
                return card.number !== joker.number;
            })
            const JokerCount = cards.filter((card) => {
                return card.number === joker.number;
            })
            const values = jokerExcluded.map((card) => {
                return card.number;
            })
            if(checkSetType(jokerExcluded, values, JokerCount.length)){
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