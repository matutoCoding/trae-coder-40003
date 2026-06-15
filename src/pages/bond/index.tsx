import React, { useState } from 'react';
import { View, Text, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import { usePlatingStore } from '@/store/plating';
import styles from './index.module.scss';

const testMethods = ['弯曲试验', '划格试验', '热震试验', '冲击试验'];

const BondPage: React.FC = () => {
  const bondTests = usePlatingStore(state => state.bondTests);
  const addBond = usePlatingStore(state => state.addBond);

  const [workpieceId, setWorkpieceId] = useState('');
  const [testMethod, setTestMethod] = useState('');
  const [result, setResult] = useState<'pass' | 'fail' | ''>('');
  const [description, setDescription] = useState('');
  const [inspector, setInspector] = useState('');

  const handleSubmit = () => {
    if (!workpieceId.trim()) {
      Taro.showToast({ title: '请输入工件编号', icon: 'none' });
      return;
    }
    if (!testMethod) {
      Taro.showToast({ title: '请选择试验方式', icon: 'none' });
      return;
    }
    if (!result) {
      Taro.showToast({ title: '请选择试验结果', icon: 'none' });
      return;
    }

    console.log('[Bond] 提交记录', { workpieceId, testMethod, result, description, inspector });

    addBond({
      workpieceId: workpieceId.trim(),
      testMethod,
      result: result as 'pass' | 'fail',
      description: description.trim() || (result === 'pass' ? '镀层结合良好' : '镀层结合力不合格'),
      inspector: inspector.trim() || '操作员',
    });

    Taro.showToast({ title: '记录已保存', icon: 'success' });
  };

  return (
    <View className={styles.container}>
      <View className={styles.formSection}>
        <Text className={styles.formTitle}>新增结合力试验</Text>

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
          <Text className={styles.formLabel}>试验方式</Text>
          <View className={styles.pickerRow}>
            {testMethods.map(method => (
              <View
                key={method}
                className={classnames(styles.pickerItem, testMethod === method && styles.pickerItemActive)}
                onClick={() => setTestMethod(method)}
              >
                <Text>{method}</Text>
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
          <Text className={styles.formLabel}>描述说明</Text>
          <Input
            className={styles.formInput}
            placeholder="请输入试验详情"
            value={description}
            onInput={e => setDescription(e.detail.value)}
          />
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

      {bondTests.map(record => (
        <View className={styles.recordCard} key={record.id}>
          <View className={styles.recordHeader}>
            <Text className={styles.recordId}>{record.workpieceId} · {record.testMethod}</Text>
            <Text className={classnames(record.result === 'pass' ? styles.statusPass : styles.statusFail)}>
              {record.result === 'pass' ? '合格' : '不合格'}
            </Text>
          </View>
          <View className={styles.recordDetail}>
            <Text className={styles.detailItem}>{record.inspector}</Text>
            <Text className={styles.detailItem}>{record.date}</Text>
          </View>
          <Text className={styles.descriptionItem}>{record.description}</Text>
        </View>
      ))}
    </View>
  );
};

export default BondPage;
