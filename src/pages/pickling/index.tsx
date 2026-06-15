import React, { useState } from 'react';
import { View, Text, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import { usePlatingStore } from '@/store/plating';
import styles from './index.module.scss';

const PicklingPage: React.FC = () => {
  const picklingRecords = usePlatingStore(state => state.picklingRecords);
  const addPickling = usePlatingStore(state => state.addPickling);

  const [acidType, setAcidType] = useState('');
  const [concentration, setConcentration] = useState('');
  const [duration, setDuration] = useState('');
  const [operator, setOperator] = useState('');

  const handleSubmit = () => {
    if (!acidType.trim()) {
      Taro.showToast({ title: '请输入酸洗类型', icon: 'none' });
      return;
    }
    if (!concentration || parseFloat(concentration) <= 0) {
      Taro.showToast({ title: '请输入有效浓度', icon: 'none' });
      return;
    }
    if (!duration || parseFloat(duration) <= 0) {
      Taro.showToast({ title: '请输入有效时长', icon: 'none' });
      return;
    }

    console.log('[Pickling] 提交记录', { acidType, concentration, duration, operator });

    addPickling({
      acidType: acidType.trim(),
      concentration: parseFloat(concentration),
      duration: parseFloat(duration),
      operator: operator.trim() || '操作员',
      status: 'pass',
    });

    Taro.showToast({ title: '记录已保存', icon: 'success' });
    setAcidType('');
    setConcentration('');
    setDuration('');
    setOperator('');
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
        <View className={styles.formRow}>
          <Text className={styles.formLabel}>操作员</Text>
          <Input className={styles.formInput} placeholder="请输入操作员" value={operator} onInput={e => setOperator(e.detail.value)} />
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
