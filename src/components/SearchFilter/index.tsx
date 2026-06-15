import React from 'react';
import { View, Text, Input } from '@tarojs/components';
import classnames from 'classnames';
import styles from './index.module.scss';

export interface FilterOption {
  key: string;
  label: string;
}

interface SearchFilterProps {
  searchPlaceholder?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  filterOptions?: FilterOption[];
  filterValue: string;
  onFilterChange: (key: string) => void;
  onClear?: () => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchPlaceholder = '搜索...',
  searchValue,
  onSearchChange,
  filterOptions = [],
  filterValue,
  onFilterChange,
  onClear,
}) => {
  return (
    <View className={styles.container}>
      <View className={styles.searchRow}>
        <Input
          className={styles.searchInput}
          placeholder={searchPlaceholder}
          value={searchValue}
          onInput={e => onSearchChange(e.detail.value)}
        />
        {onClear && (
          <View className={styles.clearButton} onClick={onClear}>
            <Text>清空</Text>
          </View>
        )}
      </View>
      {filterOptions.length > 0 && (
        <View className={styles.filterRow}>
          {filterOptions.map(option => (
            <View
              key={option.key}
              className={classnames(
                styles.filterItem,
                filterValue === option.key && styles.filterItemActive
              )}
              onClick={() => onFilterChange(option.key)}
            >
              <Text>{option.label}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default SearchFilter;
