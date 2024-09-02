import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useUser } from '../providers/UserProvider';
import { useNavigate } from 'react-router-dom';
function Artist() {
    const [getArtist, setArtist] = useState([]);
    const {setSongId} = useUser()
    const navigate = useNavigate();
    const artistList = async () => {
        try {
            const res = await axios.get('https://academics.newtonschool.co/api/v1/music/artist', {
                headers: {
                    'projectId': 'cp0doe0u3fx9'
                }
            });
            setArtist(res.data.data);
            console.log(res.data.data)
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        
        artistList();
    }, []);
    const handleArtistClick = async (songId) => {
       
        try {
          const response = await axios.get(`https://academics.newtonschool.co/api/v1/music/artist/${songId}`, {
            headers: {
              projectId: 'cp0doe0u3fx9'
            }
          });
          setSongId(response.data.data);
          navigate(`/ArtistSongs/${songId}`);
          console.log(songId);
        } catch (error) {
          console.error(error);
        } 
      };

  return (
    <>
    {/* <h1>Artist List</h1> */}
    {getArtist.map((artist, index) => (
    <div key={index} style={{ textAlign: 'center', cursor: 'pointer', margin: '20px' }} 
    onClick={() => handleArtistClick(artist._id)}>
        <img src={artist.image} alt={artist.name} style={{ width: '200px', borderRadius: '50%' }} />
        <p>{artist.name}</p>
    </div>
))}


    </>
  )
}

export default Artist
