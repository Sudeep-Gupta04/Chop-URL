import { useForm } from "react-hook-form";
import TextField from "../TextField";
import { Link } from "react-router-dom";
import "./registerpage.css"; // Importing CSS file
import { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const RegisterPage = () => {
  const[loader,setLoader] = useState(false);
  const navigate = useNavigate();
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


  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const {data:response} = await api.post("/api/auth/public/register", data);
      reset();
      navigate("/");
      setLoader(false);
      toast.success(response.message);
    }
    catch(error){
      console.log(error);
      toast.error("Register failed");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <h1 className="register-title">Register Here</h1>
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
            label="Email"
            id="email"
            type="email"
            register={register}
            errors={errors}
            required={true}
            message="Email is required"
            placeholder="Enter your email"
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

        <button type="submit" className="register-button">Register</button>

        <p className="register-login-text">
          Already have an account?{" "}
          <Link to="/login" className="login-link">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
