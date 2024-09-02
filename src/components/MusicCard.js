import { Grid, Typography } from "@mui/material";

function MusicCard(props) {
    const { title, thumbnail, artist, id, onMusicHandler } = props;

    const artistList = artist.map((item) => item.name).join(" & ");

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <div
                className="musicCard"
                style={{
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
            >
                <img
                    src={thumbnail}
                    alt=""
                    className="bannerImg"
                    onClick={() => onMusicHandler(id)}
                    style={{ width: "97.5%", height: "auto", borderRadius: "12px",padding:"5px"}}
                />
                <Typography
                    variant="h6"
                    className="music-title"
                    // align="center"
                    style={{
                        marginTop: "13px",
                        textOverflow: "ellipsis", // Sets ellipsis (...) for overflow
                        whiteSpace: "nowrap", // Prevents text wrapping
                        overflow: "hidden",
                        fontSize: "16px",
                    }}
                >
                   {artistList}
                   
                </Typography>
                <Typography variant="body2" className="artist" >
                  {title}
                </Typography>
            </div>
        </Grid>
    );
}

export default MusicCard;
