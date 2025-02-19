import React from "react";
import "./AboutUsPage.css";
import MainHeader from '../components/MainHeader';
import MainFooter from '../components/MainFooter';


export default function AboutUsPage() {
  return (
    <>
      <MainHeader/>
      <div className="container-fluid about-section">
      {/* Header Section */}
      <header className="bg-dark text-white text-center p-5">
        <div className="mt-5">
          <h2 className="display-4">About Us</h2>
          <p className="lead">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum eveniet illo reprehenderit asperiores alias cupiditate nesciunt esse maxime! Asperiores, officiis autem earum nemo blanditiis provident? Voluptate deserunt nisi iure sed assumenda hic perferendis asperiores quis velit. Sequi accusantium laborum quam mollitia commodi impedit voluptas fugiat, ad voluptatibus deleniti. Iure odit, quaerat eveniet nulla laudantium vero porro blanditiis minus obcaecati vel.</p>
          <button className="btn btn-primary mt-3">Register</button>
        </div>
      </header>

      {/* Advantages Section */}
      <section className="bg-light py-5">
        <h2 className="text-center mb-4">Advantages</h2>
        <div className="row text-center">
          <div className="col-md-3">
            <div className="card p-3">
                <img src="/images/cyclone/1.jpg" alt="" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="card p-3">
            <img src="/images/cyclone/1.jpg" alt="" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="card p-3">
            <img src="/images/cyclone/1.jpg" alt="" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="card p-3">
            <img src="/images/cyclone/1.jpg" alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-5">
        <h2 className="text-center mb-4">Value Proposition</h2>
        <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
        <div className="row mt-4">
          <div className="col-md-6">
            <h3>Item One</h3>
            <p>Description</p>
            <h3 className="mt-3">Item Two</h3>
            <p>Description</p>
          </div>
          <div className="col-md-6">
            <div className="card p-3">Image</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-dark text-white py-5">
        <h2 className="text-center mb-4">Features</h2>
        <p className="text-center">There are many variations of passages of Lorem Ipsum...</p>
        <div className="row mt-4">
          <div className="col-md-4">
            <div className="card bg-secondary text-white p-3">Item One</div>
          </div>
          <div className="col-md-4">
            <div className="card bg-secondary text-white p-3">Item Two</div>
          </div>
          <div className="col-md-4">
            <div className="card bg-secondary text-white p-3">Item Three</div>
          </div>
          <div className="col-md-4">
            <div className="card bg-secondary text-white p-3">Item Four</div>
          </div>
          <div className="col-md-4">
            <div className="card bg-secondary text-white p-3">Item Five</div>
          </div>
          <div className="col-md-4">
            <div className="card bg-secondary text-white p-3">Item Six</div>
          </div>
        </div>
      </section>
    </div>
      <MainFooter/>

      </>
  );
}
