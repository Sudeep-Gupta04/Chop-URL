import { useForm } from "react-hook-form";
import TextField from "../TextField";
import { Link } from "react-router-dom";
import "./login.css"; // Importing CSS file
import { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStoreContext } from "../../contextApi/ContextApi";

const Login = () => {
  const[loader,setLoader] = useState(false);
  const navigate = useNavigate();
  const {setToken} = useStoreContext();
  const{
    register,
    handleSubmit,
    reset,
    formState: { errors }
  }= useForm({
    defaultValues:{
      username:"",
      email:"",
      password:""
    },
    mode:"onTouched",
  });


  const onSubmit = async (formdata) => {
    setLoader(true);
    try {
      const {data} = await api.post("/api/auth/public/login", formdata);
      // store the token in the browser locol storage
      setToken(data.token);
      localStorage.setItem("JWT_token",JSON.stringify(data.token));
      console.log(data);
      reset();
      navigate("/");
      setLoader(false);
      toast.success("Login Sucessful !!!");
    }
    catch(error){
      console.log(error);
      toast.error("Login failed");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <h1 className="register-title">Login Here</h1>
        <hr className="register-divider" />

        <div className="form-group">
          <TextField 
            label="Username"
            id="username"
            type="text"
            register={register}
            errors={errors}
            required={true}
            message="Username is required"
            placeholder="Enter your username"
          />

          <TextField 
            label="Password"
            id="password"
            type="password"
            register={register}
            errors={errors}
            required={true}
            message="Password is required"
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className="register-button">Login</button>

        <p className="register-login-text">
          Create a new Account?{" "}
          <Link to="/register" className="login-link"> Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
