import React, { useState } from 'react';
import { View, Text, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import { usePlatingStore } from '@/store/plating';
import styles from './index.module.scss';

const DegreasingPage: React.FC = () => {
  const degreasingRecords = usePlatingStore(state => state.degreasingRecords);
  const addDegreasing = usePlatingStore(state => state.addDegreasing);

  const [method, setMethod] = useState('');
  const [temperature, setTemperature] = useState('');
  const [duration, setDuration] = useState('');
  const [operator, setOperator] = useState('');

  const handleSubmit = () => {
    if (!method.trim()) {
      Taro.showToast({ title: '请输入除油方式', icon: 'none' });
      return;
    }
    if (!temperature || parseFloat(temperature) <= 0) {
      Taro.showToast({ title: '请输入有效温度', icon: 'none' });
      return;
    }
    if (!duration || parseFloat(duration) <= 0) {
      Taro.showToast({ title: '请输入有效时长', icon: 'none' });
      return;
    }

    console.log('[Degreasing] 提交记录', { method, temperature, duration, operator });

    addDegreasing({
      method: method.trim(),
      temperature: parseFloat(temperature),
      duration: parseFloat(duration),
      operator: operator.trim() || '操作员',
      status: 'pass',
    });

    Taro.showToast({ title: '记录已保存', icon: 'success' });
    setMethod('');
    setTemperature('');
    setDuration('');
    setOperator('');
  };

  return (
    <View className={styles.container}>
      <View className={styles.formSection}>
        <Text className={styles.formTitle}>新增除油除锈记录</Text>
        <View className={styles.formRow}>
          <Text className={styles.formLabel}>除油方式</Text>
          <Input className={styles.formInput} placeholder="化学除油/电解除油" value={method} onInput={e => setMethod(e.detail.value)} />
        </View>
        <View className={styles.formRow}>
          <Text className={styles.formLabel}>温度(℃)</Text>
          <Input className={styles.formInput} type="digit" placeholder="请输入温度" value={temperature} onInput={e => setTemperature(e.detail.value)} />
        </View>
        <View className={styles.formRow}>
          <Text className={styles.formLabel}>时长(min)</Text>
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

      {degreasingRecords.map(record => (
        <View className={styles.recordCard} key={record.id}>
          <View className={styles.recordHeader}>
            <Text className={styles.recordId}>{record.id} · {record.method}</Text>
            <Text className={classnames(styles.statusTag, record.status === 'pass' ? styles.statusPass : styles.statusFail)}>
              {record.status === 'pass' ? '合格' : '不合格'}
            </Text>
          </View>
          <View className={styles.recordDetail}>
            <Text className={styles.detailItem}>{record.temperature}℃</Text>
            <Text className={styles.detailItem}>{record.duration}min</Text>
            <Text className={styles.detailItem}>{record.operator}</Text>
            <Text className={styles.detailItem}>{record.date}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default DegreasingPage;
