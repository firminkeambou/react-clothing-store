import React from 'react'
import { categories } from './db/categories.js'; // Importing categories data
import Directory from './components/directory/directory.component';

const App = () => {
// the App component serves as the main entry point for the application
// it imports and renders the Directory component which displays a list of category items
return (
    <div className='App'>
      <Directory categories={categories} />
    </div>
  );
};

export default App;


