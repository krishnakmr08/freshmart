import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomHeader from '@components/ui/CustomHeader';
import { Colors } from '@utils/Constants';
import {
  getAllCategories,
  getProductsByCategoryId,
} from '@services/productService';
import ProductList from './ProductList';
import CustomText from '@components/ui/CustomText';
import withCart from '@features/cart/withCart';
import Sidebar from './Sidebar';

interface Category {
  _id: string;
  name: string;
  image?: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  image?: string;
}

const ProductCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const data = await getAllCategories();
        setCategories(data);
        if (data?.length) setSelectedCategory(data[0]);
      } catch (error) {
        console.log('Error Fetching Categories', error);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategory?._id) return;

    const fetchProducts = async () => {
      try {
        setProductsLoading(true);
        const data = await getProductsByCategoryId(selectedCategory._id);
        setProducts(data);
      } catch (error) {
        console.log('Error Fetching Products', error);
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleCategoryPress = (category: Category) => {
    if (category._id === selectedCategory?._id) return;
    setSelectedCategory(category);
  };

  return (
    <View style={styles.mainContainer}>
      <CustomHeader title={selectedCategory?.name || 'Categories'} search />

      <View style={styles.subContainer}>
        {categoriesLoading ? (
          <ActivityIndicator size="small" color={Colors.border} />
        ) : (
          <Sidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryPress={handleCategoryPress}
          />
        )}

        <View style={styles.productContainer}>
          {products.length === 0 && productsLoading ? (
            <ActivityIndicator size="large" color={Colors.border} />
          ) : products.length === 0 ? (
            <CustomText style={styles.emptyText}>No products found</CustomText>
          ) : (
            <>
              {productsLoading && (
                <ActivityIndicator size="small" color={Colors.border} />
              )}
              <ProductList data={products} />
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default withCart(ProductCategories);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  productContainer: {
    flex: 1,
  },
  emptyText: {
    marginTop: 40,
    textAlign: 'center',
    color: Colors.border,
  },
});
