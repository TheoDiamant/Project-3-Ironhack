import "./ChatBox.css"

import axios from "axios"

import React, { useState, useEffect, useContext, useRef } from 'react'
import { AuthContext } from "../../context/auth.context"

import { io } from "socket.io-client"

const API_URL = "http://localhost:5005"

const socket = io("http://localhost:5000", {
    autoConnect: false //if not set to false, will connect to server every time component reloads
})

function ChatBox({ singleChat })  {
    
    const [allMessages, setAllMessages] = useState(singleChat.messageHistory)
    const [newMessage, setNewMessage] = useState("")
    const chatBoxRef = useRef(null)

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
        //we connect to the client, we join a room, and we set up an event listener to receive messages
        socket.connect()
        socket.emit("join_room", singleChat._id)

        socket.on("receive_message", data => {
            console.log(data)
            const socketMessage = {
                content: data.content,
                sender: data.sender,
                timestamp: data.timestamp
            }
            setAllMessages(prevState => [...prevState, socketMessage])
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    //UseEffect that scrolls to the bottom when a new message loads
    useEffect(() => {
        scrollToBottom()
    }, [allMessages])

    function handleEnterKeypress(e) {
        if(newMessage === "") {
            return
        }
        
        if(e.key === "Enter") {
            const socketData = {
                room: singleChat._id,
                content: newMessage,
                sender: user._id,
                timestamp: new Date().toISOString()
            }
            setAllMessages(prevState => [...prevState, socketData])
            socket.emit("send_message", socketData)
            
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

    function scrollToBottom() {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
    }

    return (
        <>
            <div className="messagesDiv" ref={chatBoxRef}>
                {allMessages.map((message) => {
                    const formattedTime = new Intl.DateTimeFormat(undefined, {
                        hour: '2-digit',
                        minute: '2-digit'
                    }).format(new Date(message.timestamp))

                    return (
                        <div key={message._id} className={message.sender === user._id ? "singleMessageDiv yourOwn" : "singleMessageDiv otherUser"}>
                            
                            {message.sender === user._id
                            
                            ?

                            <div className="messageWrapper">
                                <p className="messageTime">{formattedTime}</p>
                                <p className="messageText">{message.content}</p>
                                <img className="messagePFP" src={ownPFP} alt="" />
                            </div>                               

                            :

                            <div className="messageWrapper">
                                <img className="messagePFP" src={otherUserPFP} alt="" />
                                <p className="messageText">{message.content}</p>
                                <p className="messageTime">{formattedTime}</p>
                            </div>

                            }
                            
                        </div>
                    )
                })}
            </div>

            <div className="messageInputDiv">
                <input className='chatInput' value={newMessage} type="text" placeholder="Send a message" onChange={storeNewMesage} onKeyDown={handleEnterKeypress}/>
            </div>
        </>
    )

}

export default ChatBox