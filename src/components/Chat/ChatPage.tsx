import React, {useEffect, useRef, useState} from "react"
import s from "./ChatPage.module.scss"

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

export const ChatPage: React.FC = () => {
    return (
        <div className={s.chatPageBlock}>
            <Chat/>
        </div>
    )
}

export const Chat: React.FC = () => {
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket
        const closeHandler = () => {
            console.log('close ws')
            setTimeout(createChannel, 3000)
        }

        function createChannel() {
            ws?.removeEventListener('close', closeHandler)
            ws?.close()
            ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
            ws.addEventListener("close", closeHandler)
            setWsChannel(ws)
        }

        createChannel()

        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])

    return (
        <div className={s.chatBlock}>
            <Messages wsChannel={wsChannel}/>
            <AddMessageForm wsChannel={wsChannel}/>
        </div>
    )
}

export const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        let messageHandler = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            setMessages(prevMessages => [...prevMessages, ...newMessages])
        }
        wsChannel?.addEventListener('message', messageHandler)

        return () => {
            wsChannel?.removeEventListener('message', messageHandler)
        }
    }, [wsChannel])

    const divRef = useRef<any>(null);

    useEffect(() => {
        divRef.current.scrollIntoView({behavior: 'smooth'});
    });

    return (
        <div className={s.messagesBlock} style={{height: '400px', overflowY: 'auto'}}>
            {messages.map((m, index) => <Message key={index} message={m}/>)}
            <div ref={divRef}/>
        </div>
    )
}

export const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {
    return (
        <div className={s.messageBlock}>
            <div className={s.avaAndNameBlock}>
                <img style={{height: '30px', width: '30px'}} src={message.photo}/>
                <div className={s.name}>{message.userName}</div>
            </div>
            <div className={s.messageText}>{message.message}</div>
        </div>
    )
}

export const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        let openHandler = () => {
            setReadyStatus('ready')
        }

        wsChannel?.addEventListener("open", openHandler)

        return () => {
            wsChannel?.removeEventListener('open', openHandler)
        }

    }, [wsChannel])

    const sendMessage = () => {
        if (!message) return
        wsChannel?.send(message)
        setMessage('')
    }


    return (
        <div className={s.addMessageFormBlock}>
            <textarea onChange={e => setMessage(e.currentTarget.value)}
                      placeholder={"your message"}
                      value={message}/>
            <button disabled={wsChannel === null || readyStatus !== 'ready'}
                    onClick={sendMessage}>Send</button>
        </div>
    )
}
