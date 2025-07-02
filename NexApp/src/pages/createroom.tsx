
import { CreateMeetingForm } from "@/components/ui/createform";

export function CreateRoom(){
        return (
                <div className="fixed flex w-screen h-screen justify-center items-center backdrop-blur-xl ">
                           
                              <div className="w-1/2 h-fit bg-background  rounded-[10px] backdrop-blur-3xl p-5 border border-primary">
                                        <CreateMeetingForm/>
                              </div>
                        
                </div>
        )
}