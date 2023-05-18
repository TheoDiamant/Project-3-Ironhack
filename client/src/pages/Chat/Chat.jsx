import "./Chat.css"

import axios from "axios"
import io from "socket.io-client"

import { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';

import { AuthContext } from "../../context/auth.context";
import { ChatIDsContext } from "../../context/chatIDs.context"

import ChatBox from "../../components/ChatBox/ChatBox"
import Loading from "../../components/Loading/Loading";

const API_URL = "http://localhost:5005"

function Chat() {

    const { user } = useContext(AuthContext)
    const { chatIDs } = useContext(ChatIDsContext)

    const [allChats, setAllChats] = useState(null)
    const [singleChat, setSingleChat] = useState(null)

    //When we get to this page, we need to do two things. We need to fetch every existing chat this user has had, and we need to fetch the specific chat the are trying to start right now OR create it if it's new

    useEffect(
        function getAllChats() {
            axios.post(`${API_URL}/chat/all-chats`, user)
            .then(response => setAllChats(response.data))
            .catch(err => console.log(err))
        },
        []
    )

    useEffect(
        function getSingleChat() {
            if(chatIDs.length === 0) { //if the user navigates to the chat page not through a profile page
                return
            }
            else {
                axios.post(`${API_URL}/chat/single-chat`, {chatIDs: chatIDs})
                .then(response => setSingleChat(response.data))
                .catch(err => console.log(err))
            }
        },
        []
    )

    return (
        <div className="chatPageDiv">
            <div className="chatPageWrapper">
                <div className="chatBoxDiv">

                    <div className="chatSideBar">
                        {allChats ?
                        
                        allChats.map(chat => {
                            return(
                                <div className="singleChatDiv">

                                </div>
                            )
                        })

                        :

                        <Loading />

                        }
                    </div>

                    <div className="mainChatDiv">
                        {singleChat ? 
                        
                        <ChatBox singleChat={singleChat}/>
                        
                        :

                        <Loading />

                        }
                    </div>
                </div>
            </div>
            
        </div>
        
    )
}

export default Chat