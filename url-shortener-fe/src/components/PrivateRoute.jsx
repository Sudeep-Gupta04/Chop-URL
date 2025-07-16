import { Navigate } from "react-router-dom";
import { useStoreContext } from "../contextApi/ContextApi";
import React from "react";

export default function PrivateRoute({ children, publicPage}) {
    const { token } = useStoreContext();

    if (publicPage) {
        return token ? <Navigate to="/dashbord" /> : children;
    }

    return !token ? <Navigate to="/login" /> : children;
}