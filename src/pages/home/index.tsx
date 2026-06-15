import React from 'react';
import { View, Text } from '@tarojs/components';
import StatCard from '@/components/StatCard';
import ModuleCard from '@/components/ModuleCard';
import SectionHeader from '@/components/SectionHeader';
import { homeStats, homeModules } from '@/data/plating';
import styles from './index.module.scss';

const alerts = [
  { icon: '⚠️', title: '镀铬槽Cr³⁺偏高', desc: '浓度4.2g/L，超出标准上限4.0g/L', time: '10分钟前' },
  { icon: '🔴', title: '挂具GJ-004导电失效', desc: '接触电阻5.8mΩ，需立即更换', time: '30分钟前' },
  { icon: '💧', title: '废水铬含量超标', desc: '含铬1.2mg/L，需重新处理', time: '1小时前' },
];

const HomePage: React.FC = () => {
  return (
    <View className={styles.container}>
      <View className={styles.headerSection}>
        <Text className={styles.greeting}>电镀车间管理</Text>
        <Text className={styles.greetingSub}>2026年6月15日 · 生产运行中</Text>
      </View>

      <View className={styles.statsGrid}>
        {homeStats.map((stat, idx) => (
          <StatCard key={idx} item={stat} />
        ))}
      </View>

      <SectionHeader title="功能模块" />
      <View className={styles.modulesGrid}>
        {homeModules.map((mod) => (
          <ModuleCard key={mod.id} item={mod} />
        ))}
      </View>

      <View className={styles.alertSection}>
        <SectionHeader title="异常提醒" />
        {alerts.map((alert, idx) => (
          <View className={styles.alertCard} key={idx}>
            <Text className={styles.alertIcon}>{alert.icon}</Text>
            <View className={styles.alertContent}>
              <Text className={styles.alertTitle}>{alert.title}</Text>
              <Text className={styles.alertDesc}>{alert.desc}</Text>
              <Text className={styles.alertTime}>{alert.time}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default HomePage;
