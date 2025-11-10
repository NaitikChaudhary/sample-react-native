import { useQuery } from 'react-query';
import { LayoutRepositoryInstanceProvider } from '../../../data/repositories/layoutRepository';
import { BaseWidgetType, WidgetResponse } from '../../../types/widgetTypes';
import { useWidgetStore } from '../../../store/widgetStore';
import { getWidgetKey } from '../../../components/widgetFactory/utils';
import { ScreenName } from '../../../constants/navigationConstants';

const useFetchSearchLayout = () => {
  const setPageWidgets = useWidgetStore(s => s.setPageWidgets);
  return useQuery(
    ['search-layout'],
    () => {
      return new Promise<Array<BaseWidgetType>>((resolve, reject) => {
        LayoutRepositoryInstanceProvider.getRepositoryInstance()
          .fetchSearchLayout()
          .then(response => {
            const { widgets } = response.data;
            const widgetData: { [widgetKey: string]: WidgetResponse } = {};
            const widgetResponse: Array<BaseWidgetType> = [];
            widgets?.forEach(widget => {
              widgetData[getWidgetKey(widget)] = widget;
              widgetResponse.push({
                widgetId: widget.widgetId,
                widgetType: widget.widgetType,
                widgetName: widget.widgetName,
              });
            });
            setPageWidgets(ScreenName.SEARCH, widgetData);
            resolve(widgetResponse);
          })
          .catch(error => {
            console.log(error, 'error HOOK');
            reject(error);
          });
      });
    },
    {
      cacheTime: 2000,
      staleTime: 0,
      enabled: true,
      retry: false,
    },
  );
};

export default useFetchSearchLayout;

