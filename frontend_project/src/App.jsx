import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";

import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import MyProfile from "./pages/MyProfile";
import Footer from "./components/Footer";
import Doctors from "./pages/Doctors";

function App() {
  return <div className="mx-4 sm:mx-[10%]">
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:speciality" element={<Doctors />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/my-appointments" element={<MyAppointments />} />
      <Route path="/appointment/:docId" element={<Appointment />} />
      <Route path="/my-profile" element={<MyProfile />} />

    </Routes>
    <Footer />

  </div>;
}

export default App;
