import { useNavigate } from "react-router-dom";


function Login(){

  const navigate = useNavigate();


  const handleLogin = () => {

    // temporary authentication token
    localStorage.setItem("token", "user-token");


    // redirect after login
    navigate("/client-dashboard");

  };


  return(

    <div>

      <h1>
        Login
      </h1>


      <button onClick={handleLogin}>
        Login
      </button>


    </div>

  );

}


export default Login;