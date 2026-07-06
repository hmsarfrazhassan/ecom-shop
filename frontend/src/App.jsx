import "./App.css";
import { Route, Routes } from "react-router-dom";
import ResetPassword from "./routes/ResetPassword";
import Home from "./routes/Home";

function App() {
  return (
    <>
      <div className="bg-green-500 text-white py-5">
        this is general text for testing{" "}
      </div>
      <div>this is general text for testing </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
