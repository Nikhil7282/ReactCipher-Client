import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddPassword from "./Pages/AddPassword";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import Navbar from "./components/Navbar";
import axios from "axios";

export const client = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});
const linksArray = [
  { label: "Passwords", goto: "/addPassword" },
  { label: "Logout", goto: "/login" },
];
function App() {
  return (
    <div className="App">
      <Navbar links={linksArray} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/addPassword" element={<AddPassword />} />
      </Routes>
    </div>
  );
}

export default App;
