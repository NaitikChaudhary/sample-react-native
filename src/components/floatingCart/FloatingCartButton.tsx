import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useCartStore } from '../../store/cartStore';
import PressableButton from '../PressableButton';
import { ScreenName } from '../../constants/navigationConstants';
import { NavProps } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../utils/colorUtils';
const BUTTON_HEIGHT = 75;
const HIDDEN_POSITION = BUTTON_HEIGHT + 50;
const VISIBLE_POSITION = -BUTTON_HEIGHT + 40;
const duration = 200;

const HIDE_ON_ROUTES = [ScreenName.CART];

interface FloatingCartButtonProps {
  currentRouteName: ScreenName;
}

const FloatingCartButton: React.FC<FloatingCartButtonProps> = ({
  currentRouteName,
}) => {
  const cart = useCartStore(state => state.cart);
  const translateY = useSharedValue(HIDDEN_POSITION);
  const opacity = useSharedValue(0);

  const cartItems = useMemo(() => Object.values(cart), [cart]);
  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const [visible, setVisible] = useState(totalItems > 0);
  const timeoutRef = useRef<number | null>(null);

  const [displayItems, setDisplayItems] = useState(cartItems);
  const [displayTotal, setDisplayTotal] = useState(totalItems);
  const navigation = useNavigation<NavProps>();

  useEffect(() => {
    const shouldHide = HIDE_ON_ROUTES.includes(currentRouteName);
    if (totalItems > 0 && !shouldHide) {
      if (!visible) {
        setVisible(true);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setDisplayItems(cartItems);
      setDisplayTotal(totalItems);
      translateY.value = withTiming(VISIBLE_POSITION, { duration });
      opacity.value = withTiming(1, { duration });
    } else {
      translateY.value = withTiming(HIDDEN_POSITION, { duration });
      opacity.value = withTiming(0, { duration });

      if (visible) {
        timeoutRef.current = setTimeout(() => {
          setVisible(false);
        }, duration);
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [totalItems, cartItems, translateY, opacity, visible, currentRouteName]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const handlePress = () => {
    navigation.navigate(ScreenName.CART);
  };

  if (!visible) {
    return null;
  }

  const displayProducts = displayItems.slice(-4);

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <PressableButton style={styles.button} onPress={handlePress}>
        <View style={styles.imagesContainer}>
          <View style={styles.imagesWrapper}>
            {displayProducts.map((item, index) => (
              <View
                key={`${item.product.id}-${index}`}
                style={[
                  styles.imageContainer,
                  index > 0 && styles.overlappingImage,
                  { zIndex: index + 1 },
                ]}
              >
                <Image
                  source={{ uri: item.product.productImage.url }}
                  style={styles.productImage}
                  resizeMode="contain"
                />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.viewCartText}>View cart</Text>
          <Text style={styles.itemCountText}>
            {displayTotal} {displayTotal === 1 ? 'Item' : 'Items'}
          </Text>
        </View>
      </PressableButton>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    alignSelf: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY_RED,
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 12,
    height: BUTTON_HEIGHT,
    gap: 16,
  },
  imagesContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  imagesWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.BORDER_LIGHT,
  },
  overlappingImage: {
    marginLeft: -15,
  },
  productImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  textContainer: {
    paddingRight: 10,
    alignItems: 'flex-end',
  },
  viewCartText: {
    color: Colors.WHITE,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  itemCountText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: '500',
    marginTop: 2,
  },
});

export default React.memo(FloatingCartButton);
