import { Topbar } from "@/components/ui/topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Meetform() {
        return (<>
                <Topbar />
                <div className="flex">
                        <div className="h-screen w-full p-15">
                                <div className=" w-full h-full bg-[url(./src/assets/formbg.jpg)] bg-cover rounded-xl">

                                </div>
                        </div>
                        <div className="w-3/7  p-5 justify-center items-center ">
                                <div className="p-5 mt-5">
                                        <div className="py-5 ">
                                                <h1 className="text-5xl   font-serif">
                                                        Connect. Collaborate. Communicate.
                                                </h1>

                                        </div>
                                        <div>
                                                <p className="font-normal">
                                                        Welcome to NexMeet, the next-generation video conferencing solution built for seamless meetings, real-time collaboration, and crystal-clear communication.
                                                </p>
                                        </div>
                                        <div className="py-5">
                                                <Button className="w-full rounded-full" >New Meeting</Button>
                                        </div>

                                        <div className="py-3">
                                                <Input className="w-full" placeholder="Enter Room id" />
                                        </div>
                                        <div className="py-1">
                                                <Button className="w-full rounded-full" variant={'secondary'}>Join Meeting</Button>
                                        </div>


                                </div>

                                <div className="flex justify-center items-end">
                                        <img className="size-50" src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHZxNmRyNGNxNDFlemg5bjIyanltMThsZnZnZXM1c3p1aDc4cjhhcSZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/KG1W3AbUqAPxdGrYtF/giphy.gif" alt="" />
                                </div>


                        </div>


                </div>
        </>
        )
}
