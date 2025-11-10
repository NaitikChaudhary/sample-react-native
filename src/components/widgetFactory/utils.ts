import { BaseWidgetType } from '../../types/widgetTypes';

export const getWidgetKey = (widget: BaseWidgetType) => {
  return `${widget.widgetType}-${widget.widgetId}-${widget.widgetName}`;
};
