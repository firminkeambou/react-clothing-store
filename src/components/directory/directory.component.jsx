import React from 'react'
import './directory.styles.scss'
import CategoryItem from '../category-item/category-item.component.jsx';

const Directory = ({categories}) => {
    // The Directory component maps over the categories array and renders a CategoryItem for each category
  return (
    <div className='directory-container'>
      {
        categories.map( category => (
          <CategoryItem key={category.id} category={category} />
        ))
      }
    </div>
  )
}

export default Directory