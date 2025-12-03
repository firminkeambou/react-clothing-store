import React from 'react';
//import { useContext } from 'react';
//import { CategoriesContext } from '../../contexts/categories.context';
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../redux/store/categories/category.selector';
import CategoryPreview from '../../components/category-preview/category-preview.component';

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap); // getting the current state of categories from the store,
  //const { categoriesMap } = useContext(CategoriesContext);
  //console.log(products); // Logging the shop data to the console for debugging purposes
  return (
    <>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </>
  );
};

export default CategoriesPreview;
