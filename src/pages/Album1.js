import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MusicCard from '../components/MusicCard';
import { useUser } from '../providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import { Grid, CircularProgress, Typography } from '@mui/material';

function Album() {
  const [albumData, setAlbumData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setSongId } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAlbumData() {
      setLoading(true);
      try {
        const response = await axios.get('https://academics.newtonschool.co/api/v1/music/album', {
          headers: {
            projectId: 'cp0doe0u3fx9'
          }
        });
        setAlbumData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        setError('Error fetching album data');
      } finally {
        setLoading(false);
      }
    }

    fetchAlbumData();
  }, []);

  const handleAlbumClick = async (songId) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://academics.newtonschool.co/api/v1/music/album/${songId}`, {
        headers: {
          projectId: 'cp0doe0u3fx9'
        }
      });
      setSongId(response.data.data);
      navigate(`/AlbumSongs/${songId}`);
      console.log(songId);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <CircularProgress />}
      {error && <Typography variant="body1" color="error">{error}</Typography>}
      <Grid container spacing={2} justifyContent="center">
        {albumData.map(album => (
          <Grid style={{marginTop:"5%"}} item key={album._id} xs={12} sm={6} md={4} lg={3} sx={{marginBottom:'20px'}}>
            <MusicCard
              title={album.title}
              thumbnail={album.image}
              artist={album.artists}
              id={album._id}
              onMusicHandler={() => handleAlbumClick(album._id)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Album;
