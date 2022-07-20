import React from 'react';
import { Players } from './Constants';


const PlayerAvatar = (props) => {
    return <div className="EachAvatar"style={{transform: `translate(${props.player.x}%, ${props.player.y}%)`}}>
        <img src="./Assets/Body_Images/Player_Avatar.svg" className="AvatarImage" />
        <div className="AvatarName">
            <span className="name">{props.player.name}</span>
            <br />
            <span>&#8377; {props.player.balance}</span>
        </div>
    </div>
}
const Board = () => {
    return <div className="boardMainContainer">
        <div className="TableContainer">
            <img src="./Assets/Body_Images/Table_Center.svg" className="tableImage" />
            <div className="avatarsContainer">
                {
                    Players && Players.map((player) => {
                        return <PlayerAvatar player={player} key={player.id} />
                    })
                }
            </div>
        </div>
    </div>
}

export default Board;