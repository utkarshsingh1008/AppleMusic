import { createContext,useContext,useState } from "react";

const UserContext = createContext();

// const SearchDataContext  = createContext();
export const UserProvider = ({children})=>{
    const [audioPlayerSong, setAudioPlayerSong]= useState();
    const [token ,setToken] = useState(localStorage.getItem('token'));
    const [name,setName] = useState(localStorage.getItem('name'));
    const [searchData, setSearchData] = useState([]);
    const [songId, setSongId] = useState('');
  
    
 
    const [getList, setList]= useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const onTokenHandler=(data)=>{
          setToken(data);
          localStorage.setItem('token',data);
    }

    const onNameHandler=(data)=>{
          setName(data);
          localStorage.setItem('name',data);
    }

    const object={
        token,
        name,
        onTokenHandler,
        onNameHandler
       
    }


    return (<div>
        <UserContext.Provider value={{ object,isMobile, setIsMobile, getList, setList,  searchData, setSearchData, audioPlayerSong, setAudioPlayerSong, songId, setSongId }}>

      {children}

</UserContext.Provider>
    </div>)
}

export function useUser(){
    return useContext(UserContext);
} 