import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useStoreContext } from "../../contextApi/ContextApi"; // Adjust the import path as necessary
import TextField from "../TextField"; // Adjust the import path as necessary
import { RxCross2 } from "react-icons/rx"; // Make sure this import is correct
import api from "../../api/api";
import { toast } from "react-toastify";

const CreateNewShortern = ({ setOpen, refetch }) => {
  const { token } = useStoreContext(); 
  const [loading, setLoading] = useState(false); // Fixed typo: loding -> loading

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      originalUrl: "",
    },
    mode: "onTouched",
  });

  const createShortUrlHandler = async (data) => {
    setLoading(true);
    try {
     const {data:res} = await api.post("/api/urls/shorten", data, {
        headers: {
            "content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            },
        });

        const shorternUrl = `${import.meta.env.VITE_REACT_SUBDOMAIN}/${res.shortUrl}`; 
        navigator.clipboard.writeText(shorternUrl).then(() => {
            toast.success("Short URL copied to clipboard!",
                {
                    className: "toast-success",
                    style: {
                        backgroundColor: "#4CAF50",
                        color: "white",
                        fontSize: "16px",
                        padding: "10px 20px",
                        borderRadius: "8px",
                    },
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            )
        }); 
       
        console.log("Short URL created:", res);
        reset(); // Reset the form after successful submission
        setOpen(false); // Close the popup  
        //await refetch(); // Call the refetch function to update the data
        
    } catch (error) {
      console.error("Error creating short URL:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div 
    className="popup-overlay"
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}
  >
    <div 
      className="popup-container"
      style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        padding: '32px',
        width: '100%',
        maxWidth: '400px',
        margin: '16px',
        position: 'relative'
      }}
    >
      
      {/* Close Button */}
      {!loading && (
        <button
          type="button"
          disabled={loading}
          onClick={() => setOpen(false)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#9CA3AF',
            padding: '4px'
          }}
          onMouseOver={(e) => e.target.style.color = '#6B7280'}
          onMouseOut={(e) => e.target.style.color = '#9CA3AF'}
        >
          <RxCross2 size={20} />
        </button>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(createShortUrlHandler)}>
        
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1 style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            color: '#1F2937',
            margin: 0 
          }}>
            Create a New Short URL
          </h1>
        </div>

        {/* Input Field */}
        <div style={{ marginBottom: '24px' }}>
          <TextField
            marginleft="120px"
            label="Original URL                 "
            id="originalUrl"
            type="url"
            errors={errors}
            register={register}
            required={true}
            message="URL is required"
            placeholder="https://example.com"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button 
            type="submit" 
            disabled={loading}
            style={{
              width: '100%',
              backgroundColor: loading ? '#9CA3AF' : '#2563EB',
              color: 'white',
              padding: '12px 16px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '16px',
              fontWeight: '500',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => {
              if (!loading) e.target.style.backgroundColor = '#1D4ED8';
            }}
            onMouseOut={(e) => {
              if (!loading) e.target.style.backgroundColor = '#2563EB';
            }}
          >
            {loading ? "Creating..." : "Create Short URL"}
          </button>
        </div>
        
      </form>
    </div>
  </div>
);
};

export default CreateNewShortern;
