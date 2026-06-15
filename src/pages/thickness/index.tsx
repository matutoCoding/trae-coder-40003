import React, { useState } from 'react';
import { View, Text, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import { usePlatingStore } from '@/store/plating';
import styles from './index.module.scss';

const standardThickness: Record<string, { min: number; max: number }> = {
  'chrome': { min: 18, max: 25 },
  'nickel': { min: 10, max: 15 },
};

const ThicknessPage: React.FC = () => {
  const thicknessMeasurements = usePlatingStore(state => state.thicknessMeasurements);
  const addThickness = usePlatingStore(state => state.addThickness);

  const [workpieceId, setWorkpieceId] = useState('');
  const [platingType, setPlatingType] = useState<'chrome' | 'nickel' | ''>('');
  const [thickness, setThickness] = useState('');
  const [inspector, setInspector] = useState('');

  const getResult = (type: string, thick: number): 'pass' | 'fail' => {
    const standard = standardThickness[type];
    if (!standard) return 'pass';
    return thick >= standard.min && thick <= standard.max ? 'pass' : 'fail';
  };

  const handleSubmit = () => {
    if (!workpieceId.trim()) {
      Taro.showToast({ title: '请输入工件编号', icon: 'none' });
      return;
    }
    if (!platingType) {
      Taro.showToast({ title: '请输入镀种类型', icon: 'none' });
      return;
    }
    if (!thickness || parseFloat(thickness) <= 0) {
      Taro.showToast({ title: '请输入有效厚度', icon: 'none' });
      return;
    }

    const thick = parseFloat(thickness);
    const type = platingType as 'chrome' | 'nickel';
    const standard = standardThickness[type] || { min: 10, max: 20 };
    const result = getResult(type, thick);

    console.log('[Thickness] 提交测量', { workpieceId, platingType, thickness, inspector, result });

    addThickness({
      workpieceId: workpieceId.trim(),
      platingType: type,
      thickness: thick,
      standardMin: standard.min,
      standardMax: standard.max,
      result,
      inspector: inspector.trim() || '检验员',
    });

    Taro.showToast({ title: '测量已保存', icon: 'success' });
    setWorkpieceId('');
    setPlatingType('');
    setThickness('');
    setInspector('');
  };

  return (
    <View className={styles.container}>
      <View className={styles.formSection}>
        <Text className={styles.formTitle}>新增镀层厚度测量</Text>
        <View className={styles.formRow}>
          <Text className={styles.formLabel}>工件编号</Text>
          <Input className={styles.formInput} placeholder="如WP-A001" value={workpieceId} onInput={e => setWorkpieceId(e.detail.value)} />
        </View>
        <View className={styles.formRow}>
          <Text className={styles.formLabel}>镀种类型</Text>
          <View className={styles.pickerRow}>
            <View
              className={classnames(styles.pickerItem, platingType === 'chrome' && styles.pickerItemActive)}
              onClick={() => setPlatingType('chrome')}
            >
              <Text>镀铬</Text>
            </View>
            <View
              className={classnames(styles.pickerItem, platingType === 'nickel' && styles.pickerItemActive)}
              onClick={() => setPlatingType('nickel')}
            >
              <Text>镀镍</Text>
            </View>
          </View>
        </View>
        <View className={styles.formRow}>
          <Text className={styles.formLabel}>测量厚度(μm)</Text>
          <Input className={styles.formInput} type="digit" placeholder="请输入厚度" value={thickness} onInput={e => setThickness(e.detail.value)} />
        </View>
        <View className={styles.formRow}>
          <Text className={styles.formLabel}>检验员</Text>
          <Input className={styles.formInput} placeholder="请输入检验员" value={inspector} onInput={e => setInspector(e.detail.value)} />
        </View>
        <View className={styles.submitButton} onClick={handleSubmit}>
          <Text className={styles.submitButtonText}>提交测量</Text>
        </View>
      </View>

      {thicknessMeasurements.map(record => (
        <View className={styles.recordCard} key={record.id}>
          <View className={styles.recordHeader}>
            <Text className={styles.recordId}>{record.workpieceId} · {record.platingType === 'chrome' ? '镀铬' : '镀镍'}</Text>
            <Text className={classnames(record.result === 'pass' ? styles.statusPass : styles.statusFail)}>
              {record.result === 'pass' ? '合格' : '不合格'}
            </Text>
          </View>
          <View className={styles.recordDetail}>
            <Text className={styles.detailItem}>厚度 {record.thickness}μm</Text>
            <Text className={styles.detailItem}>标准 {record.standardMin}-{record.standardMax}μm</Text>
            <Text className={styles.detailItem}>{record.inspector}</Text>
            <Text className={styles.detailItem}>{record.date}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default ThicknessPage;
