import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';
import { ProductItem } from '../../types/common';
import { AtcButton } from './AtcButton';
import { useNavigation } from '@react-navigation/native';
import { ScreenName } from '../../constants/navigationConstants';
import { NavProps } from '../navigation/types';
import PressableButton from '../PressableButton';
import { Colors } from '../../utils/colorUtils';

type ProductCardProps = {
  product: ProductItem;
  containerStyle?: ViewStyle;
};

const Tag = ({ label }: { label: string }) => (
  <View style={styles.tag}>
    <Text style={styles.tagText}>{label}</Text>
  </View>
);

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  containerStyle,
}) => {
  const navigation = useNavigation<NavProps>();

  const handlePress = () => {
    navigation.navigate(ScreenName.PRODUCT_DETAIL, { product });
  };

  return (
    <PressableButton
      style={[styles.card, containerStyle]}
      scaleValue={0.98}
      onPress={handlePress}
    >
      <View style={styles.thumbnail}>
        <Image
          source={{ uri: product.productImage?.url }}
          style={styles.thumbnail}
        />
        <View style={styles.atcButtonContainer}>
          <AtcButton product={product} disabled={false} />
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
          {product.name}
        </Text>
        <Text style={styles.price}>{product.price}</Text>
        <View style={styles.tagsContainer}>
          {product.tags?.map((tag, idx) => (
            <Tag key={idx} label={tag} />
          ))}
        </View>
      </View>
    </PressableButton>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
    padding: 8,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 4,
    backgroundColor: Colors.GRAY_200,
    position: 'relative',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.TEXT_SLATE_DARK,
    marginVertical: 6,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.SUCCESS_GREEN,
    marginBottom: 7,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    backgroundColor: Colors.SLATE_100,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: Colors.TEXT_SLATE_MEDIUM,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  atcButtonContainer: {
    position: 'absolute',
    bottom: 6,
    right: 6,
  },
});

export default ProductCard;
