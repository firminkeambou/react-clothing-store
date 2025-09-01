import React from 'react';
import { categories } from '../../db/categories.js'; // Importing categories data
import Directory from '../../components/directory/directory.component';
import { Outlet } from 'react-router-dom';

const Home = () => {
  // the Home component serves as the main entry point for the application
  // it imports and renders the Directory component which displays a list of category items
  // it also includes an Outlet component to render child routes to the Directory component
  return (
    <div className="App">
      <Directory categories={categories} />
      <Outlet />
    </div>
  );
};

export default Home;
