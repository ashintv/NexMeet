import { CircleIcon } from "@/icons/circle"
import { Button } from "../ui/button"
import { useTools } from "./store"
import { PencilIcon } from "@/icons/pencil"
import { SelectIcon } from "@/icons/select"
import { TextIcon } from "@/icons/text"

const Style = ' border-2 border-red-500'
export function Menu() {
	const tools = useTools()
	
	return (
                <div className="bg-transparent">
		<div className="flex border-1 border-primary rounded p-2 backdrop-blur-sm">
			<Button variant={"outline"}
				className={`border-0  bg- ${tools.tool == "RECT" ? Style : ""}`}
				onClick={() => {
					 tools.setTool('RECT')
				}}>
				<div className="h-5 w-5 border-2 border-blue-800"></div>
			</Button>
			<Button variant={"ghost"}
				className={`${tools.tool == "CIRCLE" ? Style : ""} hover:bg-transparent bord`}
				onClick={() => {
					tools.setTool('CIRCLE')
				}}>
				<CircleIcon/>
			</Button>
                        <Button variant={"ghost"} 
				className={`${tools.tool == "LINE" ? Style : ""} text-`}
				onClick={() => {
					tools.setTool('LINE')
				}}>
				<PencilIcon />
			</Button>
                         <Button variant={"ghost"}
				className={`${tools.tool == "TEXT" ? Style : ""}`}
				onClick={() => {
					tools.setTool('TEXT')
				}}>
				<div className="text-indigo-600">
                                        <TextIcon/>
                                </div>
			</Button>
                        <Button variant={"ghost"}
				className={`${tools.tool == "SELECT" ? Style : ""}`}
				onClick={() => {
					tools.setTool('SELECT')
				}}>
				<div className="text-indigo-600">
                                        <SelectIcon/>
                                </div>
			</Button>
		</div>
                    </div>
	)
}
