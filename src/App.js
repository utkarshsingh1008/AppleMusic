import React, { useEffect } from 'react';
import MediaQuery from 'react-responsive';
import Sidebar from './components/Sidebar';
import Navbar1 from './components/Navbar1';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Browse from './pages/Browse';
import './App.css';
import { useUser } from './providers/UserProvider';
import Moods from './pages/Moods';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import StartPage from './pages/Home';
import Subscription from './pages/Subscription';
import Library from './pages/Library';
import ChangePassword from './pages/ChangePassword';
import Album from './pages/Album';
import AlbumSongs from './pages/AlbumSongs';
import Carousel from './pages/Carousel';
import Artist from './pages/Artist';
import ArtistSongs from './pages/ArtistSongs';
import Radio from './pages/Radio';
import Signin from './pages/Signin';
import Search from './pages/Search';
import TrendingSong from './pages/TrendingSong';
import TopFifty from './pages/TopFifty';
import TopTwenty from './pages/TopTwenty';
import NewSong from './pages/NewSong';
import Album1 from './pages/Album1';

function App() {
  const { token, setIsMobile } = useUser();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial size

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setIsMobile]);

  function ProtectedRoute({ children }) {
    if (localStorage.getItem("token")) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  }

  return (
    <div className="main-container">
      <BrowserRouter>
        <div className="leftcontent">
          <MediaQuery minWidth={1024}>
            <Sidebar />
          </MediaQuery>
        </div>
        
        <div className="rightcontent">
          <Navbar1 />
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/album" element={<Album />} />
            <Route path="/album1" element={<Album1 />} />
            <Route path="/search" element={<Search />} />
            <Route path="/radio" element={<Radio />} />
            <Route path="/artist" element={<Artist />} />
            <Route path="/AlbumSongs/:id" element={<AlbumSongs />} />
            <Route path="/ArtistSongs/:id" element={<ArtistSongs />} />
            <Route path="/moods" element={<Moods />} />
            <Route path="/trending" element={<TrendingSong />} />
            <Route path="/newsong" element={<NewSong />} />
            <Route path="/topfifty" element={<TopFifty />} />
            <Route path="/toptwenty" element={<TopTwenty />} />
            <Route path="/subscription" element={<Subscription />} />
            {/* <Route path="/navbar1" element={<Navbar1 />} /> */}
            <Route 
              path="/library" 
              element={
                <ProtectedRoute>
                  <Library />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
