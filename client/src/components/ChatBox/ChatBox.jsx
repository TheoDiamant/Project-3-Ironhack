import "./ChatBox.css"

import React, { useState, useEffect } from 'react'

import ScrollToBottom from "react-scroll-to-bottom"
import { io } from "socket.io-client"

const socket = io("http://localhost:5000")

function ChatBox({ singleChat })  {

    const [newMessage, setNewMessage] = useState("")

    //This useEffect adds an event listener for the enter key to send messages and joins a socket room whose ID is determined by the MongoDB Room document - this makes each room unique and avoids user collisions
    useEffect(() => {
        document.addEventListener("keydown", handleEnterKeypress)
        socket.emit("join_room", singleChat._id)

        return () => {
            socket.emit("disconnect")
        }
    })

    function handleEnterKeypress(e) {
        if(e.key === "Enter") {
            socket.emit("send_message", newMessage)
            setNewMessage("")
        }
    }

    function storeNewMesage(e) {
        setNewMessage(e.target.value)
    }

    return (

        <>
            <div className="messagesDiv">

            </div>

            <div className="messageInputDiv">
                <input className='chatInput' value={newMessage} type="text" placeholder="Send a message" onChange={storeNewMesage}/>
            </div>
        </>
        // <div className='chat-window'>

        //     <div className='chat-header'>
        //         <p>Live Chat</p>
        //     </div>
        //     <div className='chat-body'>
        //     <ScrollToBottom className='message-container'>
        //         {messageList.map((messageContent) => {
        //             return (
        //                 <div className='message' id={username === messageContent.author ? "you" : "other"}>
        //                     <div>
        //                     <div className='message-content'>
        //                         <p>{messageContent.message}</p>
        //                     </div>
        //                     <div className='message-meta'>
        //                         <p id="time">{messageContent.time}</p>
        //                         <p id="author">{messageContent.author}</p>
        //                     </div>
        //                     </div>
        //                 </div>
        //             )
        //         })}
        //         </ScrollToBottom>
        //     </div>
        //     <div className='chat-footer'>
        //         <input type='text' value={currentMessage} placeholder='Type a message' onChange={(e) => {setCurrentMessage(e.target.value)}} onKeyPress={(e) => {e.key === "Enter" && sendMessage()}}/>
        //         <button onClick={sendMessage}>&#9658;</button>
        //     </div>

            
        // </div>

    )

}

export default ChatBox