import { create } from "zustand";

const useReviewStore = create((set, get) => ({

	/*
		use hashmap with package/guide Ids as their keys

		reviews:{
			[guideId]: [{},{},{}],
			[packageId]: [{},{},{}],
		}
	*/
	reviews:{}

	

}))