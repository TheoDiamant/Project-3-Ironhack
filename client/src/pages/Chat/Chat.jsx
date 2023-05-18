import "./Chat.css"

import io from "socket.io-client"
import ChatBox from "../../components/ChatBox/ChatBox"

import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

// export const socket = io.connect("http://localhost:5000");

function Chat() {

    // const [username, setUsername] = useState("")
    // const [room, setRoom] = useState("")
    // const [showChat, setShowChat] = useState(false)


    // const joinRoom = () => {
    //     if (username !== "" && room !== "") {
    //         //The line below send to the backend (chat.js) the value of the room on the line 21(chat.js)
    //         socket.emit("join_room", room)
    //         setShowChat(true)
    //     }
    // }

    return (
        <div className="chatPageDiv">
            <div className="chatPageWrapper">
                <div className="chatBoxDiv">
                    <div className="chatSideBar">
                        {/* individual chats */}
                    </div>
                </div>
            </div>
            {/* {!showChat ? (
            <div className="joinChatContainer">
                <h3>Join Chat</h3>
                <input type="text" placeholder="John..." onChange={(e) => {setUsername(e.target.value)}}/>
                <input type="text" placeholder="Room Id" onChange={(e) => {setRoom(e.target.value)}}/>
                <button onClick={joinRoom}>Join a room</button>
            </div>
            )
            : (
                <ChatBox socket={socket} username={username} room={room}/>
            )} */}
        </div>
        
    )
}

export default Chat