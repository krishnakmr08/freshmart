import { FlatList, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { Colors } from '@utils/Constants';
import ProductItem from './ProductItem';

interface Product {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  image?: string;
}

const ProductList: FC<{ data: Product[] }> = ({ data }) => {
  const renderItem = ({
    item,
    index,
  }: {
    item: Product;
    index: number;
  }) => <ProductItem item={item} index={index} />;

  return (
    <FlatList
      data={data}
      keyExtractor={item => item._id}
      renderItem={renderItem}
      numColumns={2}
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  content: {
    paddingVertical: 10,
    paddingBottom: 100,
  },
});
