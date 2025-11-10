import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import ShimmerView from './shimmerView';
import { Colors } from '../utils/colorUtils';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 40) / 3;

const SearchBarPlaceholder = () => (
  <View style={styles.searchBarContainer}>
    <ShimmerView width={SCREEN_WIDTH - 32} height={40} borderRadius={10} />
  </View>
);

const BannerPlaceholder = () => (
  <View style={styles.bannerContainer}>
    <ShimmerView
      width={SCREEN_WIDTH}
      height={100}
      borderRadius={8}
      style={styles.bannerShimmer}
    />
  </View>
);

const FeaturedTitleDescriptionPlaceholder = () => (
  <View style={styles.featuredTitleContainer}>
    <ShimmerView
      width={140}
      height={16}
      borderRadius={8}
      style={styles.titleShimmer}
    />
    <ShimmerView width={220} height={10} borderRadius={6} />
  </View>
);

const CardPlaceholder = ({ width }: { width: number }) => (
  <View style={[styles.cardContainer, { width }]}>
    <ShimmerView width={width} height={width} borderRadius={10} />
    <ShimmerView
      width={width * 0.6}
      height={12}
      borderRadius={6}
      style={styles.cardTitleShimmer}
    />
    <ShimmerView
      width={width * 0.4}
      height={10}
      borderRadius={6}
      style={styles.cardSubtitleLine1}
    />
    <ShimmerView
      width={width * 0.5}
      height={10}
      borderRadius={6}
      style={styles.cardSubtitleLine2}
    />
    <View style={styles.cardPriceButtonRow}>
      <ShimmerView width={40} height={14} borderRadius={6} />
      <ShimmerView
        width={40}
        height={22}
        borderRadius={14}
        style={styles.cardButtonShimmer}
      />
    </View>
  </View>
);

const HorizontalCardCarouselPlaceholder = () => (
  <View style={styles.cardCarouselRow}>
    {[0, 1, 2].map(idx => (
      <CardPlaceholder width={CARD_WIDTH} key={idx} />
    ))}
  </View>
);

const SectionTitlePlaceholder = () => (
  <View style={styles.sectionTitleContainer}>
    <ShimmerView width={110} height={14} borderRadius={8} />
  </View>
);

export const PagLoadingScreen = () => (
  <View style={styles.root}>
    <SearchBarPlaceholder />
    <BannerPlaceholder />
    <FeaturedTitleDescriptionPlaceholder />
    <HorizontalCardCarouselPlaceholder />
    <SectionTitlePlaceholder />
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  searchBarContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  bannerContainer: {
    marginTop: 12,
  },
  bannerShimmer: {
    alignSelf: 'center',
  },
  featuredTitleContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  titleShimmer: {
    marginBottom: 8,
  },
  cardCarouselRow: {
    flexDirection: 'row',
    marginTop: 16,
    paddingHorizontal: 8,
  },
  cardContainer: {
    marginHorizontal: 4,
  },
  cardTitleShimmer: {
    marginTop: 8,
  },
  cardSubtitleLine1: {
    marginTop: 4,
  },
  cardSubtitleLine2: {
    marginTop: 2,
  },
  cardPriceButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  cardButtonShimmer: {
    marginLeft: 6,
  },
  sectionTitleContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
});

export default PagLoadingScreen;
