import { Button } from "../ui/button"
import { useTools } from "./store"


export function Menu() {
	const tools = useTools()
	
	return (
		<div className="flex">
			<Button variant={"ghost"}
				className={`${tools.tool == "RECT" ? "bg-red-400" : ""}`}
				onClick={() => {
					 tools.setTool('RECT')
				}}>
				Rect
			</Button>
			<Button variant={"ghost"}
				className={`${tools.tool == "CIRCLE" ? "bg-red-400" : ""}`}
				onClick={() => {
					tools.setTool('CIRCLE')
				}}>
				Circle
			</Button>
                        <Button variant={"ghost"}
				className={`${tools.tool == "LINE" ? "bg-red-400" : ""}`}
				onClick={() => {
					tools.setTool('LINE')
				}}>
				Line
			</Button>
                         <Button variant={"ghost"}
				className={`${tools.tool == "SELECT" ? "bg-red-400" : ""}`}
				onClick={() => {
					tools.setTool('SELECT')
				}}>
				Select
			</Button>
		</div>
	)
}
