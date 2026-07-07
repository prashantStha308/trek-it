"use client";

import {useGetMe} from "@/queries/auth.query.js"

import GuideEditPage from "../guide/GuideEditPage";
import TouristEditPage from "../tourist/TouristEditPage";



export default function EdiPage(){
	const {data:me, isLoading} = useGetMe();
	const target = me?.role === "guide" ? <GuideEditPage /> : <TouristEditPage />


	return target
}