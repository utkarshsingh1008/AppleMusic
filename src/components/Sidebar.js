import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../providers/UserProvider';
import axios from 'axios';
import {
  Grid, TextField, List, ListItem, ListItemIcon, ListItemText, Divider,
  Box, IconButton, Drawer, Button
} from '@mui/material';
import { styled } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import three from '../assets/three.svg';
import four from '../assets/four.svg';
import seven from '../assets/seven.svg';
import home from '../assets/home.svg';
import browse from '../assets/browse.svg';
import nine from '../assets/nine.svg';
import ten from '../assets/ten.svg';
import signin from '../assets/signin.svg';
import './sidebar.css';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure this is imported

const SidebarCol = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    padding: '10px',
  },
}));

const LightGrayBox = styled(Box)({
  background: 'lightgray',
});

function Sidebar({ onItemSelect }) {
  const { setSearchData, setErrorMessage } = useUser();
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const handleClick = () => {
    // toast.info("Under construction...", { autoClose: 2000 });
    setTimeout(() => {
      navigate('/radio');
    }, 2000);
    
    };
  const logoutHandler = (event) => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    event.preventDefault();
    navigate('/');
    window.location.reload();
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleFavoritesClick = () => {
    navigate(`/library?key=${refreshKey}`);
    setRefreshKey(prevKey => prevKey + 1);
  };

  const onSearchDetails = async (event) => {
    const queryString = {
      title: event.target.value
    };
    setSearchText(event.target.value);
    try {
      const response = await axios.get ('https://academics.newtonschool.co/api/v1/music/song', {
        params: {
          search: JSON.stringify(queryString)
        },
        headers: {
          projectID: 'cp0doe0u3fx9'
        }
      });
      setSearchData(response.data.data);
      navigate('/search');
    } catch (error) {
      setSearchData(null);
    }
  };

  const handleNavigation = (path) => {
    setSearchText('');

    if (typeof onItemSelect === 'function') {
      onItemSelect();
    }

    navigate(path);
  };

  return (
    <>
    <ToastContainer/>
      <Box sx={{ flexGrow: 1, position: 'fixed', zIndex: '1', top: '0px', background: 'rgb(249,249,249)', width: '305px' }}>
        <SidebarCol>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <div className="logoContainer">
                <Link to="/">
                  <img src={three} alt="applelogo" className="applelogo" />
                </Link>
              </div>
            </Grid>
            <Grid item>
              <div className="appSearchNavbar" style={{ marginLeft: '5%' }}>
                <TextField
                  type="text"
                  placeholder="Search..."
                  variant="outlined"
                  value={searchText}
                  onChange={onSearchDetails}
                  style={{ width: '75%' }}
                />
                <div className='searchIcon-navbar' style={{ marginLeft: '3%', marginBottom: '10%' }}>
                  <img src={four} alt="" />
                </div>
              </div>
            </Grid>
            <Grid item>
              <List>
                <ListItem button onClick={() => handleNavigation('/')} style={{ textDecoration: 'none', color: 'black', fontSize: '18px' }}>
                  <ListItemIcon>
                    <img src={home} alt="" />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem button onClick={() => handleNavigation('/browse')} style={{ textDecoration: 'none', color: 'black', fontSize: '18px' }}>
                  <ListItemIcon>
                    <img src={browse} alt="" />
                  </ListItemIcon>
                  <ListItemText primary="Browse" />
                </ListItem>
                <ListItem button onClick={() => handleNavigation('/radio')} style={{ textDecoration: 'none', color: 'black', fontSize: '18px' }}>
                  <ListItemIcon>
                    <img src={seven} alt="" />
                  </ListItemIcon>
                  <ListItemText primary="Radio" />
                </ListItem>
                <Divider />
                <Grid item>
                  <h3 style={{ marginLeft: '5%', marginTop: '12.5px' }}>PlayLists</h3>
                  <ListItem button onClick={() => handleNavigation('/moods')} style={{ textDecoration: 'none', color: 'black', fontSize: '18px' }}>
                    <ListItemText primary="Moods" style={{ marginBottom: '12.5px', marginTop: '12.5px' }} />
                  </ListItem>
                  <ListItem button onClick={() => handleNavigation('/album1')} style={{ textDecoration: 'none', color: 'black', fontSize: '18px' }}>
                    <ListItemText primary="Albums" style={{ marginBottom: '12.5px', marginTop: '12.5px' }} />
                  </ListItem>
                  {localStorage.getItem("token") && (
                    <ListItem button onClick={handleFavoritesClick} style={{ textDecoration: 'none', color: 'black', fontSize: '18px' }}>
                      <ListItemIcon>
                        <FavoriteIcon />
                      </ListItemIcon>
                      <ListItemText primary="Favorites" style={{ marginBottom: '12.5px', marginTop: '12.5px' }} />
                    </ListItem>
                  )}
                  {localStorage.getItem("token") && (
                    <ListItem button onClick={() => handleNavigation('/changepassword')} style={{ textDecoration: 'none', color: 'black', fontSize: '18px' }}>
                      <ListItemText primary="Change Password" style={{ marginBottom: '12.5px', marginTop: '32.5px' }} />
                    </ListItem>
                  )}
                </Grid>
                <Divider />
                <Grid item>
                  <Button 
                    // onClick={()=>toast.info("Under construction...")}
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      margin: "50px 0 200px 20px",
                      color: "black",
                      textTransform: "none",
                    }}
                  >
                    <img style={{ marginTop: "2px" }} src={nine} alt="" />
                    <div onClick={handleClick} sx={{ margin: "0 10px" }}>Open in Music</div>
                    <img style={{ marginTop: "5px" }} src={ten} alt="" />
                  </Button>
                </Grid>
              </List>
            </Grid>
          </Grid>
          <div className='login' style={{ backgroundColor: 'red', borderRadius: '10px', width: "150px", marginLeft: "15px" }}>
            {!localStorage.getItem('token') ? (
              <Button
                onClick={handleLogin}
                sx={{
                  backgroundColor: 'red',
                  borderRadius: '6px',
                  color: 'white',
                  textTransform: "none",
                  width: "100%",
                }}
                startIcon={<img src={signin} alt='' style={{ marginRight: '4px' }} />}
              >
                Sign In
              </Button>
            ) : (
              <Button
                onClick={logoutHandler}
                sx={{
                  backgroundColor: 'red',
                  borderRadius: '6px',
                  color: 'white',
                  textTransform: "none",
                  width: "100%",
                }}
                startIcon={<img src={signin} alt='' style={{ marginRight: '4px' }} />}
              >
                Sign out
              </Button>
            )}
          </div>
        </SidebarCol>
      </Box>

      {/* Mobile Drawer */}
      <Box sx={{ display: { md: 'none' } }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <Box onClick={handleDrawerToggle}>
            <Grid container direction="column" spacing={2}>
              {/* Repeat Sidebar content here for mobile drawer */}
            </Grid>
          </Box>
        </Drawer>
      </Box>
    </>
  );
}

export default Sidebar;
