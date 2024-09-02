import React, { useState } from "react";
import { Snackbar, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom"; 

const FloatingAD = () => {
  const [openAlert, setOpenAlert] = useState(true);

  const handleTryItForFree = () => {
    setOpenAlert(false);
  };

  return (
    <Snackbar
      open={openAlert}
      onClose={() => setOpenAlert(false)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      style={{ background: 'red', width:'100vw', height:'10vh',borderRadius:'20px',color:'white' }}
    >
      <div>
        <div className="flex justify-between items-center" style={{ padding: '16px' }}>
          <div>
            <Typography variant="h6" className="font-normal text-white">
              Get over 100 million songs free for 1 month.
              Plus your entire music library on all your devices. 1 month free, then $10.99/month.
            </Typography>
          </div>
          <div>
            <Button
              component={RouterLink}
              to="/subscription"
              variant="contained"
              color="primary"
              onClick={handleTryItForFree} 
            >
              Try it for free
            </Button>
          </div>
        </div>
      </div>
    </Snackbar>
  );
};

export default FloatingAD;
