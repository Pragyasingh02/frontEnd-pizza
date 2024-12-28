import React from 'react';
import './About.css'; 

const About = () => {
  return (
    <div className="h-screen pt-28 mx-auto p-6 text-center about-container">
      <h1 className="text-4xl font-bold mb-6 text-white">About Pizza Paradise</h1>
      <p className="text-lg mb-4 text-white">
        Welcome to Pizza Paradise, where we believe that pizza is more than just food—it's a way of life. 
        Our mission is to provide the highest quality pizza using the freshest ingredients, and to deliver 
        an exceptional experience with every bite. From classic Margherita to adventurous new flavors, 
        we have something for everyone.
      </p>
      <p className="text-lg mb-4 text-white">
        Established in 2024, Pizza Paradise started with a passion for crafting the perfect pizza. Our team 
        of dedicated chefs and friendly staff are committed to making every visit memorable. We use only 
        the finest local ingredients and traditional techniques to create pizzas that are both delicious 
        and satisfying.
      </p>
      <p className="text-lg text-white">
        Whether you're here for a quick lunch, a family dinner, or a late-night snack, Pizza Paradise is 
        the place to be. We invite you to join us and experience the taste of paradise!
      </p>
    </div>
  );
};

export default About;
