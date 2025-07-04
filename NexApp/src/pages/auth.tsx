import { LoginForm } from "@/components/login-form"
import { NexMeet } from "@/icons/nexmeet"

export function Auth() {
	return (
		<div className=" flex w-screen h-screen justify-center items-center p-15  ">
			<div className="w-full h-full flex  items-center  shadow-2xl  shadow-primary rounded-4xl">
				<div className="w-1/2 p-20">
					<div className=" w-full h-fit ">
						<LoginForm />
					</div>
				</div>
				<div className="w-1/2 h-full relative">
					<div className=" absolute w-full h-full  bg-[url(./src/assets/5216292.jpg)]  overflow-hidden rounded-r-4xl bg-cover "></div>

					<div className=" absolute w-full h-full  flex items-center justify-center bg-primary/80 overflow-hidden rounded-r-4xl ">
						<div className="text-center max-w-2/3">
							<div className="flex justify-center">
                                                                <NexMeet/>
                                                        </div>
							<p className="text-4xl  font-mono font-bold"
                                                         >Connect with anyone anywhere</p>
                                                         <p className="text-black font-bold font-mono">
                                                                Experience high-quality, reliable video calls that bring your team together, no matter where they are.
                                                         </p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
