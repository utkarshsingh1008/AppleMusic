import React from "react";
import { Container, Grid, Typography } from "@mui/material";

const Footer = () => {
  return (
    <footer>
      <Container maxWidth="xl" sx={{ bgcolor: "background.paper", py: 4 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Typography variant="body1" align="center" color="text.secondary">
              <span className="languages-font text-white">United States</span>
              <span className="ml-2 languages-font">Español (México)</span>
              <span className="ml-2 languages-font">العربية</span>
              <span className="ml-2 languages-font">Русский</span>
              <span className="ml-2 languages-font">Français (France)</span>
              <span className="ml-2 languages-font">한국어</span>
              <span className="ml-2 languages-font">Português (Brazil)</span>
              <span className="ml-2 languages-font">Tiếng Việt</span>
              <span className="ml-2 languages-font">繁體中文 (台灣)</span>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" align="center" color="text.secondary">
              Copyright © 2024 <span className="font-bold text-white">Apple Inc. </span>
              <span>All rights reserved</span>
            </Typography>
            <Typography variant="body1" align="center" color="text.secondary">
              <span className="languages-font">Internet Service Terms</span>
              <span className="ml-2 languages-font">Apple Music and Privacy</span>
              <span className="ml-2 languages-font">Cookie Warning</span>
              <span className="ml-2 languages-font">Support</span>
              <span className="ml-2 languages-font">Feedback</span>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
