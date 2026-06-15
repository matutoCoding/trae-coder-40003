import React, { useState } from 'react';
import { View, Text, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import { bathAnalyses } from '@/data/plating';
import styles from './index.module.scss';

const BathPage: React.FC = () => {
  const [bathType, setBathType] = useState('');
  const [component, setComponent] = useState('');
  const [concentration, setConcentration] = useState('');

  const handleSubmit = () => {
    if (!bathType || !component || !concentration) {
      Taro.showToast({ title: '请填写完整信息', icon: 'none' });
      return;
    }
    console.info('[Bath] 提交分析', { bathType, component, concentration });
    Taro.showToast({ title: '分析已提交', icon: 'success' });
    setBathType('');
    setComponent('');
    setConcentration('');
  };

  return (
    <View className={styles.container}>
      <View className={styles.formSection}>
        <Text className={styles.formTitle}>新增槽液成分分析</Text>
        <View className={styles.formRow}>
          <Text className={styles.formLabel}>槽液类型</Text>
          <Input className={styles.formInput} placeholder="镀铬槽/镀镍槽" value={bathType} onInput={e => setBathType(e.detail.value)} />
        </View>
        <View className={styles.formRow}>
          <Text className={styles.formLabel}>分析成分</Text>
          <Input className={styles.formInput} placeholder="如CrO₃、NiSO₄" value={component} onInput={e => setComponent(e.detail.value)} />
        </View>
        <View className={styles.formRow}>
          <Text className={styles.formLabel}>浓度(g/L)</Text>
          <Input className={styles.formInput} type="digit" placeholder="请输入浓度" value={concentration} onInput={e => setConcentration(e.detail.value)} />
        </View>
        <View className={styles.submitButton} onClick={handleSubmit}>
          <Text className={styles.submitButtonText}>提交分析</Text>
        </View>
      </View>

      {bathAnalyses.map(record => (
        <View className={styles.recordCard} key={record.id}>
          <View className={styles.recordHeader}>
            <Text className={styles.recordId}>{record.bathType} · {record.component}</Text>
            <Text className={classnames(
              styles.statusTag,
              record.status === 'normal' && styles.statusNormal,
              record.status === 'warning' && styles.statusWarning,
              record.status === 'abnormal' && styles.statusAbnormal,
            )}>
              {record.status === 'normal' ? '正常' : record.status === 'warning' ? '预警' : '异常'}
            </Text>
          </View>
          <View className={styles.recordDetail}>
            <Text className={styles.detailItem}>浓度 {record.concentration}</Text>
            <Text className={styles.detailItem}>标准 {record.standardMin}-{record.standardMax}</Text>
            <Text className={styles.detailItem}>{record.analyst}</Text>
            <Text className={styles.detailItem}>{record.date}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default BathPage;
