import { create } from 'zustand'

interface Search {
  id: string,
  title: string,
  images: string[],
  price: string
}

interface SearchInterface {
  search: Search[],
  loading: boolean,
  setLoading: (loading: boolean) => void,
  setSearch: (search: Search) => void,
  clearSearch: () => void
}

const useSearch = create<SearchInterface>((set, get) => ({
  search: [],
  loading: false,
  setLoading: (loading: boolean) => {
    set({ loading: true })
  },
  setSearch: (search: Search) => {
    const oldSearch = get().search;
    set({ search: [...oldSearch, search], loading: false });
  },
  clearSearch: () => set({search: []})
}));

export {
    useSearch
}
