import React from 'react';
import { useUser } from '../providers/UserProvider';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell, Button, Card, CardContent, CardMedia } from '@mui/material';

export default function AlbumSongs() {
  const { songId, setAudioPlayerSong } = useUser();

  const onMusicHandler = (song) => {
    setAudioPlayerSong(song);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h1">{songId.title}</Typography>
        <img src={songId.image}  width="300px" alt="" />
        <Typography variant="body1">{songId.description}</Typography>

        <Table>
          <TableHead>
            <TableRow>
             
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Release Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {songId.songs && songId.songs.map((obj, index) => (
              <TableRow key={index}>
               
                <TableCell>
                  <img src={obj.thumbnail} alt={`Thumbnail of ${obj.title}`} style={{ width: '50px', height: '50px' }} />
                </TableCell>
                <TableCell>{obj.title}</TableCell>
                <TableCell>{new Date(obj.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button onClick={() => onMusicHandler(obj)} variant="contained" color="primary">Play</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
