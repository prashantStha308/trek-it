import {useEffect} from "react"

import { usePackageSearchQuery } from "@/queries/package.query.js";
import { useGuideSearchQuery } from "@/queries/guide.query.js";
import useUIStore from "@/store/ui.store.js";


export const MIN_SEARCH_WORD_LENGTH = 2;

export const useGlobalSearch = () => {
    const searchWord = useUIStore((s) => s.searchModalWord);
    const isOpen = useUIStore((s) => s.isSearchModalOpen);

    const {setIsSearchModalOpen, setSearchModalWord} = useUIStore.getState();

    const enabled = isOpen && searchWord.trim().length >= MIN_SEARCH_WORD_LENGTH;

    const { data: packageData, isLoading: packageLoading } = usePackageSearchQuery(
        { name: searchWord },
        { enabled }
    );
    const { data: guideData, isLoading: guideLoading } = useGuideSearchQuery(
        { name: searchWord },
        { enabled }
    );

    useEffect(()=>{

        return ()=> {
            setIsSearchModalOpen(false);
            setSearchModalWord("")
        }
    },[])

    return {
        searchWord,
        isOpen,
        hasMinLength: searchWord.trim().length >= MIN_SEARCH_WORD_LENGTH,
        packages: packageData?.docs ?? [],
        guides: guideData?.docs ?? [],
        isLoading: packageLoading || guideLoading,
    };
};