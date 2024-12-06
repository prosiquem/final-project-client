import { createContext, useState } from "react"

const UserMessageContext = createContext()

function UserMessageProviderWrapper(props) {

    const [showMessage, setShowMessage] = useState(false)

    const [message, setMessage] = useState("")

    const [url, setUrl] = useState(false)

    const createAlert = (message, url) => {
        setMessage(message)
        setUrl(url)
        setShowMessage(true)
    }

    return (
        <UserMessageContext.Provider value={{ createAlert, message, url, showMessage, setShowMessage }}>
            {props.children}
        </UserMessageContext.Provider>
    )

}

export { UserMessageContext, UserMessageProviderWrapper }