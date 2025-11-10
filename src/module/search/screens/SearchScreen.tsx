import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import PageWrapper from '../../../components/pageWrapper';
import WidgetFactory from '../../../components/widgetFactory';
import { ScreenName } from '../../../constants/navigationConstants';
import NavigationHeader from '../../../components/NavigationHeader';
import { Colors } from '../../../utils/colorUtils';
import useFetchSearchLayout from '../hooks/useSearchLayout';
import { useDebounce } from '../../../hooks/useDebouce';

type RootStackParamList = {
  Search: undefined;
  Details: undefined;
};

type SearchScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Search'>;
};

function SearchScreen({
  navigation: _navigation,
}: SearchScreenProps): React.JSX.Element {
  const { data, isLoading, error, refetch } = useFetchSearchLayout();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    refetch();
    console.log('DEBOUCED', debouncedSearch);
  }, [debouncedSearch, refetch]);

  return (
    <PageWrapper isLoading={isLoading} error={!!error} onRetry={refetch}>
      <NavigationHeader title="" />
      <View style={styles.inputWrapper}>
        <TextInput
          autoFocus={true}
          style={styles.searchInput}
          placeholder="What are you looking for?"
          value={search}
          onChangeText={setSearch}
          placeholderTextColor={Colors.TEXT_TERTIARY}
          returnKeyType="search"
        />
      </View>
      <WidgetFactory widgets={data} pageKey={ScreenName.SEARCH} />
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    paddingHorizontal: 8,
    paddingTop: 12,
    paddingBottom: 12,
  },
  searchInput: {
    height: 50,
    borderRadius: 8,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 14,
    fontSize: 16,
    color: Colors.TEXT_PRIMARY,
    borderWidth: 0,
  },
});

export default SearchScreen;
