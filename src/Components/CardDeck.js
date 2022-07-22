import React from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const CardDeck = ({openJoker, openCard, openCardClicked}) =>{
    const [joker] = openJoker;
    return <div className="openDeckMain">
        <div className="opencardContainer">
            <img src="./Assets/Cards/back_card_single_row.svg" className="cardBackimage" />
            <img src={`./Assets/Cards/${joker.image}`} className="cardBackimage" id="openCard" />
            <div className="deckTitle">closed deck</div>
        </div>
        <div style={{left: '5px'}}>
            <img className="cardBackimage" src={`./Assets/Cards/${openCard[0].image}`} onClick={()=>openCardClicked(openCard)}/>
            <div className="deckTitle">open deck</div>
        </div>
        <div>
            <img src="./Assets/Cards/finish_deck_single_row.svg" className="finishDeck" style={{height: '75%'}} />
            <div style={{color: 'white', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', fontSize: '7px'}}>Finish<br/>Slot</div>
        </div>
    </div>
}

export default CardDeck;