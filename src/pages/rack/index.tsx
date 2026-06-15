import React, { useState } from 'react';
import { View, Text, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import { usePlatingStore } from '@/store/plating';
import styles from './index.module.scss';

const RackPage: React.FC = () => {
  const rackInspections = usePlatingStore(state => state.rackInspections);
  const addRack = usePlatingStore(state => state.addRack);

  const [rackId, setRackId] = useState('');
  const [contactResistance, setContactResistance] = useState('');
  const [inspector, setInspector] = useState('');

  const getConductivity = (resistance: number): 'good' | 'poor' | 'failed' => {
    if (resistance <= 5) return 'good';
    if (resistance <= 10) return 'poor';
    return 'failed';
  };

  const handleSubmit = () => {
    if (!rackId.trim()) {
      Taro.showToast({ title: '请输入挂具编号', icon: 'none' });
      return;
    }
    if (!contactResistance || parseFloat(contactResistance) < 0) {
      Taro.showToast({ title: '请输入有效电阻值', icon: 'none' });
      return;
    }

    const resistance = parseFloat(contactResistance);
    const conductivity = getConductivity(resistance);

    console.log('[Rack] 提交检查', { rackId, contactResistance, inspector, conductivity });

    addRack({
      rackId: rackId.trim(),
      contactResistance: resistance,
      conductivity,
      inspector: inspector.trim() || '检查员',
    });

    Taro.showToast({ title: '检查已保存', icon: 'success' });
    setRackId('');
    setContactResistance('');
    setInspector('');
  };

  return (
    <View className={styles.container}>
      <View className={styles.formSection}>
        <Text className={styles.formTitle} style={{ borderLeftColor: '#00b894' }}>新增挂具导电检查</Text>
        <View className={styles.formRow}>
          <Text className={styles.formLabel}>挂具编号</Text>
          <Input className={styles.formInput} placeholder="如GJ-001" value={rackId} onInput={e => setRackId(e.detail.value)} />
        </View>
        <View className={styles.formRow}>
          <Text className={styles.formLabel}>接触电阻(mΩ)</Text>
          <Input className={styles.formInput} type="digit" placeholder="请输入电阻值" value={contactResistance} onInput={e => setContactResistance(e.detail.value)} />
        </View>
        <View className={styles.formRow}>
          <Text className={styles.formLabel}>检查员</Text>
          <Input className={styles.formInput} placeholder="请输入检查员" value={inspector} onInput={e => setInspector(e.detail.value)} />
        </View>
        <View className={styles.submitButton} onClick={handleSubmit}>
          <Text className={styles.submitButtonText}>提交检查</Text>
        </View>
      </View>

      {rackInspections.map(record => (
        <View className={styles.recordCard} key={record.id}>
          <View className={styles.recordHeader}>
            <Text className={styles.recordId}>{record.rackId} · 导电检查</Text>
            <Text className={classnames(
              styles.statusTag,
              record.conductivity === 'poor' && styles.warning,
              record.conductivity === 'failed' && styles.fail,
            )}>
              {record.conductivity === 'good' ? '良好' : record.conductivity === 'poor' ? '不良' : '失效'}
            </Text>
          </View>
          <View className={styles.recordDetail}>
            <Text className={styles.detailItem}>电阻 {record.contactResistance}mΩ</Text>
            <Text className={styles.detailItem}>下次检查 {record.nextInspectionDate}</Text>
            <Text className={styles.detailItem}>{record.inspector}</Text>
            <Text className={styles.detailItem}>{record.date}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default RackPage;
