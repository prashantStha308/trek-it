import { create } from "zustand";

const useCitiesStore = create((set, get) => ({
    countries: [],
    cities: [],

    loadCountries: async () => {
        const {countries} = get();

        if(countries && countries.length > 0) return;

        const res = await fetch("/assets/docs/filteredCountries.json");
        const data =await res.json();

        set({ countries: data });

    },

    loadCities: async () => {
        const { cities } = get();

        if (cities && cities.length > 0) return;

        const res = await fetch("/assets/docs/nepalCities.json");
        const data =await res.json();

        set({ cities: data });
    },
}));


export default useCitiesStore;