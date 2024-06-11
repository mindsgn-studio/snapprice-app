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
});

export const useUser = () => React.useContext(UserContext);

export const UserProvider = ({ children }: { children: any }) => {
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [data, setData] = useState<null | any[]>([
        {
            id:"1234",
            title: "xbox One",
            image: "",   
        },
        {
            id:"12",
            title: "xbox One",
            image: "",
            
        },
        {
            id:"122",
            title: "xbox One",
            image: "",
            
        }
    ]);
    const [loading, setLoading] = useState<boolean>(false);

    const getSearch = async (search: string | null) => {
        try{
          if (page == 1) {
            setLoading(true);
          }
          
          const response = await fetch(`https://api.snapprice.co.za/search?search=${search}&page=${page}&limit=${100}`);      
          const { ok } = response;
          
          if (ok) {
            const responseData = await response.json();
      
            const { items } = responseData;
            console.log(items)
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
            setLoading
        }}
        >
        {children}
        </UserContext.Provider>
    );
};
