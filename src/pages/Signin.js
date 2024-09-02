import { FaApple } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

function Signin() {
  const [error, setError] = useState("");
  const [data, setData] = useState({
    appType: "music",
    email: "",
    password: "",
    name: ""
  });
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    axios.post("https://academics.newtonschool.co/api/v1/user/signup",{
      headers: {
        projectID: 'cp0doe0u3fx9'
      }
    })
      .then((response) => {
        console.log(response);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError("Unknown error");
        }
      });
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width:'60%'
        }}
      >
        <FaApple className=" text-gray-500 text-4xl mb-4" />
        <Typography component="h1" variant="h5" mb={2}>
          Sign In or Sign Up
        </Typography>
        <Typography component="p" variant="body1" color="textSecondary" mb={4}>
          Enter your email to get started.
        </Typography>
        <form onSubmit={onSubmitHandler} style={{ width: "100%" }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email or Apple ID"
            name="email"
            autoComplete="email"
            autoFocus
            value={data.email}
            onChange={onChangeHandler}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={data.password}
            onChange={onChangeHandler}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="name"
            label="Name"
            id="name"
            value={data.name}
            onChange={onChangeHandler}
          />
          <pre> Your Apple ID information is used to allow you to sign in securely and <br/>
        access your data. Apple records certain data for security, support, and<br/>
        reporting purposes. If you agree, Apple may also use your Apple ID<br/>
        information to send you marketing emails and communications, including<br/>
        based on your use of Apple services.</pre>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: "red", color: "white" }}
          >
            Continue
          </Button>
        </form>
        {error && (
          <Typography component="h1" variant="h6" mt={2} color="error">
            {error}
          </Typography>
        )}
      </Box>
     
    </Container>
  );
}

export default Signin;
