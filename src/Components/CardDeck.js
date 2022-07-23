import React from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const CardDeck = ({setClosedCard, finishCard, openJoker, openCard, openCardClicked}) =>{
    const [joker] = openJoker;
    const openCardDom = React.useRef(null)
    return <div className="openDeckMain">
        <div className="opencardContainer">
            <img src="./Assets/Cards/back_card_single_row.svg" className="cardBackimage" onClick={setClosedCard} />
            {joker&&<img src={`./Assets/Cards/${joker.image}`} className="cardBackimage" id="openCard" />}
            <div className="deckTitle">closed deck</div>
        </div>
        <div style={{left: '5px'}}>
            {openCard.length?(
                <img className="cardBackimage" src={`./Assets/Cards/${openCard[0].image}`} ref={openCardDom} onClick={()=>openCardClicked(openCard)}/>
            ):(
                <img src="./Assets/Cards/finish_deck_single_row.svg" className="finishDeck" style={{height: '75%', opacity: '0.8'}} />
            )}
            <div className="deckTitle">open deck</div>
        </div>
        <div>
            {finishCard.length>0?<>
                <img className="cardBackimage" src={`./Assets/Cards/${finishCard[0].image}`}/>
            </>:<>
            <img src="./Assets/Cards/finish_deck_single_row.svg" className="finishDeck" style={{height: '75%', opacity: '0.8'}} />
            <div style={{color: 'white', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', fontSize: '7px'}}>Finish<br/>Slot</div>
            </>}
        </div>
    </div>
}

export default CardDeck;