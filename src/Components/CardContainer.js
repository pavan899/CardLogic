import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import './CardContainer.css';
import SetValidation from './SetValidation';

var position = 0;
const order = [2, 3, 4, 1]

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 8;

const getItemStyle = (draggableStyle, index, el) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",

  // change background colour if dragging
  background: "transparent",
  width: '20px',

  // styles we need to apply on draggables
  ...draggableStyle
});

function RummyApp({ selectedCards, updateSelectedCards, updateCards, Cards, openJoker, containerWidth }) {
  const [state, setState] = useState(Cards);
  const getListStyle = (isDraggingOver, el) => {
    const cards = el;
    var width = 0;
    const PMWidth = 48;
    cards.map((card)=>{
      width+=20;
    }) 
    const orderValue = containerWidth - (width + PMWidth);
    return {
    background: "transparent",
    width: 'fit-content',
    display: 'flex',
    padding: '0 39px 0 0',
    float: 'left',
    maxWidth: '80%',
    minHeight: '10vh',
    margin: '10px 4.5px',
    position: 'relative',
    order: orderValue
  }
  };
  React.useEffect(() => {
    setState(Cards);
    window.localStorage.setItem("InitialDeck", JSON.stringify(Cards))
  }, [Cards])

  React.useEffect(() => {
    updateCards(state)
  }, [state])
  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
      window.localStorage.setItem("InitialDeck", JSON.stringify(newState))
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];
      const filteredArray = newState.filter(group => group.length);
      setState(filteredArray);
      window.localStorage.setItem("InitialDeck", JSON.stringify(filteredArray))
    }
  }
  const cardClicked = (e, id) =>{
    updateSelectedCards((prevValue)=>{
      if(!prevValue.includes(id)){
        return [...prevValue, id];
      }else{
        const filtered = prevValue.filter((val)=>{
          return val !== id;
        })
      return filtered;
      }
    })
  }
  return (
    <div>
      <div style={{ width: '90%', margin: 'auto', display: 'flex', flexWrap: 'wrap' }}>
        <DragDropContext onDragEnd={onDragEnd} onDragStart={()=>updateSelectedCards([])}>
          {state.map((el, ind) => (
            el.length>0&&<Droppable key={ind} droppableId={`${ind}`} direction="horizontal">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver, el)}
                  {...provided.droppableProps}
                >
                  {el.map((item, index) => {
                    position -= 20;
                    return <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            provided.draggableProps.style,
                            index,
                            el
                          )}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                              position: 'relative'
                            }}
                          >
                            <img src={`./Assets/Cards/${item.image}`} className="CardImage" onClick={(e)=>cardClicked(e, item)}/>
                            {openJoker[0].number===item.number&&<img src='./Assets/Cards/joker-min.svg' className="jokerIcon" />}
                            {selectedCards.includes(item)&&<img src="./Assets/Cards/finish_deck_single_row.svg" style={{position: 'absolute', top: '0'}} className="CardImage" onClick={(e)=>cardClicked(e, item)} />}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  })}
                  {provided.placeholder}
                  {console.log("open joker: ", SetValidation(el, el.length, openJoker))}
                  {SetValidation(el, el.length, openJoker).status ? <div className="validityStatus">Valid</div>: <div className="validityStatus"><img src="./Assets/Icons/Invalid.svg" className="icons" /><span>Invalid <span className="score">({SetValidation(el, el.length, openJoker).score})</span></span></div>}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

export default RummyApp;
