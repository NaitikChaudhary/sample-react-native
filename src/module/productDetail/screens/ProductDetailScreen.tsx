import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { AtcButton } from '../../../components/productCard/AtcButton';
import { ScreenName } from '../../../constants/navigationConstants';
import PageWrapper from '../../../components/pageWrapper';
import { Route } from '../../../components/navigation/types';
import { Colors } from '../../../utils/colorUtils';
import NavigationHeader from '../../../components/NavigationHeader';

const Tag = ({ label }: { label: string }) => (
  <View style={styles.tag}>
    <Text style={styles.tagText}>{label}</Text>
  </View>
);

const ProductDetailScreen: React.FC = () => {
  const route = useRoute<Route<ScreenName.PRODUCT_DETAIL>>();
  const { product } = route.params;

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Failed to load product detail.</Text>
      </View>
    );
  }

  const screenWidth = Dimensions.get('window').width;

  return (
    <PageWrapper>
      <NavigationHeader title="" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={{ uri: product.productImage?.url }}
          style={[styles.image, { width: screenWidth, height: screenWidth }]}
          resizeMode="cover"
        />
        <View style={styles.detailContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{product.price}</Text>
          <View style={styles.tagsContainer}>
            {product.tags?.map((tag, idx) => (
              <Tag key={idx} label={tag} />
            ))}
          </View>
          <AtcButton product={product} />
        </View>
      </ScrollView>
    </PageWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: Colors.WHITE,
    alignItems: 'stretch',
    paddingBottom: 32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: Colors.WHITE,
  },
  image: {
    backgroundColor: Colors.GRAY_150,
    alignSelf: 'center',
  },
  detailContainer: {
    padding: 18,
    gap: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.TEXT_SLATE_DARK,
    marginTop: 8,
  },
  price: {
    fontSize: 19,
    fontWeight: 'bold',
    color: Colors.SUCCESS_GREEN,
    marginBottom: 5,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 3,
    gap: 7,
  },
  tag: {
    backgroundColor: Colors.SLATE_100,
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  tagText: {
    color: Colors.TEXT_SLATE_MEDIUM,
    fontSize: 12,
    fontWeight: '500',
  },
  description: {
    color: Colors.TEXT_GRAY,
    fontSize: 15,
    marginTop: 14,
    lineHeight: 21,
  },
  errorText: {
    color: Colors.ERROR_RED,
    textAlign: 'center',
  },
});

export default ProductDetailScreen;
