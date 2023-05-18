import { createContext, useState } from "react";

const ChatIDsContext = createContext([])

function ChatIDsProviderWrapper(props) {

    const [chatIDs, setChatIDs] = useState([])

    return(
        <ChatIDsContext.Provider value={{chatIDs, setChatIDs}}>
            {props.children}
        </ChatIDsContext.Provider>
    )
}

export { ChatIDsContext, ChatIDsProviderWrapper }