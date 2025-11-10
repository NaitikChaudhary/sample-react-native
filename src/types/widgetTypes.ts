import { Action, ImageResponseType, ProductItem, WidgetType } from './common';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
export type TextProps = {
  text: string;
  style?: TextStyle;
};
export type BaseWidgetHeader = {
  title?: TextProps;
  description?: TextProps;
  image?: ImageResponseType;
  viewMeta?: BaseWidgetViewMeta;
};
export type BaseWidgetViewMeta = {
  styles: StyleProp<ViewStyle>;
  backgroundImage?: ImageResponseType;
};

export type BaseWidgetType = {
  widgetId: string;
  widgetType: WidgetType;
  widgetName: string;
};

export type WidgetResponse = WidgetProps & BaseWidgetType;
export type WidgetProps<T extends WidgetItem = WidgetItem> = {
  data: { items?: Array<T> };
  viewMeta?: BaseWidgetViewMeta;
  header?: BaseWidgetHeader;
};

export type WidgetItem = BannerCarouselWidgetItem | {};

export type BannerCarouselWidgetItem = {
  image: ImageResponseType;
  action?: Action;
};

export type HorizontalListWidgetItem = ProductItem;
export type CartItemWidgetItem = ProductItem;
export type TextWidgetItem = TextProps;
