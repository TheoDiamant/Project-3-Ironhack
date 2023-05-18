import "./ChatBox.css"

import axios from "axios"

import React, { useState, useEffect, useContext } from 'react'
import ScrollToBottom from "react-scroll-to-bottom"
import { AuthContext } from "../../context/auth.context"

import { io } from "socket.io-client"

const API_URL = "http://localhost:5005"

function ChatBox({ singleChat })  {

    const { messageHistory } = singleChat

    const [newMessage, setNewMessage] = useState("")

    const { user } = useContext(AuthContext)

    //storing other users' profile picture in a variable for display in the chat
    let ownPFP
    let otherUserPFP
    if(singleChat.users[0]._id === user._id) {
        ownPFP = singleChat.users[0].profilePicture
        otherUserPFP = singleChat.users[1].profilePicture
    }
    else {
        otherUserPFP = singleChat.users[0].profilePicture
        ownPFP = singleChat.users[1].profilePicture
    }


    //This useEffect adds an event listener for the enter key to send messages and joins a socket room whose ID is determined by the MongoDB Room document - this makes each room unique and avoids user collisions
    useEffect(() => {
        document.addEventListener("keydown", handleEnterKeypress)
        // const socket = io("http://localhost:5000")
        // socket.emit("join_room", singleChat._id)

        // return () => {
        //     socket.emit("disconnect")
        // }
        return () => {
            document.removeEventListener("keydown", handleEnterKeypress)
        }
    })

    function handleEnterKeypress(e) {
        if(newMessage === "") {
            return
        }

        if(e.key === "Enter") {
            // socket.emit("send_message", newMessage)
            const messageToStore = {
                content: newMessage,
                sender: user._id,
            }
            setNewMessage("")
            axios.post(`${API_URL}/chat/append-message`, {roomID: singleChat._id, messageToStore: messageToStore})
        }

    }

    function storeNewMesage(e) {
        setNewMessage(e.target.value)
    }

    return (

        <>
            <div className="messagesDiv">
                <ScrollToBottom className="scrollBottom">
                    {messageHistory.map((message) => {
                        message.timestamp = new Date(message.timestamp).toLocaleTimeString().substring(0, 5)
                        return (
                            <div className={message.sender === user._id ? "singleMessageDiv yourOwn" : "singleMessageDiv otherUser"}>
                                
                                {message.sender === user._id
                                
                                ?

                                <div className="messageWrapper">
                                    <p className="messageTime">{message.timestamp}</p>
                                    <p className="messageText">{message.content}</p>
                                    <img className="messagePFP" src={ownPFP} alt="" />
                                </div>                               

                                :

                                <div className="messageWrapper">
                                    <img className="messagePFP" src={otherUserPFP} alt="" />
                                    <p className="messageText">{message.content}</p>
                                    <p className="messageTime">{message.timestamp}</p>
                                </div>

                                }
                               
                            </div>
                        )
                    })}
                </ScrollToBottom>
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
            // <ScrollToBottom className='message-container'>
            //     {messageList.map((messageContent) => {
            //         return (
            //             <div className='message' id={username === messageContent.author ? "you" : "other"}>
            //                 <div>
            //                 <div className='message-content'>
            //                     <p>{messageContent.message}</p>
            //                 </div>
            //                 <div className='message-meta'>
            //                     <p id="time">{messageContent.time}</p>
            //                     <p id="author">{messageContent.author}</p>
            //                 </div>
            //                 </div>
            //             </div>
            //         )
            //     })}
            //     </ScrollToBottom>
        //     </div>
        //     <div className='chat-footer'>
        //         <input type='text' value={currentMessage} placeholder='Type a message' onChange={(e) => {setCurrentMessage(e.target.value)}} onKeyPress={(e) => {e.key === "Enter" && sendMessage()}}/>
        //         <button onClick={sendMessage}>&#9658;</button>
        //     </div>

            
        // </div>

    )

}

export default ChatBox