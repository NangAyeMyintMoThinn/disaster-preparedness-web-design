import React from "react";
import "./AboutUsPage.css";
import MainHeader from '../components/MainHeader';
import MainFooter from '../components/MainFooter';


export default function AboutUsPage() {
  return (
    <>
      <MainHeader/>
      <div className="container py-5 about-section">
        <h1 className="text-center mb-4">About Us</h1>
        <p className="lead text-center">At Disaster Preparedness Myanmar (CU-MDY), we are committed to building a safer, more resilient future for the people of Myanmar.</p>

        <div className="text-center mb-4">
          <img src="/images/disaster-preparedness-banner.jpg" alt="Disaster Preparedness" className="banner-image" />
        </div>

        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body">
            <h2 className="h4">Who We Are</h2>
            <p>Disaster Preparedness Myanmar is a collaborative initiative designed to create a comprehensive disaster preparedness platform tailored to the unique challenges Myanmar faces.</p>
            <div className="text-center mb-4">
            <img src="/images/team-collaboration.jpg" alt="Team Collaboration" className="content-image" />
            </div>
          </div>
        </div>

        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body">
            <h2 className="h4">Our Vision</h2>
            <p>To significantly reduce the loss of life and property by providing accessible, timely, and practical disaster preparedness solutions for individuals and communities across Myanmar.</p>
            <div className="text-center mb-4">
            <img src="/images/vision.jfif" alt="Our Vision" className="content-image" />
            </div>
          </div>
        </div>

        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body">
            <h2 className="h4">Our Mission</h2>
            <ul>
              <li>Develop an innovative, user-friendly web and mobile application that delivers critical disaster-related information.</li>
              <li>Provide real-time weather updates, evacuation plans, first aid instructions, and emergency contact databases.</li>
              <li>Facilitate real-time communication and information sharing among community members during emergencies.</li>
              <li>Promote education and awareness through interactive learning modules and comprehensive preparedness guidelines.</li>
              <li>Support disaster-affected communities with funding and donation channels.</li>
            </ul>
            <div className="text-center mb-4">
            <img src="/images/emergency-response.png" alt="Emergency Response" className="content-image" />
            </div>
          </div>
        </div>

        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body">
            <h2 className="h4">Join Us</h2>
            <p>Whether you're a developer, a volunteer, or someone passionate about disaster preparedness, there are many ways to get involved. Together, we can build stronger, safer communities prepared for whatever challenges may come.</p>
            <p>For more information or to support our mission, feel free to reach out to us through our <a href="/contact" className="text-decoration-none">Contact Us</a> page. Let’s work together to make a difference!</p>
            <div className="text-center mb-4">
            <img src="/images/community-support.jfif" alt="Community Support" className="content-image" />
            </div>
          </div>
        </div>
      </div>
      <MainFooter/>

      </>
  );
}
