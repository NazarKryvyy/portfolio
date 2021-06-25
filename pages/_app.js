import React from "react";
import "../styles/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import AppNavBar from "components/shared/NavBar";
import Hero from "../components/shared/Hero";

const MyApp = ({ Component, pageProps }) => {
  const isHomePage = () => Component.name === "Home";
  return (
    <div className="portfolio-app">
      <AppNavBar />
      {isHomePage() && <Hero />}
      <div className="container">
        <Component {...pageProps} />
      </div>
      {/* FOOTER STARTS */}
      {isHomePage() && (
        <footer id="sticky-footer" className="py-4 bg-black text-white-50 py-3">
          <div className="container text-center">
            <small>Copyright &copy; Your Website</small>
          </div>
        </footer>
      )}
      {/* FOOTER ENDS */}
    </div>
  );
};

export default MyApp;
