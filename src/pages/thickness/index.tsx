import React, { useState } from 'react';
import { View, Text, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import { thicknessMeasurements } from '@/data/plating';
import styles from './index.module.scss';

const ThicknessPage: React.FC = () => {
  const [workpieceId, setWorkpieceId] = useState('');
  const [platingType, setPlatingType] = useState('');
  const [thickness, setThickness] = useState('');

  const handleSubmit = () => {
    if (!workpieceId || !platingType || !thickness) {
      Taro.showToast({ title: '请填写完整信息', icon: 'none' });
      return;
    }
    console.info('[Thickness] 提交测量', { workpieceId, platingType, thickness });
    Taro.showToast({ title: '测量已提交', icon: 'success' });
    setWorkpieceId('');
    setPlatingType('');
    setThickness('');
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
          <Input className={styles.formInput} placeholder="chrome/nickel" value={platingType} onInput={e => setPlatingType(e.detail.value)} />
        </View>
        <View className={styles.formRow}>
          <Text className={styles.formLabel}>测量厚度(μm)</Text>
          <Input className={styles.formInput} type="digit" placeholder="请输入厚度" value={thickness} onInput={e => setThickness(e.detail.value)} />
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
