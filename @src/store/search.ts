import { create } from 'zustand'

interface Search {
    id: string,
    title: string,
    image: string
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
    set({ search: [...oldSearch, search] });
  },
  clearSearch: () => set({search: []})
}))


export {
    useSearch
}
