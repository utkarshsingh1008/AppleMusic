import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../providers/UserProvider';
import { RiDeleteBin2Fill } from "react-icons/ri";
import { IconContext } from 'react-icons';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

function Library() {
  const { getToken } = useUser();
  const [getList, setList] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state
  const { setAudioPlayerSong } = useUser();
  
  useEffect(() => {
    listOfLibrary();
  }, []);

  const deleteHandler = (songId) => {
    if (loading) return; // Prevent multiple calls while one is in progress
    setLoading(true); // Set loading state to true before making the API call

    axios.patch('https://academics.newtonschool.co/api/v1/music/favorites/like', { songId: songId }, {
      headers: {
        projectID: 'cp0doe0u3fx9',
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then((result) => {
      // listOfLibrary();
      setLoading(false);
      setList(result.data.data.songs); // Reset loading state after API call is complete
      setAudioPlayerSong(null);
    }).catch((error) => {
      console.log(error);
      setLoading(false); // Reset loading state in case of error
    });
  }

  const listOfLibrary = () => {
    axios.get('https://academics.newtonschool.co/api/v1/music/favorites/like', {
      headers: {
        projectID: 'cp0doe0u3fx9',
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then((result) => {
      // console.log(result.data.data.songs)
      setList(result.data.data.songs);
    }).catch((err) => {
      console.log(err);
    })
  }

  const playHandler = (song) => {
    setAudioPlayerSong(song); // Set the song in the global state
    const audioElement = document.getElementById('audioPlayer'); // Get the audio element from Navbar1
    if (audioElement) {
      audioElement.src = song.audio_url; // Set the song source
      audioElement.play(); // Play the song immediately
    }
  };

  return (
    <div className="global-container" style={{ marginLeft: '60px' }}>
      <div className="right-sidebar">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
             {getList.length > 0 ? getList.map((obj, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <img src={obj.thumbnail} height={"50"} width={"50"} className="bannerImg" alt="" />
                  </TableCell>
                  <TableCell>{obj.title}</TableCell>
                  <TableCell>
                  <Button onClick={(e) => {  e.preventDefault();  playHandler(obj);}} variant="contained"color="primary">Play</Button>
                   <Button onClick={(e) => { e.preventDefault(); deleteHandler(obj._id); }} style={{backgroundColor:'rgb(255,0,0)', color:'white', fontWeight:'600', marginLeft: '8px'}} >
  Remove
</Button>

                  </TableCell>
                </TableRow>
              )) : <TableRow><TableCell colSpan={3} style={{ textAlign: 'center', fontSize:'20px',fontWeight:'700' }}> No Song Added....</TableCell></TableRow>}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Library;
