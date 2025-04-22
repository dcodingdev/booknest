import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/user/login" />;
};

export default ProtectedRoute;

// ```

// ### Explanation:
// - **Token Check**: The component checks if a token is present in the local storage.
// - **Conditional Rendering**: 
//   - If the token is present, it renders the child routes using the `Outlet` component.
//   - If the token is not present, it redirects the user to the login page using the `Navigate` component.

// This ensures that only authenticated users can access the protected routes defined in the `App.jsx` file.import React from "react";
// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoute = () => {
//   const token = localStorage.getItem("token");

//   return token ? <Outlet /> : <Navigate to="/user/login" />;
// };

// export default ProtectedRoute```

// ### Explanation:
// - **Token Check**: The component checks if a token is present in the local storage.
// - **Conditional Rendering**: 
//   - If the token is present, it renders the child routes using the `Outlet` component.
//   - If the token is not present, it redirects the user to the login page using the `Navigate` component.

// This ensures that only authenticated users can access the protected routes defined in the `App.jsx` file.