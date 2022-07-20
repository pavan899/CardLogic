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



const FirstDeck = () => {
  var arr = [];
  while (arr.length < 13) {
    var r = Math.floor(Math.random() * 19);
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
    var r = Math.floor(Math.random() * 19);
    if (arr.indexOf(Cards[r]) === -1) {
      arr.push(Cards[r])
    }
  }
  window.localStorage.setItem("openJoker", JSON.stringify(arr))
  return arr;
}

const Rummy = () => {
  const initialStoredDeck = JSON.parse(window.localStorage.getItem("InitialDeck"))
  const initialOpenJoker = JSON.parse(window.localStorage.getItem("openJoker"))
  const [cards, updateCards] = React.useState(initialStoredDeck)
  const [openJoker, updateOpenJoker] = React.useState(initialOpenJoker)
  const [selectedCards, updateSelectedCards] = React.useState([]);
  if (!initialStoredDeck) {
    updateCards(FirstDeck());
  }
  if (!initialOpenJoker) {
    updateOpenJoker(setJoker(cards));
  }
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
    }
    updateCards([...filteredCards, selectedCards]);
    updateSelectedCards([]);
  }
  const discardCard = () =>{

  }
  return <>
    <div className="mobileModal">
      <Header />
      <Board />
      <img src='./Assets/UI.svg' style={{ height: '100%', width: 'auto', position: 'absolute', opacity: 0.2, left: 0, top: 0 }} />
      <div className="opencardDeck">
        <CardDeck openJoker={openJoker} />
      </div>
      <div style={{ position: 'absolute', top: '55%', width: '100%' }}>
        <CardContainer selectedCards={selectedCards} updateSelectedCards={updateSelectedCards} updateCards={updateCards} Cards={cards} openJoker={openJoker} />
      </div>
      <ButtonContainer selectedCards={selectedCards} Cards={cards} discardCard={discardCard} finishGame={finishGame} groupCards={groupCards} sortCards={sortCards} />
      <Footer />
    </div>
  </>
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Rummy />, rootElement);