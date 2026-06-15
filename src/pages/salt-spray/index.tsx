import React, { useState } from 'react';
import { View, Text, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import { usePlatingStore } from '@/store/plating';
import styles from './index.module.scss';

const ratings = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

const SaltSprayPage: React.FC = () => {
  const saltSprayTests = usePlatingStore(state => state.saltSprayTests);
  const addSaltSpray = usePlatingStore(state => state.addSaltSpray);

  const [workpieceId, setWorkpieceId] = useState('');
  const [duration, setDuration] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [result, setResult] = useState<'pass' | 'fail' | ''>('');
  const [inspector, setInspector] = useState('');

  const handleSubmit = () => {
    if (!workpieceId.trim()) {
      Taro.showToast({ title: '请输入工件编号', icon: 'none' });
      return;
    }
    if (!duration || parseFloat(duration) <= 0) {
      Taro.showToast({ title: '请输入试验时长', icon: 'none' });
      return;
    }
    if (rating === null) {
      Taro.showToast({ title: '请选择评级', icon: 'none' });
      return;
    }
    if (!result) {
      Taro.showToast({ title: '请选择试验结果', icon: 'none' });
      return;
    }

    console.log('[SaltSpray] 提交记录', { workpieceId, duration, rating, result, inspector });

    addSaltSpray({
      workpieceId: workpieceId.trim(),
      duration: parseFloat(duration),
      rating,
      result: result as 'pass' | 'fail',
      inspector: inspector.trim() || '操作员',
    });

    Taro.showToast({ title: '记录已保存', icon: 'success' });
  };

  return (
    <View className={styles.container}>
      <View className={styles.formSection}>
        <Text className={styles.formTitle}>新增盐雾试验</Text>

        <View className={styles.formRow}>
          <Text className={styles.formLabel}>工件编号</Text>
          <Input
            className={styles.formInput}
            placeholder="如WP-A001"
            value={workpieceId}
            onInput={e => setWorkpieceId(e.detail.value)}
          />
        </View>

        <View className={styles.formRow}>
          <Text className={styles.formLabel}>试验时长(h)</Text>
          <Input
            className={styles.formInput}
            type="digit"
            placeholder="如24、48、72"
            value={duration}
            onInput={e => setDuration(e.detail.value)}
          />
        </View>

        <View className={styles.formRow}>
          <Text className={styles.formLabel}>评级</Text>
          <View className={styles.ratingSelector}>
            {ratings.map(r => (
              <View
                key={r}
                className={classnames(styles.ratingItem, rating === r && styles.ratingItemActive)}
                onClick={() => setRating(r)}
              >
                <Text>{r}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className={styles.formRow}>
          <Text className={styles.formLabel}>试验结果</Text>
          <View className={styles.resultSelector}>
            <View
              className={classnames(styles.resultButton, styles.resultButtonPass, result === 'pass' && styles.resultButtonPassActive)}
              onClick={() => setResult('pass')}
            >
              <Text>合格</Text>
            </View>
            <View
              className={classnames(styles.resultButton, styles.resultButtonFail, result === 'fail' && styles.resultButtonFailActive)}
              onClick={() => setResult('fail')}
            >
              <Text>不合格</Text>
            </View>
          </View>
        </View>

        <View className={styles.formRow}>
          <Text className={styles.formLabel}>检验员</Text>
          <Input
            className={styles.formInput}
            placeholder="请输入检验员"
            value={inspector}
            onInput={e => setInspector(e.detail.value)}
          />
        </View>

        <View className={styles.submitButton} onClick={handleSubmit}>
          <Text className={styles.submitButtonText}>保存记录</Text>
        </View>
      </View>

      {saltSprayTests.map(record => (
        <View className={styles.recordCard} key={record.id}>
          <View className={styles.recordHeader}>
            <Text className={styles.recordId}>{record.workpieceId} · 盐雾试验</Text>
            <Text className={classnames(record.result === 'pass' ? styles.statusPass : styles.statusFail)}>
              {record.result === 'pass' ? '合格' : '不合格'}
            </Text>
          </View>
          <View className={styles.recordDetail}>
            <Text className={styles.detailItem}>{record.duration}h</Text>
            <Text className={styles.ratingDisplay}>评级 {record.rating}</Text>
            <Text className={styles.detailItem}>{record.inspector}</Text>
            <Text className={styles.detailItem}>{record.date}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default SaltSprayPage;
