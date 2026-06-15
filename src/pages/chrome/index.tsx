import React, { useState } from 'react';
import { View, Text, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { chromeRecords } from '@/data/plating';
import styles from './index.module.scss';

const ChromePage: React.FC = () => {
  const [currentDensity, setCurrentDensity] = useState('');
  const [temperature, setTemperature] = useState('');
  const [platingTime, setPlatingTime] = useState('');
  const [targetThickness, setTargetThickness] = useState('');

  const handleSubmit = () => {
    if (!currentDensity || !temperature || !platingTime) {
      Taro.showToast({ title: '请填写完整信息', icon: 'none' });
      return;
    }
    console.info('[Chrome] 提交记录', { currentDensity, temperature, platingTime, targetThickness });
    Taro.showToast({ title: '记录已提交', icon: 'success' });
    setCurrentDensity('');
    setTemperature('');
    setPlatingTime('');
    setTargetThickness('');
  };

  return (
    <View className={styles.container}>
      <View className={styles.formSection}>
        <Text className={styles.formTitle}>新增镀铬工艺记录</Text>
        <View className={styles.paramTip}>
          <Text className={styles.paramTipText}>工艺参考：电流密度30-50 A/dm²，温度50-60℃，镀层厚度标准18-25μm</Text>
        </View>
        <View className={styles.formRow}>
          <Text className={styles.formLabel}>电流密度(A/dm²)</Text>
          <Input className={styles.formInput} type="digit" placeholder="30-50" value={currentDensity} onInput={e => setCurrentDensity(e.detail.value)} />
        </View>
        <View className={styles.formRow}>
          <Text className={styles.formLabel}>槽液温度(℃)</Text>
          <Input className={styles.formInput} type="digit" placeholder="50-60" value={temperature} onInput={e => setTemperature(e.detail.value)} />
        </View>
        <View className={styles.formRow}>
          <Text className={styles.formLabel}>电镀时间(min)</Text>
          <Input className={styles.formInput} type="digit" placeholder="请输入时间" value={platingTime} onInput={e => setPlatingTime(e.detail.value)} />
        </View>
        <View className={styles.formRow}>
          <Text className={styles.formLabel}>目标厚度(μm)</Text>
          <Input className={styles.formInput} type="digit" placeholder="18-25" value={targetThickness} onInput={e => setTargetThickness(e.detail.value)} />
        </View>
        <View className={styles.submitButton} onClick={handleSubmit}>
          <Text className={styles.submitButtonText}>提交记录</Text>
        </View>
      </View>

      {chromeRecords.map(record => (
        <View className={styles.recordCard} key={record.id}>
          <View className={styles.recordHeader}>
            <Text className={styles.recordId}>{record.id} · 镀铬</Text>
            <Text className={styles.chromeTag}>{record.currentDensity}A/dm²</Text>
          </View>
          <View className={styles.recordDetail}>
            <Text className={styles.detailItem}>{record.temperature}℃</Text>
            <Text className={styles.detailItem}>{record.platingTime}min</Text>
            <Text className={styles.detailItem}>目标{record.targetThickness}μm</Text>
            <Text className={styles.detailItem}>{record.operator}</Text>
            <Text className={styles.detailItem}>{record.date}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default ChromePage;
