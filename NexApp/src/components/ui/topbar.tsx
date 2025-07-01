
import { ImageIcon } from "./imageIcon";

export function Topbar() {
        return (
                <div className="fixed top-0 h-12 w-full  border-b-2  border-primary   bg-transparent place-self-center flex">
                        <div className="w-1/2 flex">
                                <div className="text-primary flex items-center justify-center px-2">
                                       Logo Here
                                </div>

                        </div>
                        <div className="flex w-1/2 px-3 justify-end ">
                                <div className="text-primary flex items-center justify-center px-2">
                                        Alavudin
                                </div>
                                <ImageIcon />
                        </div>
                </div>
        )
}