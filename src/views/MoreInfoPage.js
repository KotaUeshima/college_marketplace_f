import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { useRecoilValue } from "recoil";
import { loggedIn, userState } from "./atoms";

function MoreInfoPage({ theme }) {
  const user = useRecoilValue(userState);
  const recoilLogin = useRecoilValue(loggedIn);
  const [info, setInfo] = useState("");
  const { id } = useParams();
  const { image_url, item_name, phone_number, price, user_id } = info;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:9292/more_info/${id}`)
      .then((res) => res.json())
      .then(setInfo);
  }, [id]);

  const boxStyle = {
    maxHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "30px",
  };

  const titleStyle = {
    fontSize: "2rem",
    textAlign: "center",
  };

  const string = "^/images";
  const regexp = new RegExp(string);
  let image = image_url;
  if (regexp.test(image) === true) {
    image = `http://localhost:9292/${image_url}`;
  }

  let showInterestButton = false;
  if (recoilLogin) {
    if (user_id !== user.id) {
      showInterestButton = true;
    }
  }

  function handleInterest() {
    fetch(`http://localhost:9292/interests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user_id: user.id,
        post_id: id,
      }),
    });
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Button
          style={{ marginTop: "20px", marginLeft: "30px" }}
          onClick={() => navigate(-1)}
          variant="contained"
          endIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
      </ThemeProvider>
      <Container style={boxStyle} sx={{ height: 1000, width: 1100 }}>
        <Box>
          <Card
            sx={{
              ":hover": {
                boxShadow: 20,
              },
            }}
          >
            <CardMedia
              component="img"
              height="450"
              image={image}
              alt={item_name}
            />
            <CardContent>
              <Typography style={titleStyle} variant="h5">
                {item_name}
              </Typography>
              <Typography variant="body2">{`Price: $${price}`}</Typography>
              <Typography variant="body2">
                {`Contact Info: ${phone_number}`}
              </Typography>
            </CardContent>
            {showInterestButton ? (
              <Button onClick={handleInterest}>Send Interest</Button>
            ) : null}
          </Card>
        </Box>
      </Container>
    </>
  );
}

export default MoreInfoPage;
