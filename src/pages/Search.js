import React from 'react';
import { useUser } from '../providers/UserProvider';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell, Button, Card, CardContent, CardMedia } from '@mui/material';

function Search() {
    const { searchData } = useUser();
    const { setAudioPlayerSong } = useUser();

    const onMusicHandler = (index) => {
        let song = searchData[index];
        setAudioPlayerSong(song);
    };

    return (
        <div>
         <Table>
          <TableHead>
            <TableRow>
             
              <TableCell>Thumbnail</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Release Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {searchData != null && searchData.length > 0 ? (
  searchData.map((obj, index) => (
    <TableRow key={index}>
      <TableCell>
        <img src={obj.thumbnail} alt={`Thumbnail of ${obj.title}`} style={{ width: '50px', height: '50px' }} />
      </TableCell>
      <TableCell>{obj.title}</TableCell>
      <TableCell>{new Date(obj.createdAt).toLocaleDateString()}</TableCell>
      <TableCell>
        <Button onClick={() => onMusicHandler(index)} variant="contained" color="primary">Play</Button>
      </TableCell>
    </TableRow>
  ))
) : (
  <TableRow>
    <TableCell colSpan={4}><h1>No Songs found</h1> </TableCell>
  </TableRow>
)}

          </TableBody>
        </Table>
        </div>
    );
}

export default Search;
