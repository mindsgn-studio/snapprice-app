import { create } from 'zustand'

interface Search {
    title: string
}

interface SearchInterface {
    search: Search[],
    setSearch: (search: Search) => void,
    clearSearch: () => void
}

const useSearch = create<SearchInterface>((set, get) => ({
  search: [],
  setSearch: (search: Search) => {
    const oldSearch = get().search;
    console.log(oldSearch);
    set({ search: [...oldSearch, search] });
  },
  clearSearch: () => set({search: []})
}))


export {
    useSearch
}
