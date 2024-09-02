import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Button, Typography, Table, TableHead, TableBody, TableRow, TableCell, Divider } from '@mui/material';
import Footer from './Footer';
import { useUser } from '../providers/UserProvider';
import AboveFooter from './AboveFooter';
import Carousel from './Carousel';
import Artist from './Artist';
import Album from './Album';
import TrendingSong from './TrendingSong';
import NewSong from './NewSong'
import TopFifty from './TopFifty';
import TopTwenty from './TopTwenty';

function Browse() {
    const [getData, setData] = useState([]);
    const [getMusic, setMusic] = useState(null);
    const { searchData } = useUser();
    const { setAudioPlayerSong } = useUser();
   
    useEffect(() => {
        musicList();
     
    }, [searchData]);

    const musicList = async () => {
        try {
            const res = await axios.get('https://academics.newtonschool.co/api/v1/music/song', {
                headers: {
                    'projectId': 'cp0doe0u3fx9'
                }
            });
            setData(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const onFilterSelection = async (input) => {
        let url;
        if (input === "Trending songs") {
            url = 'https://academics.newtonschool.co/api/v1/music/song?filter={"featured":"Trending songs"}';
        } else if (input === "Top 50 of this month") {
            url = 'https://academics.newtonschool.co/api/v1/music/song?filter={"featured":"Top 50 of this month"}';
        } else if (input === "Top 20 of this week") {
            url = 'https://academics.newtonschool.co/api/v1/music/song?filter={"featured":"Top 20 of this week"}';
        }
        try {
            const res = await axios.get(url, {
                headers: {
                    'projectId': 'cp0doe0u3fx9'
                }
            });
            setData(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const onMusicHandler = (index) => {
        let list = getData[index];
        setMusic(list);
        setAudioPlayerSong(list);
    };

    // const handleArtistClick = async (artistId) => {
    //     try {
    //         const response = await axios.get(`https://academics.newtonschool.co/api/v1/music/artist/${artistId}/songs`, {
    //             headers: {
    //                 projectId: 'cp0doe0u3fx9'
    //             }
    //         });
    //         setData(response.data.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    return (
        <>
        <Carousel />
            
           
{/*                 
                <Grid item xs={12}>
                    <Grid container spacing={2} justifyContent="center">
                        {
                            getData.map((obj, index) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={index} sx={{marginBottom:'20px'}}>
                                    <MusicCard
                                        title={obj.title}
                                        thumbnail={obj.thumbnail}
                                        artist={obj.artist}
                                        id={index}
                                        onMusicHandler={onMusicHandler}
                                       
                                    />
                                </Grid>
                            ))
                        
                                }
                    </Grid>
                </Grid> */}

                <Typography variant="h4" align="center" gutterBottom sx={{marginTop:'80px'}}>New Song</Typography>

                <NewSong />
          
            <Typography variant="h4" align="center" gutterBottom sx={{marginTop:'80px'}}>Trending Songs</Typography>
            
            
            <TrendingSong />
            
            <Typography variant="h4" align="center" gutterBottom sx={{marginTop:'80px'}}>Top 50 of this month</Typography>
           
            
            <TopFifty />
           
            <Typography variant="h4" align="center" gutterBottom sx={{marginTop:'80px'}}>Top 20 of this week</Typography>
          
            
            <TopTwenty/>
            
            <Typography variant="h4" align="center" gutterBottom sx={{marginTop:'80px'}}>Albums</Typography>
            
            <Album/>
          
            <Typography variant="h4" align="center" gutterBottom sx={{marginTop:'80px'}}>Top Artist</Typography>
            <Grid container spacing={2} justifyContent="center">
            <Artist/>
            </Grid>
            <br/>
            <br/>
            <br/>
            <br/>
             <AboveFooter />
            <Footer />
        </>
    );
}

export default Browse;
    