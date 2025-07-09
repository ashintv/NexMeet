import { useEffect, useState } from "react"

export function useChating( socket:WebSocket){
        const [chats, setChats] = useState<any[]>([])
        useEffect(() => {
                        setChats(JSON.parse(localStorage.getItem("chat")!))
                }, [])
                useEffect(() => {
                        localStorage.setItem("chat", JSON.stringify(chats))
                }, [chats])
                useEffect(() => {
                        if (!socket) return
                        socket.onmessage = (event) => {
                                const Data = JSON.parse(event.data)
                                if (Data.type == "chat") {
                                        setChats((prevChats) => [...prevChats, Data.data])
                                }
                        }
                }, [socket])


        return {
                chats , 
        }
}

