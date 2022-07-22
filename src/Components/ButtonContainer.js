import React from 'react';

const ButtonContainer = ({ totalCards, selectedCards, Cards, discardCard, finishGame, groupCards, sortCards }) => {
    return <div className="ButtonContainer">
        <div className="scoreTimer">
            <img src="./Assets/Icons/playerTimer.svg" className="playerTimer" />
        </div>
        <div className="ButtonList">
            {(selectedCards.length === 1&&totalCards > 13) && <img src={`./Assets/Buttons/Discard.svg`} onClick={discardCard} className="BtnImages" alt="discard" />}
            <img src={`./Assets/Buttons/Finish.svg`} onClick={finishGame} className="BtnImages" alt="finish" />
            {selectedCards.length > 1 && <img src={`./Assets/Buttons/Group.svg`} onClick={groupCards} className="BtnImages" alt="group" />}
            {Cards.length === 1 && <img src={`./Assets/Buttons/Sort.svg`} onClick={sortCards} className="BtnImages" alt="sort" />}
        </div>
    </div>
}

export default ButtonContainer;