import React from 'react';

const CardDeck = ({openJoker}) =>{
    const [joker] = openJoker;
    return <div className="openDeckMain">
        <div className="opencardContainer">
            <img src="./Assets/Cards/back_card_single_row.svg" className="cardBackimage" />
            <img src={`./Assets/Cards/${joker.image}`} className="cardBackimage" id="openCard" />
        </div>
    </div>
}

export default CardDeck;