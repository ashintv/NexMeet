export function ChatBubbleR(props: ChatBubbleProps) {
	return (
		<div className="my-2 w-full">
			<div className="bg-primary px-5  w-fit rounded-2xl rounded-tl-none mr-10 ">
				<div className="text-muted/50 text-md"> {props.author}</div>
				<div className="text-background text-md">{props.message}</div>
				<div className="text-background/50  text-xs flex justify-end">
					{props.timestamp}
				</div>
			</div>
		</div>
	)
}
export function ChatBubbleS(props: ChatBubbleProps) {
	return (
                <div className="my-2 w-full">
		<div className="flex justify-end ">
			<div className="bg-background px-5  w-fit rounded-xl rounded-tr-none ml-10 outline ">
				<div className="text-muted/50 text-md"> {props.author}</div>
				<div className="text-primary text-wrap text-md">{props.message}</div>
				<div className="text-muted/50  text-xs flex justify-end">
					{props.timestamp}
				</div>
			</div>
		</div>
                </div>
	)
}
interface ChatBubbleProps {
	author: string
	message: string
	timestamp: string
}
