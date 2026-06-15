import React, { useState } from 'react';
import { View, Text, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import { usePlatingStore } from '@/store/plating';
import styles from './index.module.scss';

const standardMap: Record<string, { min: number; max: number }> = {
  'CrO₃': { min: 200, max: 260 },
  'H₂SO₄': { min: 2.0, max: 3.0 },
  'NiSO₄': { min: 200, max: 280 },
  'NiCl₂': { min: 40, max: 60 },
  'H₃BO₃': { min: 30, max: 45 },
};

const BathPage: React.FC = () => {
  const bathAnalyses = usePlatingStore(state => state.bathAnalyses);
  const addBath = usePlatingStore(state => state.addBath);

  const [bathType, setBathType] = useState('');
  const [component, setComponent] = useState('');
  const [concentration, setConcentration] = useState('');
  const [analyst, setAnalyst] = useState('');

  const getStatus = (comp: string, conc: number): 'normal' | 'warning' | 'abnormal' => {
    const standard = standardMap[comp];
    if (!standard) return 'normal';
    const range = standard.max - standard.min;
    if (conc < standard.min - range * 0.2 || conc > standard.max + range * 0.2) return 'abnormal';
    if (conc < standard.min || conc > standard.max) return 'warning';
    return 'normal';
  };

  const getStandard = (comp: string) => {
    return standardMap[comp] || { min: 0, max: 100 };
  };

  const handleSubmit = () => {
    if (!bathType.trim()) {
      Taro.showToast({ title: '请输入槽液类型', icon: 'none' });
      return;
    }
    if (!component.trim()) {
      Taro.showToast({ title: '请输入分析成分', icon: 'none' });
      return;
    }
    if (!concentration || parseFloat(concentration) < 0) {
      Taro.showToast({ title: '请输入有效浓度', icon: 'none' });
      return;
    }

    const conc = parseFloat(concentration);
    const standard = getStandard(component.trim());
    const status = getStatus(component.trim(), conc);

    console.log('[Bath] 提交分析', { bathType, component, concentration, analyst, status });

    addBath({
      bathType: bathType.trim(),
      component: component.trim(),
      concentration: conc,
      standardMin: standard.min,
      standardMax: standard.max,
      status,
      analyst: analyst.trim() || '分析员',
    });

    Taro.showToast({ title: '分析已保存', icon: 'success' });
    setBathType('');
    setComponent('');
    setConcentration('');
    setAnalyst('');
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
        <View className={styles.formRow}>
          <Text className={styles.formLabel}>分析员</Text>
          <Input className={styles.formInput} placeholder="请输入分析员" value={analyst} onInput={e => setAnalyst(e.detail.value)} />
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
