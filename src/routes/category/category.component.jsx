import React, { useState, useEffect } from 'react';
//import { useContext } from 'react';
import { useParams } from 'react-router-dom';
//import { CategoriesContext } from '../../contexts/categories.context';
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../redux/store/categories/category.selector';
import ProductCard from '../../components/product-card/product-card.component';
import { CategoryContainer, CategoryTitle } from './category.styles.jsx';
const Category = () => {
  const { category } = useParams();
  //const { categoriesMap } = useContext(CategoriesContext);
  console.log('render/re-rendering category component');
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);
  //const products = categoriesMap[category]; this can be used, but it will be re-executed whenever the component is re-rendered, to avoid that, we can use useMemo hook or useEffect and useState

  useEffect(() => {
    console.log('useEffect fired calling setProducts in category component');
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  //console.log(products);
  return (
    <>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </>
  );
};

export default Category;
