import { create } from 'zustand'

interface Price {
  Item_id: string,
  price: number,
  date: Date
}

interface Item {
  uuid: string,
  title: string,
  brand: string,
  image: string,
  price: [Price],
  source_name: string,
  link: string,
}

interface SearchInterface {
  search: string,
  items: Item[],
  loading: boolean,
  page: number,
  limit: number,
  hasNext: boolean,
  setLoading: (loading: boolean) => void,
  setPagination: ({page, hasNext}:{page: number, hasNext: boolean}) => void,
  setItems: (search: [Item]) => void,
  setSearch: (text: string) => void,
  clearSearch: () => void
}

const useSearch = create<SearchInterface>((set, get) => ({
  items: [],
  search: "",
  loading: false,
  page: 1,
  hasNext: false,
  limit: 10,
  setLoading: (loading: boolean) => {
    set({ loading: loading })
  },
  setSearch: (text: string) => {
    set({search: text, page: 1})
  },
  setPagination: ({page, hasNext}:{page: number, hasNext: boolean}) => {
    set({page: page +1, hasNext});
  },
  setItems: (items: [Item]) => {
    const oldItems = get().items;
    set({ items: [...oldItems, ...items], loading: false });
  },
  clearSearch: () => set({items: [], page: 1})
}));

export {
    useSearch
}
