import React from 'react'
import './category-item.styles.scss'
// This component displays a single category item with an image and title
const CategoryItem = ({category} ) => {
  const { title, imageUrl } = category;
  return (
    <div className='category-container'>
      <div
        className='background-image'
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />
      <div className='category-body-container'>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  )
}

export default CategoryItem