import React from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const Pagination = ({ currentPage, songsPerPage, totalSongs, paginate }) => {
  return (
    <div className="flex items-center justify-center gap-8 xl:mt-0 lg:mt-0 mt-5">
      <IconButton
        size="small"
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className='text-white'
      >
        <ArrowLeftIcon sx={{ fontSize: 18 }} />
      </IconButton>
      <Typography color="textSecondary" variant="body2" className="font-normal">
        Page <strong className="text-white">{currentPage}</strong> of{' '}
        <strong className="text-white">
          {Math.ceil(totalSongs / songsPerPage)}
        </strong>
      </Typography>
      <IconButton
        size="small"
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === Math.ceil(totalSongs / songsPerPage)}
        className='text-white'
      >
        <ArrowRightIcon sx={{ fontSize: 18 }} />
      </IconButton>
    </div>
  );
};

export default Pagination;
