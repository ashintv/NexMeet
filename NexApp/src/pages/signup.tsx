
import { SignupForm } from "@/components/signup-form"





export function Signup() {
        return (
                <div className="bg-background w-screen h-screen flex">
                       
                        <div className="p-10 h-full w-1/2  flex items-center justify-center">
                                <div className=" w-full m-10 rounded-4xl">
                                        <SignupForm className=" w-full h-1/2 p-5" />
                                </div>
                        </div>
                        <div className="flex items-center bg-primary/10 rounded-l-full p-20 pr-0 w-1/2 shadow-2xl shadow-primary">
                                <div className="flex h-full w-full items-center bg-secondary rounded-l-full p-20  pr-0 shadow-2xl shadow-primary">
                                        <div className="flex shadow-2xl shadow-primary h-full w-full items-center bg-background rounded-l-full p-15 pr-0">
                                                <div className="flex shadow-2xl shadow-primary h-full w-full items-center bg-primary/10 p-15 rounded-l-full bg-blend-screen">
                                                        <div className="fixed right-0  text-[120px] p-5 text-primary font-extrabold text-shadow-2xl text-shadow-primary font-stretch-160%  text-shadow-lg text-outline ">
                                                                NexMeet
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                      
                        
                </div>
        )
}
