// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import { Home } from "./pages/Home";
// import { CreateBook } from "./pages/CreateBook";
// import { ShowBook } from "./pages/ShowBook";
// import { EditBook } from "./pages/EditBook";
// import { DeleteBook } from "./pages/DeleteBook";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <Routes>
//       {/* Public Routes */}
//       <Route path="/user/register" element={<Register />} />
//       <Route path="/user/login" element={<Login />} />

//       {/* Protected Routes */}
//       <Route element={<ProtectedRoute />}>
//         <Route path="/" element={<Home />} />
//         <Route path="/books/create" element={<CreateBook />} />
//         <Route path="/books/details/:id" element={<ShowBook />} />
//         <Route path="/books/edit/:id" element={<EditBook />} />
//         <Route path="/books/delete/:id" element={<DeleteBook />} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Home } from "./pages/Home";
// import { CreateBook } from "./pages/CreateBook";
// import { ShowBook } from "./pages/ShowBook";
// import { EditBook } from "./pages/EditBook";
// import { DeleteBook } from "./pages/DeleteBook";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import Logout from "./components/Logout";
// import Profile from "./pages/Profile";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Navbar from "./components/Navbar";

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/user/register" element={<Register />} />
//         <Route path="/user/login" element={<Login />} />

//         {/* Protected Routes */}
//         <Route element={<ProtectedRoute />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/books/create" element={<CreateBook />} />
//           <Route path="/books/details/:id" element={<ShowBook />} />
//           <Route path="/books/edit/:id" element={<EditBook />} />
//           <Route path="/books/delete/:id" element={<DeleteBook />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/logout" element={<Logout />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { CreateBook } from "./pages/CreateBook";
import { ShowBook } from "./pages/ShowBook";
import { EditBook } from "./pages/EditBook";
import { DeleteBook } from "./pages/DeleteBook";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./components/Logout";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/books/create" element={<CreateBook />} />
          <Route path="/books/details/:id" element={<ShowBook />} />
          <Route path="/books/edit/:id" element={<EditBook />} />
          <Route path="/books/delete/:id" element={<DeleteBook />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;




