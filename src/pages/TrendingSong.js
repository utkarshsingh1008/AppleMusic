import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';
import MusicCard from '../components/MusicCard';
import { useUser } from '../providers/UserProvider';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../App.css';
import { MdOutlineNavigateNext } from "react-icons/md";

function TrendingSong() {
  const [getData, setData] = useState([]);
  const [filterSongs, setFilterSongs] = useState([]);
  const { setAudioPlayerSong, setSongId } = useUser();

  useEffect(() => {
    // Fetch songs when the component mounts
    onFilterSelection();
  }, []);

  const onFilterSelection = async () => {
    try {
      const response = await axios.get('https://academics.newtonschool.co/api/v1/music/song?filter={"featured":"Trending songs"}', {
        headers: {
          projectId: 'cp0doe0u3fx9',
        },
      });
      setFilterSongs(response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onMusicHandler = (index) => {
    let list = getData[index];
    setAudioPlayerSong(list);
    setSongId(list._id);
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div style={{ marginTop: '20px', marginLeft: '10px', marginRight: '10px' }}>
      <Carousel 
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={500}
        keyBoardControl={true}
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={['tablet', 'mobile', 'laptop', 'desktop']}
      >
        {filterSongs.map((obj, index) => (
          <div key={index} style={{ padding: '0 10px' }}>
            <MusicCard
              title={obj.title}
              thumbnail={obj.thumbnail}
              artist={obj.artist}
              id={index}
              onMusicHandler={onMusicHandler}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default TrendingSong;
