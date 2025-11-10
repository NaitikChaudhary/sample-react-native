import ErrorBoundary from 'react-native-error-boundary';
import { onLoadError } from '../../utils/commonUtils';
import {
  BannerCarouselWidgetItem,
  BaseWidgetType,
  CartItemWidgetItem,
  HorizontalListWidgetItem,
  TextWidgetItem,
  WidgetProps,
} from '../../types/widgetTypes';
import { useWidgetStore } from '../../store/widgetStore';
import BannerCarouselWidget from '../widgets/BannerCarouselWidget';
import { WidgetType } from '../../types/common';
import { getWidgetKey } from './utils';
import { WrapperView } from '../WrapperView';
import HorizontalListWidget from '../widgets/HorizontaliListWidget/HorizontalListWidget';
import WidgetHeader from './WidgetHeader';
import CartItemWidget from '../widgets/CartItemWidget/CartItemWidget';
import TextWidget from '../widgets/TextWidget/TextWidget';

const FallbackComponent = () => {
  return <></>;
};

type Props = {
  widget?: BaseWidgetType;
  pageKey: string;
};

const WidgetWrapper = ({ widget, pageKey }: Props) => {
  const getPageWidgets = useWidgetStore(state => state.getPageWidgets);
  if (!widget) {
    return;
  }
  const widgetProps = getPageWidgets(pageKey, getWidgetKey(widget));
  if (!widgetProps) {
    return;
  }
  const getWidgetComponent = () => {
    switch (widget.widgetType) {
      case WidgetType.BANNER_CAROUSEL:
        return (
          <BannerCarouselWidget
            {...(widgetProps as WidgetProps<BannerCarouselWidgetItem>)}
          />
        );
      case WidgetType.HORIZONTAL_LIST:
        return (
          <HorizontalListWidget
            {...(widgetProps as WidgetProps<HorizontalListWidgetItem>)}
          />
        );
      case WidgetType.CART_ITEM:
        return (
          <CartItemWidget
            {...(widgetProps as WidgetProps<CartItemWidgetItem>)}
          />
        );
      case WidgetType.TEXT:
        return <TextWidget {...(widgetProps as WidgetProps<TextWidgetItem>)} />;
      default:
        return <></>;
    }
  };
  return (
    <ErrorBoundary onError={onLoadError} FallbackComponent={FallbackComponent}>
      <WrapperView viewMeta={widgetProps.viewMeta}>
        <WidgetHeader header={widgetProps.header} />
        {getWidgetComponent()}
      </WrapperView>
    </ErrorBoundary>
  );
};
export default WidgetWrapper;
