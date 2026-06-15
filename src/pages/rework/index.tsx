import React, { useState, useEffect } from 'react';
import { View, Text, Input } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
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
  const router = useRouter();
  const reworkRecords = usePlatingStore(state => state.reworkRecords);
  const addRework = usePlatingStore(state => state.addRework);

  const [workpieceId, setWorkpieceId] = useState('');
  const [reason, setReason] = useState('');
  const [reworkType, setReworkType] = useState<'stripping' | 'replating' | ''>('');
  const [method, setMethod] = useState('');
  const [status, setStatus] = useState<'pending' | 'processing' | 'completed' | ''>('');
  const [operator, setOperator] = useState('');
  const [sourceType, setSourceType] = useState<'thickness' | 'bond' | 'saltSpray' | ''>('');
  const [sourceId, setSourceId] = useState('');

  useEffect(() => {
    if (router.params.workpieceId) {
      setWorkpieceId(decodeURIComponent(router.params.workpieceId));
    }
    if (router.params.reason) {
      setReason(decodeURIComponent(router.params.reason));
    }
    if (router.params.sourceType) {
      setSourceType(router.params.sourceType as 'thickness' | 'bond' | 'saltSpray');
    }
    if (router.params.sourceId) {
      setSourceId(router.params.sourceId);
    }
  }, [router.params]);

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

    console.log('[Rework] 提交记录', { workpieceId, reason, reworkType, method, status, operator, sourceType, sourceId });

    addRework({
      workpieceId: workpieceId.trim(),
      reason: reason.trim(),
      reworkType: reworkType as 'stripping' | 'replating',
      method: method.trim(),
      status: status as 'pending' | 'processing' | 'completed',
      operator: operator.trim() || '操作员',
      sourceType: sourceType || undefined,
      sourceId: sourceId || undefined,
    });

    Taro.showToast({ title: '记录已保存', icon: 'success' });

    if (sourceType) {
      setTimeout(() => {
        Taro.navigateBack();
      }, 1500);
    }
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

  const getSourceName = (type: string) => {
    const map: Record<string, string> = {
      thickness: '镀层厚度检测',
      bond: '结合力试验',
      saltSpray: '盐雾试验',
    };
    return map[type] || type;
  };

  const statusButtonClassMap: Record<string, string> = {
    pending: 'statusButtonPending',
    processing: 'statusButtonProcessing',
    completed: 'statusButtonCompleted',
  };

  const statusButtonActiveClassMap: Record<string, string> = {
    pending: 'statusButtonPendingActive',
    processing: 'statusButtonProcessingActive',
    completed: 'statusButtonCompletedActive',
  };

  return (
    <View className={styles.container}>
      <View className={styles.formSection}>
        <Text className={styles.formTitle}>新增退镀返工</Text>

        {sourceType && (
          <View className={styles.sourceTip}>
            <Text className={styles.sourceTipText}>
              来源：{getSourceName(sourceType)} · {sourceId}
            </Text>
          </View>
        )}

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
                  styles[statusButtonClassMap[s.key]],
                  status === s.key && styles[statusButtonActiveClassMap[s.key]]
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
          {record.sourceType && (
            <Text className={styles.sourceItem}>来源：{getSourceName(record.sourceType)} · {record.sourceId}</Text>
          )}
        </View>
      ))}
    </View>
  );
};

export default ReworkPage;
