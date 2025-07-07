import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { CopyIcon } from "@/icons/copy" // Replace with any icon you prefer
import { Input } from "./input"
import { TikIcon } from "@/icons/tik"

export function CopyFromTextbox({ id }: { id: string}) {
	const inputRef = useRef<HTMLInputElement>(null)
        const [copied , setCopied] = useState(false)

	const handleCopy = () => {
		if (inputRef.current) {
			const value = inputRef.current.value
			navigator.clipboard.writeText(value).then(() => {
				setCopied(true)
			})
			
		}
	}

	return (
		<div className="flex items-center gap-2">
			<Input disabled ref={inputRef} type="text" value={id} className="text-xs w-fit p-1" />
			<Button size="icon" onClick={handleCopy} className="text-primary bg-transparent hover:text-background hover:bg-primary  ">
				{copied?<TikIcon/>:<CopyIcon />}
			</Button>
		</div>
	)
}
