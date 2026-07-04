import "./App.css";
import { Route, Routes } from "react-router-dom";
import ResetPassword from "./routes/ResetPassword";
import Home from "./routes/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
