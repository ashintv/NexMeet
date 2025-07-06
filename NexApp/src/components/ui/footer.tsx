import { Github, Twitter, Mail, Globe, GithubIcon } from "lucide-react"

export function Footer() {
	return (
		<footer className="border-t mt-20 bg-background text-muted-foreground">
			<div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
				{/* Left side: Brand & copyright */}
				<div className="text-center md:text-left">
					<p className="text-sm">&copy; {new Date().getFullYear()} NexMeet. All rights reserved.</p>
					<p className="text-xs text-muted-foreground mt-1">
						Made with ❤️ by the NexMeet team
					</p>
				</div>

				{/* Right side: Links */}
				<div className="flex gap-4">
					<FooterIcon href="https://github.com/ashintv" icon={<Github />} label="GitHub" />
					<FooterIcon href="mailto:contact@nexmeet.org" icon={<Mail />} label="Email" />
					<FooterIcon href="https://nexmeet.org" icon={<Globe />} label="Website" />
				</div>
			</div>
		</footer>
	)
}

function FooterIcon({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="hover:text-primary transition"
			aria-label={label}
		>
			{icon}
		</a>
	)
}