import React, { useState } from 'react';
import { View, Text, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import { picklingRecords } from '@/data/plating';
import styles from './index.module.scss';

const PicklingPage: React.FC = () => {
  const [acidType, setAcidType] = useState('');
  const [concentration, setConcentration] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = () => {
    if (!acidType || !concentration || !duration) {
      Taro.showToast({ title: '请填写完整信息', icon: 'none' });
      return;
    }
    console.info('[Pickling] 提交记录', { acidType, concentration, duration });
    Taro.showToast({ title: '记录已提交', icon: 'success' });
    setAcidType('');
    setConcentration('');
    setDuration('');
  };

  return (
    <View className={styles.container}>
      <View className={styles.formSection}>
        <Text className={styles.formTitle}>新增酸洗活化记录</Text>
        <View className={styles.formRow}>
          <Text className={styles.formLabel}>酸洗类型</Text>
          <Input className={styles.formInput} placeholder="盐酸/硫酸/混合酸" value={acidType} onInput={e => setAcidType(e.detail.value)} />
        </View>
        <View className={styles.formRow}>
          <Text className={styles.formLabel}>浓度(%)</Text>
          <Input className={styles.formInput} type="digit" placeholder="请输入浓度" value={concentration} onInput={e => setConcentration(e.detail.value)} />
        </View>
        <View className={styles.formRow}>
          <Text className={styles.formLabel}>活化时长(min)</Text>
          <Input className={styles.formInput} type="digit" placeholder="请输入时长" value={duration} onInput={e => setDuration(e.detail.value)} />
        </View>
        <View className={styles.submitButton} onClick={handleSubmit}>
          <Text className={styles.submitButtonText}>提交记录</Text>
        </View>
      </View>

      {picklingRecords.map(record => (
        <View className={styles.recordCard} key={record.id}>
          <View className={styles.recordHeader}>
            <Text className={styles.recordId}>{record.id} · {record.acidType}酸洗</Text>
            <Text className={classnames(styles.statusTag, record.status === 'pass' ? styles.statusPass : styles.statusFail)}>
              {record.status === 'pass' ? '合格' : '不合格'}
            </Text>
          </View>
          <View className={styles.recordDetail}>
            <Text className={styles.detailItem}>{record.concentration}%</Text>
            <Text className={styles.detailItem}>{record.duration}min</Text>
            <Text className={styles.detailItem}>{record.operator}</Text>
            <Text className={styles.detailItem}>{record.date}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default PicklingPage;
