import React, { useState } from 'react';
import { View, Text, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import { usePlatingStore } from '@/store/plating';
import styles from './index.module.scss';

const reworkTypes: { key: 'stripping' | 'replating'; label: string }[] = [
  { key: 'stripping', label: '退镀' },
  { key: 'replating', label: '返镀' },
];

const methods = ['化学退镀', '电解退镀', '机械打磨', '补镀'];

const statuses: { key: 'pending' | 'processing' | 'completed'; label: string }[] = [
  { key: 'pending', label: '待处理' },
  { key: 'processing', label: '处理中' },
  { key: 'completed', label: '已完成' },
];

const ReworkPage: React.FC = () => {
  const reworkRecords = usePlatingStore(state => state.reworkRecords);
  const addRework = usePlatingStore(state => state.addRework);

  const [workpieceId, setWorkpieceId] = useState('');
  const [reason, setReason] = useState('');
  const [reworkType, setReworkType] = useState<'stripping' | 'replating' | ''>('');
  const [method, setMethod] = useState('');
  const [status, setStatus] = useState<'pending' | 'processing' | 'completed' | ''>('');
  const [operator, setOperator] = useState('');

  const handleSubmit = () => {
    if (!workpieceId.trim()) {
      Taro.showToast({ title: '请输入工件编号', icon: 'none' });
      return;
    }
    if (!reason.trim()) {
      Taro.showToast({ title: '请输入不合格原因', icon: 'none' });
      return;
    }
    if (!reworkType) {
      Taro.showToast({ title: '请选择退镀或返镀', icon: 'none' });
      return;
    }
    if (!method.trim()) {
      Taro.showToast({ title: '请输入处理方式', icon: 'none' });
      return;
    }
    if (!status) {
      Taro.showToast({ title: '请选择处理状态', icon: 'none' });
      return;
    }

    console.log('[Rework] 提交记录', { workpieceId, reason, reworkType, method, status, operator });

    addRework({
      workpieceId: workpieceId.trim(),
      reason: reason.trim(),
      reworkType: reworkType as 'stripping' | 'replating',
      method: method.trim(),
      status: status as 'pending' | 'processing' | 'completed',
      operator: operator.trim() || '操作员',
    });

    Taro.showToast({ title: '记录已保存', icon: 'success' });
  };

  const getStatusClass = (s: string) => {
    switch (s) {
      case 'pending': return styles.statusPending;
      case 'processing': return styles.statusProcessing;
      case 'completed': return styles.statusCompleted;
      default: return '';
    }
  };

  const getStatusText = (s: string) => {
    switch (s) {
      case 'pending': return '待处理';
      case 'processing': return '处理中';
      case 'completed': return '已完成';
      default: return '';
    }
  };

  return (
    <View className={styles.container}>
      <View className={styles.formSection}>
        <Text className={styles.formTitle}>新增退镀返工</Text>

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
          <Text className={styles.formLabel}>不合格原因</Text>
          <Input
            className={styles.formTextarea}
            placeholder="请输入不合格原因"
            value={reason}
            onInput={e => setReason(e.detail.value)}
          />
        </View>

        <View className={styles.formRow}>
          <Text className={styles.formLabel}>类型</Text>
          <View className={styles.pickerRow}>
            {reworkTypes.map(item => (
              <View
                key={item.key}
                className={classnames(styles.pickerItem, reworkType === item.key && styles.pickerItemActive)}
                onClick={() => setReworkType(item.key)}
              >
                <Text>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className={styles.formRow}>
          <Text className={styles.formLabel}>处理方式</Text>
          <View className={styles.pickerRow}>
            {methods.map(m => (
              <View
                key={m}
                className={classnames(styles.pickerItem, method === m && styles.pickerItemActive)}
                onClick={() => setMethod(m)}
              >
                <Text>{m}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className={styles.formRow}>
          <Text className={styles.formLabel}>处理状态</Text>
          <View className={styles.statusSelector}>
            {statuses.map(s => (
              <View
                key={s.key}
                className={classnames(
                  styles.statusButton,
                  styles[`statusButton${s.key.charAt(0).toUpperCase() + s.key.slice(1)}`],
                  status === s.key && styles[`statusButton${s.key.charAt(0).toUpperCase() + s.key.slice(1)}Active`]
                )}
                onClick={() => setStatus(s.key)}
              >
                <Text>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className={styles.formRow}>
          <Text className={styles.formLabel}>操作员</Text>
          <Input
            className={styles.formInput}
            placeholder="请输入操作员"
            value={operator}
            onInput={e => setOperator(e.detail.value)}
          />
        </View>

        <View className={styles.submitButton} onClick={handleSubmit}>
          <Text className={styles.submitButtonText}>保存记录</Text>
        </View>
      </View>

      {reworkRecords.map(record => (
        <View className={styles.recordCard} key={record.id}>
          <View className={styles.recordHeader}>
            <Text className={styles.recordId}>
              {record.workpieceId} · {record.reworkType === 'stripping' ? '退镀' : '返镀'}
            </Text>
            <Text className={getStatusClass(record.status)}>
              {getStatusText(record.status)}
            </Text>
          </View>
          <View className={styles.recordDetail}>
            <Text className={styles.detailItem}>{record.method}</Text>
            <Text className={styles.detailItem}>{record.operator}</Text>
            <Text className={styles.detailItem}>{record.date}</Text>
          </View>
          <Text className={styles.reasonItem}>原因：{record.reason}</Text>
        </View>
      ))}
    </View>
  );
};

export default ReworkPage;
