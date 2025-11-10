import React, { useCallback } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useCartStore } from '../../store/cartStore';
import { ProductItem } from '../../types/common';
import PressableButton from '../PressableButton';
import { Colors } from '../../utils/colorUtils';

interface AtcButtonProps {
  product: ProductItem;
  onAddToCart?: () => void;
  onRemoveFromCart?: () => void;
  disabled?: boolean;
}

const PlusIcon = React.memo(() => (
  <Svg width="16" height="16" viewBox="0 0 20 20" fill="none">
    <Path
      d="M10 4V16M4 10H16"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
));

const MinusIcon = React.memo(() => (
  <Svg width="16" height="16" viewBox="0 0 20 20" fill="none">
    <Path
      d="M4 10H16"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
));

export const AtcButton: React.FC<AtcButtonProps> = ({
  product,
  onAddToCart,
  onRemoveFromCart,
  disabled = false,
}) => {
  const quantity = useCartStore(state => state.cart[product.id]?.quantity ?? 0);
  const addQuantity = useCartStore(state => state.addQuantity);
  const removeQuantity = useCartStore(state => state.removeQuantity);

  const handleAdd = useCallback(() => {
    if (disabled) return;
    addQuantity(product);
    onAddToCart?.();
  }, [disabled, addQuantity, product, onAddToCart]);

  const handleRemove = useCallback(() => {
    if (disabled) return;
    removeQuantity(product.id);
    onRemoveFromCart?.();
  }, [disabled, removeQuantity, product, onRemoveFromCart]);

  if (quantity === 0) {
    return (
      <PressableButton
        style={[styles.button, disabled && styles.buttonDisabled]}
        onPress={handleAdd}
        disabled={disabled}
      >
        <Text style={styles.buttonText}>ADD</Text>
      </PressableButton>
    );
  }

  return (
    <View style={[styles.quantityContainer, disabled && styles.buttonDisabled]}>
      <PressableButton
        style={styles.iconButton}
        onPress={handleRemove}
        disabled={disabled}
        scaleValue={0.8}
      >
        <MinusIcon />
      </PressableButton>
      <Text style={styles.quantityText}>{quantity}</Text>
      <PressableButton
        style={styles.iconButton}
        onPress={handleAdd}
        disabled={disabled}
        scaleValue={0.8}
      >
        <PlusIcon />
      </PressableButton>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY_RED,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
    minWidth: 56,
  },
  buttonDisabled: {
    backgroundColor: Colors.DISABLED_GRAY,
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 12,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY_RED,
    borderRadius: 8,
    overflow: 'hidden',
    gap: 4,
    minWidth: 52,
    paddingHorizontal: 2,
    paddingVertical: 2,
    height: 32,
  },
  iconButton: {
    padding: 2,
  },
  quantityText: {
    color: Colors.WHITE,
    fontSize: 12,
    minWidth: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
