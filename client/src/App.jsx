import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';

const App = () => (
  <>
  <Router>
    <div className="flex flex-col min-h-screen overflow-x-hidden no-scrollbar">
      <Navbar />
      <main className="flex-grow overflow-x-hidden no-scrollbar">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  </Router>
  <ToastContainer position="top-right" autoClose={3000} />
  </>
);

export default App;
