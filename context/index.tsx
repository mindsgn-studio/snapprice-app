import React, { useState, useEffect } from "react";

interface UserInterface {
  page: number,
  loading: boolean,
  data: any,
  search: string,
  setSearch: (search: string)=> void
  setPage: (page: number) => void;
  setData: (data: any) => void;
  setLoading: (loading: any) => void;
  getSearch: () => void;
}

export const UserContext = React.createContext<UserInterface>({
  page: 1,
  loading: false,
  data: [],
  search: "",
  setSearch: (search: string)=> {},
  setPage:(page: number) => {},
  setData: (data: any) => {},
  setLoading: (loading: boolean) => {},
  getSearch: () => {},
});

export const useUser = () => React.useContext(UserContext);

export const UserProvider = ({ children }: { children: any }) => {
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [data, setData] = useState<null | any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getSearch = async () => {
        try{
          if (page == 1) {
            setData([]);
            setLoading(true);
          }
          
          const response = await fetch(`https://api.snapprice.co.za/search?search=${search}&page=${page}&limit=${100}`);      
          const { ok } = response;
          
          if (ok) {
            const responseData = await response.json();
      
            const { items } = responseData;
            console.log(items[0])
            if(items){
              setData((prevData: any) => [...prevData, ...items]);
            }
      
            if (page == 1) {
               setLoading(false);
            }
      
            setPage(page + 1);
          }
        }catch(error){
          console.log(error)
        }
    };

    return (
        <UserContext.Provider
        value={{
            search,
            page,
            data,
            loading,
            setSearch,
            setPage,
            setData,
            setLoading,
            getSearch
        }}
        >
        {children}
        </UserContext.Provider>
    );
};
