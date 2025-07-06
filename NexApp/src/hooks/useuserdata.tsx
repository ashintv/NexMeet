import { useEffect, useState } from "react";

export function useUserData() {
	const [name, setName] = useState <string | null>(null);
	const [email, setEmail] = useState("");

	useEffect(() => {
		const storedName = localStorage.getItem("name");
		const storedEmail = localStorage.getItem("email");

		if (storedName) setName(storedName);
		if (storedEmail) setEmail(storedEmail);
	}, []);

	return {
		name,
		email,
	};
}