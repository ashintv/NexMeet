import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Footer } from "@/components/ui/footer"
import { Topbar } from "@/components/ui/topbar"
import {  VideoIcon, Users, ShieldCheck, Rocket } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function LandingPage() {
        const navigate = useNavigate()
	return (<>
                
		<div className="py-20">
			{/* Hero Section */}
			<div className="flex flex-col items-center px-6">
				<div className="mt-10 h-[36rem] w-full max-w-7xl rounded-2xl bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuD-AG_ojRDud_x3kAqJVjEWKjckqSx_jqSAsNiOZJvHb-fSyVt95njHuO_JXXgMElZa66Y1EHmbgewczpaK8q4QYENGlDbHzyXi5ce959Cup3Pn1U9k8vr9qN4dCe8M-8meoqlHbcstBfp_Ofef0Y5vK2FvRUiSuZjwL3rJ6I_IiWEZvMuiSii_sQ5ihWxEFM_141RlVNhrPMJJNxXmlt74pAXzfmhh43ZEWdtYTQPC0ti0CmWA5wq1fF1LmhRbdUJTwDh4UtRE35A')] bg-cover bg-center shadow-lg">
					<div className="backdrop-brightness-75 backdrop-blur-[4px] w-full h-full flex justify-center items-center rounded-2xl p-10">
						<div className="text-center max-w-3xl">
							<h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-6">
								Connect with Clarity, Collaborate with Ease
							</h1>
							<p className="text-lg md:text-xl text-muted  mb-10">
								Experience seamless video conferencing with NexMeet. Our intuitive platform brings teams together, fostering productivity and engagement.
							</p>
							<div className="flex justify-center gap-6 flex-wrap">
								<Button onClick={()=>{
                                                                        navigate('/join')
                                                                }} size="lg" className="rounded-full px-8 py-6 text-base">
									Explore NexMeet
								</Button>
								<Button
									variant="outline"
									size="lg"
									className="rounded-full px-8 py-6 text-base flex gap-2"
									onClick={() => window.open("https://github.com/ashintv/NexMeet", "_blank")}
								>
									
									View on GitHub
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Why Choose Section */}
			<div className="px-6 md:px-20 mt-24">
				<h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
					Why Choose NexMeet
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					<FeatureCard
						title="Crystal Clear Calls"
						icon={<VideoIcon className="w-8 h-8 text-primary" />}
						description="Experience HD video and audio powered by LiveKit's real-time infrastructure."
					/>
					<FeatureCard
						title="Secure & Private"
						icon={<ShieldCheck className="w-8 h-8 text-primary" />}
						description="We prioritize your data with end-to-end encryption and secure token-based access."
					/>
					<FeatureCard
						title="Team Collaboration"
						icon={<Users className="w-8 h-8 text-primary" />}
						description="Experience the power of Artifically intelligence with out Topper Ai"
					/>
					<FeatureCard
						title="Fast & Lightweight"
						icon={<Rocket className="w-8 h-8 text-primary" />}
						description="Optimized for low-latency communication and fast join times."
					/>
				</div>
			</div>
                        
		</div>
                <Footer/>
                <Topbar />

                </>
	)
}

function FeatureCard({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) {
	return (
		<Card className="p-5 rounded-xl shadow-sm hover:shadow-md shadow-primary transition duration-200">
			<CardContent className="flex flex-col items-start gap-4">
				<div className=" p-2 rounded-full">{icon}</div>
				<h3 className="text-lg text-primary font-semibold">{title}</h3>
				<p className="text-muted text-sm">{description}</p>
			</CardContent>
		</Card>
	)
}