import { Box, Fade, Typography } from "@mui/material";
import { NotInterested as NotInterestedIcon } from "@mui/icons-material";

function Empty() {
  return (
    <Fade in style={{ transitionDelay: "300ms" }}>
      <Box
        sx={{
          margin: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <NotInterestedIcon fontSize="large" />
        <Typography component="p" variant="h5" m={1}>
          The entries list is empty
        </Typography>
      </Box>
    </Fade>
  );
}

export default Empty;
