import { customAlphabet } from "nanoid"

export function GenerateRoomId() {
	const generateId = customAlphabet(
		"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
		8
	)
	const roomId = generateId()
        console.log(roomId)
        return roomId
}
