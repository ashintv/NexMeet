import { HashLoader,  } from "react-spinners"

export function ButtonLoader({ message }: { message?: string }) {
	return (
		<div className="flex">
			
			<div>
				<HashLoader size={'25'} />
			</div>
                        <div>{message}</div>
		</div>
	)
}
