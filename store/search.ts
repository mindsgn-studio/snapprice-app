import { create } from 'zustand'

interface Price {
  ItemID: string,
  Price: number,
  Date: Date
}

interface Search {
  ID: string,
  Title: string,
  Brand: string,
  Images: [string],
  Link: string,
  Price: [Price]
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
    set({ loading: loading })
  },
  setSearch: (search: Search) => {
    const oldSearch = get().search;
    set({ search: [...oldSearch, ...search], loading: false });
  },
  clearSearch: () => set({search: []})
}));

export {
    useSearch
}
