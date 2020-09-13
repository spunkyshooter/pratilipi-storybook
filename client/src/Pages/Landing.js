import React from "react";
import LandingImg from "assets/landing-img.webp";
import LandingSmImg from "assets/about-3.webp";
import NavBar from "Components/Navbar";
import Typewriter from "typewriter-effect";

const Landing = () => {
  return (
    <main className="h-screen relative">
      <NavBar />
      <div className="landing-text font-semibold text-center">
        <Typewriter
          options={{
            delay: 40,
            deleteSpeed: 40,
          }}
          onInit={(typewriter) => {
            typewriter
              .typeString("Pratilipi is India's largest digital")
              .pasteString("<br />")
              .typeString("platform connecting readers and")
              .pasteString("<br />")
              .typeString("writers in ")
              .typeString('<span style="color:#cb3837;">Hindi</span>')
              .deleteChars(5)
              .typeString('<span style="color:#00C642;">Kannada</span>')
              .deleteChars(7)
              .typeString('<span style="color:#357edd;">Telugu</span>')
              .deleteChars(6)
              .typeString("12 Indian languages")
              .start();
          }}
        />
      </div>

      <img src={LandingSmImg} alt="landing image 1" className="md:hidden landing-img-1" />
      <img src={LandingImg} alt="landing image" className="absolute bottom-0" />
    </main>
  );
};

export default Landing;
