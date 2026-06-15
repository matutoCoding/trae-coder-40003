import React from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { ModuleEntry } from '@/types/plating';

interface ModuleCardProps {
  item: ModuleEntry;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ item }) => {
  const handleNavigate = () => {
    Taro.navigateTo({ url: item.path });
  };

  return (
    <View className={styles.card} onClick={handleNavigate}>
      {item.badge && item.badge > 0 && (
        <View className={styles.badge}>
          <Text className={styles.badgeText}>{item.badge}</Text>
        </View>
      )}
      <View className={styles.iconWrap} style={{ background: `${item.color}15` }}>
        <Text className={styles.icon}>{item.icon}</Text>
      </View>
      <Text className={styles.title}>{item.title}</Text>
      <Text className={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );
};

export default ModuleCard;
