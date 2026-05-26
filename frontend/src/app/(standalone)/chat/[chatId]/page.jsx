"use client"
import {useParams} from "next/navigation"

export default function ChatPage(){

	const {chatId} = useParams();

	return(
		<h1>
			Page is being built
		</h1>
	)
}