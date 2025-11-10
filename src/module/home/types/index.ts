import { BaseWidgetHeader, WidgetResponse } from '../../../types/widgetTypes';

export type HomeLayoutResponse = {
  widgets?: Array<WidgetResponse>;
  header?: BaseWidgetHeader;
};
