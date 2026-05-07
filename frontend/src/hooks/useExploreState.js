import { useState, useRef } from "react";
import { usePackageSearchQuery, useGetAllPackages } from "@/queries/package.query";
import { useGuideSearchQuery, useGetAllGuides } from "@/queries/guide.query";
import { useGetRegions, useGetActivities, useGetSpecialities } from "@/queries/meta.query";



const TABS = {
    package: "package",
    guide: "guide"
};

const DEFAULT_FILTERS = {
    [TABS.package]: { regions: [], activities: [], name: "" },
    [TABS.guide]: { regions: [], specialities: [], gender: "", minAge: null, maxAge: null, name: "" }
};

export { TABS };

export const useExploreState = () => {
    const [tab, setTab] = useState(TABS.package);
    const [showFilters, setShowFilters] = useState({ [TABS.package]: false, [TABS.guide]: false });
    const [search, setSearch] = useState({ [TABS.package]: "", [TABS.guide]: "" });
    const [page, setPage] = useState({ [TABS.package]: 1, [TABS.guide]: 1 });
    const [filter, setFilter] = useState(DEFAULT_FILTERS);
    const debounce = useRef(null);

    // Tab updater 
    const updateTabState = (setter, value, targetTab = tab) => {
        setter(prev => ({
            ...prev,
            [targetTab]: typeof value === "function" ? value(prev[targetTab]) : value
        }));
    };

    const currentSearch = search[tab];
    const currentFilter = filter[tab];
    const currentPage = page[tab];
    const currentShowFilters = showFilters[tab];

    const setCurrentSearch = (val) => updateTabState(setSearch, val);
    const setCurrentFilter = (val) => updateTabState(setFilter, val);
    const setCurrentShowFilters = (val) => updateTabState(setShowFilters, val);
    const setCurrentPage = (val) => updateTabState(setPage, val);

    // Derived
    const isPackageTab = tab === TABS.package;
    const isGuideTab = tab === TABS.guide;

    const hasFilters = !!(
        currentFilter.name?.length >= 2 ||
        currentFilter.regions?.length ||
        currentFilter.activities?.length ||
        currentFilter.specialities?.length ||
        currentFilter.gender
    );

    // Queries
    const { data: packageSearchData, isLoading: packageSearchLoading } = usePackageSearchQuery(currentFilter, {
        enabled: isPackageTab && hasFilters
    });
    const { data: allPackageData, isLoading: allPackageLoading } = useGetAllPackages({ page: currentPage }, {
        enabled: isPackageTab && !hasFilters
    });
    const { data: guideSearchData, isLoading: guideSearchLoading } = useGuideSearchQuery(currentFilter, {
        enabled: isGuideTab && hasFilters
    });
    const { data: allGuideData, isLoading: allGuideLoading } = useGetAllGuides({ page: currentPage }, {
        enabled: isGuideTab && !hasFilters
    });


    // Meta
    const { data: regions, isLoading: regionsLoading, isError: regionsIsError, error: regionsError } = useGetRegions();
    const { data: activities, isLoading: activitiesLoading, isError: activitiesIsError, error: activitiesError } = useGetActivities({},{
        enabled: isPackageTab
    });
    const { data: specialities, isLoading: specialitiesLoading, isError: specialitiesIsError, error: specialitiesError } = useGetSpecialities({},{ enabled: isGuideTab });

    const metaData = {
        regions,
        ...(isPackageTab ? { activities } : { specialities })
    }
    const isMetaLoading = regionsLoading || (isPackageTab ? activitiesLoading : specialitiesLoading);


    const data = isPackageTab
        ? (hasFilters ? packageSearchData : allPackageData)
        : (hasFilters ? guideSearchData : allGuideData);

    const isLoading = isPackageTab
        ? (hasFilters ? packageSearchLoading : allPackageLoading)
        : (hasFilters ? guideSearchLoading : allGuideLoading);

    // Handlers
    const handleSearchWords = (e) => {
        const value = e.target.value;
        setCurrentSearch(value);
        clearTimeout(debounce.current);
        debounce.current = setTimeout(() => {
            setCurrentFilter(prev => ({ ...prev, name: value }));
        }, 300);
    };

    const handleTabChange = (newTab) => {
        setTab(newTab);
    };

    return {
        // tab
        tab,
        handleTabChange,
        isPackageTab,
        isGuideTab,
        // search
        currentSearch,
        handleSearchWords,
        // filter
        currentFilter,
        setCurrentFilter,
        currentShowFilters,
        setCurrentShowFilters,
        hasFilters,
        // pagination
        currentPage,
        setCurrentPage,
        // data
        data,
        isLoading,
        // metdData
        metaData,
        isMetaLoading,
    };
};