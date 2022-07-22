import React from 'react';
import ReactDOM from "react-dom";
import CardContainer from './Components/CardContainer';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Board from './Components/Board';
import './Styles.css';
import { Cards } from "./Components/Constants";
import CardDeck from './Components/CardDeck';
import ButtonContainer from './Components/ButtonContainer';


var cardCount = 21;
const FirstDeck = () => {
  var arr = [];
  while (arr.length < 13) {
    var r = Math.floor(Math.random() * cardCount);
    if (arr.indexOf(Cards[r]) === -1) {
      arr.push(Cards[r]);
    }
  }
  window.localStorage.setItem("InitialDeck", JSON.stringify([arr]))
  return [arr];
}
const setJoker = (cards) => {
  var arr = [];
  while (arr.length < 1) {
    var r = Math.floor(Math.random() * cardCount);
    if (arr.indexOf(Cards[r]) === -1) {
      (!cards.includes(Cards[r]))&&arr.push(Cards[r])
    }
  }
  window.localStorage.setItem("openJoker", JSON.stringify(arr))
  return arr;
}
const setOpenCard = (cards) => {
  var arr = [];
  while (arr.length < 1) {
    var r = Math.floor(Math.random() * cardCount);
    if (arr.indexOf(Cards[r]) === -1) {
      (!cards.includes(Cards[r]))&&arr.push(Cards[r])
    }
  }
  window.localStorage.setItem("openCard", JSON.stringify(arr))
  return arr;
}

const Rummy = () => {
  const initialStoredDeck = JSON.parse(window.localStorage.getItem("InitialDeck"))
  const initialOpenJoker = JSON.parse(window.localStorage.getItem("openJoker"))
  const initialOpenCard = JSON.parse(window.localStorage.getItem("openCard"))
  const [cards, updateCards] = React.useState(initialStoredDeck)
  const [openJoker, updateOpenJoker] = React.useState(initialOpenJoker)
  const [selectedCards, updateSelectedCards] = React.useState([]);
  const [openCard, updateOpenCard] = React.useState(initialOpenCard);
  const [finishCard, updateFinishCard] = React.useState([]);
  const [totalCards, updateTotalCards] = React.useState(13)
  if (!initialStoredDeck) {
    updateCards(FirstDeck());
  }
  if (!initialOpenJoker) {
    cards&&updateOpenJoker(setJoker(cards));
  }
  if (!initialOpenCard) {
    cards&&updateOpenCard(setOpenCard(cards));
  }
  React.useEffect(()=>{
    window.localStorage.setItem("openCard", JSON.stringify(openCard))
  }, [openCard])
  const sortCards = () =>{
    const cards = JSON.parse(window.localStorage.getItem("InitialDeck"));
    if(cards.length === 1){
      const uniqueShapes = [...new Set(cards[0].map(card => card.shape))];
      const cardArray = [];
      uniqueShapes.map((shape)=>{
        const sameShapes = cards[0].filter((card)=>{
          return shape === card.shape  
        })
        return cardArray.push(sameShapes)
      })
      updateCards(cardArray)
    }
  }
  const finishGame = () =>{
    var filteredCards = [];
    if(selectedCards.length === 1){
      if (cards.length === 1) {
        filteredCards = cards[0].filter((card) => {
          return !selectedCards.includes(card);
        });
      } else {
        filteredCards = cards.map((card) => {
          return card.filter((cd) => {
            return !selectedCards.includes(cd);
          })
        })
        updateCards([...filteredCards]);
      }
      updateFinishCard(selectedCards)
      updateSelectedCards([]);
    }
  }
  const groupCards = () => {
    var filteredCards = [];
    if (cards.length < 6) {
      if (cards.length === 1) {
        filteredCards = cards[0].filter((card) => {
          return !selectedCards.includes(card);
        });
      } else {
        filteredCards = cards.map((card) => {
          return card.filter((cd) => {
            return !selectedCards.includes(cd);
          })
        })
      }
      updateCards([...filteredCards, selectedCards]);
    }
    updateSelectedCards([]);
  }
  const discardCard = () =>{
    var filteredCards = [];
    if(selectedCards.length === 1){
      if (cards.length === 1) {
        filteredCards = cards[0].filter((card) => {
          return !selectedCards.includes(card);
        });
      } else {
        filteredCards = cards.map((card) => {
          return card.filter((cd) => {
            return !selectedCards.includes(cd);
          })
        })
        updateCards([...filteredCards]);
      }
      updateOpenCard(selectedCards)
      updateSelectedCards([]);
    }
  }
  React.useEffect(()=>{
    updateTotalCards(CountCards(cards))
  }, [cards])
  const CountCards = (cards) =>{
    var count = 0;
    if (cards.length === 1) {
      cards[0].map((card)=>{
        count+=1;
      })
    }else{
      cards.map((card) => {
        card.map((cd) => {
          count+=1;
        })
      });
    }
    return count;
  }
  const openCardClicked = (openCard) => {
    if (CountCards(cards) === 13) {
      var newCards = cards;
      if (cards.length === 1) {
        newCards = [[...newCards[0], ...openCard]];
        updateCards(newCards);
      } else {
        newCards[newCards.length - 1] = [...newCards[newCards.length - 1], ...openCard];
      }
      const values = [...newCards];
      updateCards(values);
      updateOpenCard([])
    }
  }
  const unusedCards = () =>{
    var arr = [];
    while (arr.length < 1) {
      var r = Math.floor(Math.random() * cardCount);
      if (arr.indexOf(cards[r]) === -1) {
        arr.push(Cards[r])
      }
    }
    return arr;
  }
  const setClosedCard = () =>{
    var openCard = unusedCards()
    if (CountCards(cards) === 13) {
      var newCards = cards;
      if (cards.length === 1) {
        newCards = [[...newCards[0], ...openCard]];
        updateCards(newCards);
      } else {
        newCards[newCards.length - 1] = [...newCards[newCards.length - 1], ...openCard];
      }
      const values = [...newCards];
      updateCards(values);
    }
    unusedCards()
  }
  const dropCard =() =>{
    window.localStorage.clear();
    window.location.reload();
  }
  return <>
    <div className="mobileModal">
      <Header />
      <Board />
      <div className="opencardDeck">
        <CardDeck setClosedCard={setClosedCard} finishCard={finishCard} openCard={openCard} openJoker={openJoker} openCardClicked={openCardClicked} />
      </div>
      <div style={{ position: 'absolute', top: '57%', width: '100%' }}>
        <CardContainer selectedCards={selectedCards} updateSelectedCards={updateSelectedCards} updateCards={updateCards} Cards={cards} openJoker={openJoker} />
      </div>
      <ButtonContainer dropCard={dropCard} totalCards={totalCards} selectedCards={selectedCards} Cards={cards} discardCard={discardCard} finishGame={finishGame} groupCards={groupCards} sortCards={sortCards} />
      <Footer />
    </div>
  </>
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Rummy />, rootElement);