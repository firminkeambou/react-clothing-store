import React, { useState, useEffect } from 'react';
//import { useContext } from 'react';
import { useParams } from 'react-router-dom';
//import { CategoriesContext } from '../../contexts/categories.context';
import { useSelector } from 'react-redux';
import {
  selectCategoriesMap,
  selectIsCategoriesLoading,
} from '../../redux/store/categories/category.selector';
import ProductCard from '../../components/product-card/product-card.component';
import { CategoryContainer, CategoryTitle } from './category.styles';
import Spinner from '../../components/spinner/spinner.component';

// this is to enforce that category always as a value and can't be undefined as we know it
type categoryRouteParams = {
  category: string;
};
//
const Category = () => {
  //const { category } = useParams(); //before typeScript
  const { category } = useParams<
    keyof categoryRouteParams
  >() as categoryRouteParams; // the final cast allow us to be sure tha "Undefined type dissapear" and we remain with category as a string only

  //const { categoriesMap } = useContext(CategoriesContext);
  //console.log('render/re-rendering category component');
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectIsCategoriesLoading);

  const [products, setProducts] = useState(categoriesMap[category]);
  //const products = categoriesMap[category]; this can be used, but it will be re-executed whenever the component is re-rendered, to avoid that, we can use useMemo hook or useEffect and useState

  useEffect(() => {
    //console.log('useEffect fired calling setProducts in category component');
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  //console.log(products);
  return (
    <>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </CategoryContainer>
      )}
      ;
    </>
  );
};
export default Category;
