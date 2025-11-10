export enum WidgetType {
  BANNER_CAROUSEL = 'BANNER_CAROUSEL',
  HORIZONTAL_LIST = 'HORIZONTAL_LIST',
  CART_ITEM = 'CART_ITEM',
  TEXT = 'TEXT',
}

export type ImageResponseType = {
  url: string;
  width?: number;
  height?: number;
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center';
};

export enum ActionType {
  OPEN_DEEPLINK = 'OPEN_DEEPLINK',
}

export type Action = {
  type: ActionType;
  data?: {
    deeplink?: string;
  };
};

export type ProductItem = {
  id: string;
  productImage: ImageResponseType;
  name: string;
  price: string;
  tags?: string[];
};
