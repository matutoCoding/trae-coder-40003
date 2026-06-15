import React, { useState } from 'react';
import { View, Text, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { usePlatingStore } from '@/store/plating';
import styles from './index.module.scss';

const NickelPage: React.FC = () => {
  const nickelRecords = usePlatingStore(state => state.nickelRecords);
  const addNickel = usePlatingStore(state => state.addNickel);

  const [brightenerAdded, setBrightenerAdded] = useState('');
  const [currentDensity, setCurrentDensity] = useState('');
  const [temperature, setTemperature] = useState('');
  const [platingTime, setPlatingTime] = useState('');
  const [operator, setOperator] = useState('');

  const handleSubmit = () => {
    if (!brightenerAdded || parseFloat(brightenerAdded) <= 0) {
      Taro.showToast({ title: '请输入有效光亮剂添加量', icon: 'none' });
      return;
    }
    if (!currentDensity || parseFloat(currentDensity) <= 0) {
      Taro.showToast({ title: '请输入有效电流密度', icon: 'none' });
      return;
    }
    if (!temperature || parseFloat(temperature) <= 0) {
      Taro.showToast({ title: '请输入有效温度', icon: 'none' });
      return;
    }
    if (!platingTime || parseFloat(platingTime) <= 0) {
      Taro.showToast({ title: '请输入有效电镀时间', icon: 'none' });
      return;
    }

    console.log('[Nickel] 提交记录', { brightenerAdded, currentDensity, temperature, platingTime, operator });

    addNickel({
      brightenerAdded: parseFloat(brightenerAdded),
      currentDensity: parseFloat(currentDensity),
      temperature: parseFloat(temperature),
      platingTime: parseFloat(platingTime),
      operator: operator.trim() || '操作员',
    });

    Taro.showToast({ title: '记录已保存', icon: 'success' });
    setBrightenerAdded('');
    setCurrentDensity('');
    setTemperature('');
    setPlatingTime('');
    setOperator('');
  };

  return (
    <View className={styles.container}>
      <View className={styles.formSection}>
        <Text className={styles.formTitle}>新增镀镍工艺记录</Text>
        <View className={styles.paramTip}>
          <Text className={styles.paramTipText}>工艺参考：电流密度3-5 A/dm²，温度55-65℃，光亮剂添加量3-8ml/L</Text>
        </View>
        <View className={styles.formRow}>
          <Text className={styles.formLabel}>光亮剂添加(ml/L)</Text>
          <Input className={styles.formInput} type="digit" placeholder="3-8" value={brightenerAdded} onInput={e => setBrightenerAdded(e.detail.value)} />
        </View>
        <View className={styles.formRow}>
          <Text className={styles.formLabel}>电流密度(A/dm²)</Text>
          <Input className={styles.formInput} type="digit" placeholder="3-5" value={currentDensity} onInput={e => setCurrentDensity(e.detail.value)} />
        </View>
        <View className={styles.formRow}>
          <Text className={styles.formLabel}>槽液温度(℃)</Text>
          <Input className={styles.formInput} type="digit" placeholder="55-65" value={temperature} onInput={e => setTemperature(e.detail.value)} />
        </View>
        <View className={styles.formRow}>
          <Text className={styles.formLabel}>电镀时间(min)</Text>
          <Input className={styles.formInput} type="digit" placeholder="请输入时间" value={platingTime} onInput={e => setPlatingTime(e.detail.value)} />
        </View>
        <View className={styles.formRow}>
          <Text className={styles.formLabel}>操作员</Text>
          <Input className={styles.formInput} placeholder="请输入操作员" value={operator} onInput={e => setOperator(e.detail.value)} />
        </View>
        <View className={styles.submitButton} onClick={handleSubmit}>
          <Text className={styles.submitButtonText}>提交记录</Text>
        </View>
      </View>

      {nickelRecords.map(record => (
        <View className={styles.recordCard} key={record.id}>
          <View className={styles.recordHeader}>
            <Text className={styles.recordId}>{record.id} · 镀镍</Text>
            <Text className={styles.nickelTag}>光亮剂{record.brightenerAdded}ml/L</Text>
          </View>
          <View className={styles.recordDetail}>
            <Text className={styles.detailItem}>{record.currentDensity}A/dm²</Text>
            <Text className={styles.detailItem}>{record.temperature}℃</Text>
            <Text className={styles.detailItem}>{record.platingTime}min</Text>
            <Text className={styles.detailItem}>{record.operator}</Text>
            <Text className={styles.detailItem}>{record.date}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default NickelPage;
