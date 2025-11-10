import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { ImageResponseType } from '../types/common';
import { Colors } from '../utils/colorUtils';

type Props = {
  image: ImageResponseType;
  fallbackWidth?: number;
  fallbackHeight?: number;
  style?: any;
};

const NImage = ({
  image,
  style,
  fallbackHeight = 20,
  fallbackWidth = 20,
}: Props) => {
  const width = image.width ?? fallbackWidth;
  const height = image.height ?? fallbackHeight;
  return image.url ? (
    <Image
      source={{ uri: image.url }}
      style={[styles.imageStyle, { width, height }, style]}
    />
  ) : (
    <View style={[styles.fallback, { width, height }, style]} />
  );
};

const styles = StyleSheet.create({
  fallback: {
    backgroundColor: Colors.GRAY_300,
    borderRadius: 8,
  },
  imageStyle: { resizeMode: 'contain' },
});

export default NImage;
