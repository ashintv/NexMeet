

import { ImageIcon } from "./imageIcon";
import { NexMeet } from "@/icons/nexmeet";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";
import { userStore } from "@/store/useuserdata";



export function Topbar() {
        const navigate = useNavigate()
        const {name  }= userStore.getState().user
        return (
                <div className="fixed top-0 h-12 w-full  border-b-2  border-primary   bg-background place-self-center flex">
                        <div className="w-1/2 flex">
                                <div className="text-primary flex items-center justify-center px-2">
                                        <NexMeet/>
                                </div>

                        </div>
                        <div className="flex w-1/2 px-3 justify-end ">
                                <div className="text-primary flex items-center justify-center px-2">
                                       {name?name:<Button onClick={()=>{
                                        navigate('/login')
                                       }} variant={"secondary"} className="rounded-full m-2 text-md px-5">Signin</Button>}
                                </div>
                                {name && <ImageIcon />}
                        </div>
                </div>
        )
}