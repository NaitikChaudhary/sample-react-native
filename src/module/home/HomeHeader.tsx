import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  LayoutChangeEvent,
  Pressable,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  SharedValue,
} from 'react-native-reanimated';
import { WrapperView } from '../../components/WrapperView';
import { BaseWidgetHeader } from '../../types/widgetTypes';
import { Colors } from '../../utils/colorUtils';
import { useNavigation } from '@react-navigation/native';
import { NavProps } from '../../components/navigation/types';
import { ScreenName } from '../../constants/navigationConstants';

const PROFILE_PLACEHOLDER =
  'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png';

const HEADER_ROW_HEIGHT = 66;
const SCROLL_THRESHOLD = HEADER_ROW_HEIGHT;

interface HomeHeaderProps {
  scrollY: SharedValue<number>;
  header?: BaseWidgetHeader;
  onLayout?: (event: LayoutChangeEvent) => void;
}

const HomeHeader = ({ scrollY, header }: HomeHeaderProps) => {
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, SCROLL_THRESHOLD],
      [HEADER_ROW_HEIGHT, 0],
      Extrapolate.CLAMP,
    );

    return {
      height,
      overflow: 'hidden',
    };
  });
  const navigation = useNavigation<NavProps>();

  const navigateToSearchScreen = () => {
    navigation.navigate(ScreenName.SEARCH);
  };

  return (
    <WrapperView viewMeta={header?.viewMeta ?? { styles: styles.container }}>
      <View style={styles.wrapper}>
        <Animated.View style={[styles.headerRow, headerAnimatedStyle]}>
          <Image
            source={{ uri: PROFILE_PLACEHOLDER }}
            style={styles.profileIcon}
          />
          <View style={styles.headerTextContainer}>
            <Text style={[styles.heading, header?.title?.style]}>
              {header?.title?.text ?? '15 minutes'}
            </Text>
            <Text style={[styles.subheading, header?.description?.style]}>
              {header?.description?.text ?? 'Deliver to - Dubai'}
            </Text>
          </View>
        </Animated.View>
        <Pressable onPress={navigateToSearchScreen} style={styles.searchBar}>
          <Text style={styles.placeholderText}>What are you looking for?</Text>
        </Pressable>
      </View>
    </WrapperView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    backgroundColor: Colors.BRAND_YELLOW,
  },
  wrapper: {
    paddingBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
    backgroundColor: Colors.WHITE,
  },
  headerTextContainer: {
    flex: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.TEXT_PRIMARY,
  },
  subheading: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.TEXT_SECONDARY,
    marginTop: 3,
  },
  searchBar: {
    height: 50,
    borderRadius: 8,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  placeholderText: {
    color: Colors.TEXT_TERTIARY,
    fontSize: 18,
  },
});

export default HomeHeader;
