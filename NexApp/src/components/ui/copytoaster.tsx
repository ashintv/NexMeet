import { toast } from "sonner"
import { Button } from "./button"
import { CopyIcon } from "@/icons/copy"

import  { CopyFromTextbox } from "./copyComponent"

export function CopyCode({ id }: { id: string }) {
	

	return (
		<div>
			<Button
				onClick={() => {
					toast("Copy your Meetig id", {
						unstyled: true,
                                                action:<CopyFromTextbox id={id}/> , 
						classNames: {
							toast: "bg-background backdrop-opacity-50 backdrop-blur-xl rounded-md rounded p-5  w-fit",
                                                        title:"text-primary  font-bold font- flex justify-center mb-5"
                                                        
							
						},
					})
				}}>
				<CopyIcon />
			</Button>
		</div>
	)
}
