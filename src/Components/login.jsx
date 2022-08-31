import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styling/createAndUpdateUser.css"
import axios from "axios";

function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [ loggedIn, setLoggedIn ] = useState(false);
  const [ created, setCreated ] = useState(false);

  const loginUser = async () => {
    console.log(email, password);
    try{
        // const responseData = await axios
        await axios
          .post("/login", {
            email,
            password,
          });
          // setLoggedIn(true)
          setCreated(true);
          
          // setLoggedIn(true)
          console.log('User Logged IN'); // we are awaiting to get the response. 
           // if this works properly then it will navigate it to the given route.
      }
    catch(error){
      console.log(error)
      if (error.response.status === 401) {
        alert(error.response.data.message);
    }
  };
};

  return (
    <div className="loginUser">
        { 
            created
            ?
            <div className='created' style={{ textAlign: 'center', padding:"2rem" }}>
                <h1 style={{backgroundColor: "#c7ffe5", border:"3px solid #fff"}}>
                  Successfully LoggedIN!
                </h1>
                <button onClick={(e)=>{
                                return(
                                  e.preventDefault(),
                                  navigate("/")
                                )}} 
                  style={{fontSize:16, backgroundColor: "#90CAF9", borderRadius: 10, marginTop:10 , border: "2px solid #fff"}} 
                >Return Home
                </button>          
            </div>
            :
            <>
              <h1 style={{textAlign: 'center', marginBottom: '20px'}}>Login</h1>
              <Form onSubmit={(e) => e.preventDefault()}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{ marginLeft:5 }}>Email : </Form.Label>
                  <Form.Control
                    type="email"
                    style={{borderRadius: 16 }}
                    value={email}
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {/* <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text> */}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label style={{ marginLeft:5 }}>Password: </Form.Label>
                  <Form.Control
                    type="password"
                    style={{borderRadius: 16 }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your Password"
                  />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group> */}
              {email && password ?
                  <>
                  <Button type='submit' onClick={loginUser} style={{color: "black", border: "2px solid #fff", marginLeft: 180 ,backgroundColor: "#90CAF9", borderRadius:16}}>
                    Submit
                  </Button>
                  </>
              :
                  <Button style={{color: "black", border: "2px solid #fff", marginLeft: 180 ,backgroundColor: "#F5F5F5", borderRadius:16}}>
                        Submit
                  </Button>
              }    
            </Form>
        </>
      }
    </div>
  );
}

export default Login;
