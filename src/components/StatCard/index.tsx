import React from 'react';
import { View, Text } from '@tarojs/components';
import classnames from 'classnames';
import styles from './index.module.scss';
import { StatItem } from '@/types/plating';

interface StatCardProps {
  item: StatItem;
}

const StatCard: React.FC<StatCardProps> = ({ item }) => {
  return (
    <View className={classnames(styles.card, item.status && styles[`status${item.status.charAt(0).toUpperCase() + item.status.slice(1)}`])}>
      <Text className={styles.label}>{item.label}</Text>
      <View className={styles.valueRow}>
        <Text className={styles.value}>{item.value}</Text>
        {item.unit && <Text className={styles.unit}>{item.unit}</Text>}
      </View>
      {item.trend && (
        <Text className={classnames(styles.trend, styles[`trend${item.trend.charAt(0).toUpperCase() + item.trend.slice(1)}`])}>
          {item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '→'}
        </Text>
      )}
    </View>
  );
};

export default StatCard;
