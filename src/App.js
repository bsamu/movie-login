import { useState, useEffect } from 'react';
import './App.css';
import http from 'axios';
import { eventCall, signup } from "./api/event_api";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function App() {
  const [response, setResponse] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  const handleEventCall = async (keyword) => {
    const resp = await eventCall(keyword)
    if (!resp) setResponse("Something went wrong")
    if (resp) setResponse(resp.data[0].word)
  }

  const handleSignup = async () => {
    const resp = await signup()
    if (!resp) setResponse("Something went wrong")
    // if (!resp) setResponse()
  }

  return (
    <div className="App">
      <Button
        variant="contained"
        sx={{
          margin: "15px 15px 0 0",
        }}
        onClick={() => handleEventCall("public")}
      >
        public
      </Button>
      <Button
        variant="contained"
        sx={{
          margin: "15px 0 0 15px",
        }}
        onClick={() => handleEventCall("private")}
      >
        private
      </Button>
      {response && <Typography variant="p" component="p" gutterBottom>
        {response}
      </Typography>
      }
      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "500px",
        marginTop: "60px",
      }}>
        <Box sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "column",
          border: "2px solid black",
          height: "100%",
          width: "60%",
          padding: "2rem",
          backgroundColor: "rgba(100, 150, 200, 0.2)",
        }}
        >
          <TextField
            error={((!/^((^[a-zA-Z0-9_]*$))/.test(username)) || !(username.length >= 6)) && username}
            label="Username"
            helperText={username.length === 0 ? "" : ((!/^((^[a-zA-Z0-9_]*$))/.test(username)) || username.length >= 6) ? "" : "Can only contain letters, numbers and underscores. At least 6 characters."}
            variant="filled"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername((username) => e.target.value)
            }}
            sx={{
              width: "70%",
              // kiszervezni külön fileba, különböző classokat adni isInvaliddal
            }}
          />
          <TextField
            error={(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) && email}
            label="Email"
            helperText={email.length === 0 ? "" : !(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) ? "" : "Please enter a valid email e.g.: tom@gmail.com"}
            variant="filled"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(email => e.target.value)
            }}
            sx={{
              width: "70%",
            }}
          />
          <TextField
            error={(!/^((^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$))/.test(password)) && password}
            label="Password"
            helperText={password.length === 0 ? "" : !(!/^((^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$))/.test(password)) ? "" : "Password must contain at least one lowercase and one uppercase letter, a special character and a number. At least 8 characters."}
            variant="filled"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              width: "70%",
            }}
          />
          <TextField
            error={password2 && password2 !== password}
            label="Password validation."
            disabled={(!/^((^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$))/.test(password)) && !password}
            helperText={password !== password2 ? "Must match password above." : ""}
            variant="filled"
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            sx={{
              width: "70%",
            }}
          />
          <Button
            variant="contained"
            sx={{
              marginTop: "15px",
            }}
            onClick={handleSignup}
          >
            Sign up
          </Button>
        </Box>
      </Box>
    </div >
  );
}

export default App;
