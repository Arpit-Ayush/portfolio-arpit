import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import WriteRecommendation from "./components/WriteRecommendation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectPage from "./components/ProjectPage";
import HomePage from "./components/HomePage";
import NotFound from "./components/NotFound";
import CertificatePage from "./components/CertificatePage";
import AddProject from "./components/AddProject";
import AddCertificate from "./components/AddCertificate";
import { Provider } from "./context";
import AllProjects from "./components/AllProjects";
import AllCertificates from "./components/AllCertificates";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/write-a-recommendation" element={<WriteRecommendation />} />
          <Route path="/allprojects" element={<AllProjects />} />
          <Route path="/allcertificates" element={<AllCertificates />} />
          <Route path="/project/add" element={<AddProject />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/certificate/add" element={<AddCertificate />} />
          <Route path="/certificate/:id" element={<CertificatePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
