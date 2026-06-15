import React, { useState, useEffect } from 'react';
import { View, Text, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import { usePlatingStore } from '@/store/plating';
import styles from './index.module.scss';

const treatmentMethods = ['化学沉淀', '离子交换', '电解还原', '生物处理'];

const WastewaterPage: React.FC = () => {
  const wastewaterRecords = usePlatingStore(state => state.wastewaterRecords);
  const addWastewater = usePlatingStore(state => state.addWastewater);

  const [chromiumContent, setChromiumContent] = useState('');
  const [dischargeVolume, setDischargeVolume] = useState('');
  const [treatmentMethod, setTreatmentMethod] = useState('');
  const [result, setResult] = useState<'pass' | 'fail' | ''>('');
  const [operator, setOperator] = useState('');

  useEffect(() => {
    if (chromiumContent) {
      const val = parseFloat(chromiumContent);
      if (val > 0) {
        setResult(val <= 1.0 ? 'pass' : 'fail');
      }
    }
  }, [chromiumContent]);

  const handleSubmit = () => {
    if (!chromiumContent || parseFloat(chromiumContent) < 0) {
      Taro.showToast({ title: '请输入铬含量', icon: 'none' });
      return;
    }
    if (!dischargeVolume || parseFloat(dischargeVolume) <= 0) {
      Taro.showToast({ title: '请输入排放量', icon: 'none' });
      return;
    }
    if (!treatmentMethod) {
      Taro.showToast({ title: '请选择处理方式', icon: 'none' });
      return;
    }
    if (!result) {
      Taro.showToast({ title: '请选择达标结果', icon: 'none' });
      return;
    }

    console.log('[Wastewater] 提交记录', { chromiumContent, dischargeVolume, treatmentMethod, result, operator });

    addWastewater({
      chromiumContent: parseFloat(chromiumContent),
      dischargeVolume: parseFloat(dischargeVolume),
      treatmentMethod,
      result: result as 'pass' | 'fail',
      operator: operator.trim() || '操作员',
    });

    Taro.showToast({ title: '记录已保存', icon: 'success' });
    setChromiumContent('');
    setDischargeVolume('');
    setTreatmentMethod('');
    setResult('');
    setOperator('');
  };

  return (
    <View className={styles.container}>
      <View className={styles.formSection}>
        <Text className={styles.formTitle}>新增含铬废水排放</Text>

        <View className={styles.formRow}>
          <Text className={styles.formLabel}>铬含量(mg/L)</Text>
          <Input
            className={styles.formInput}
            type="digit"
            placeholder="如0.5"
            value={chromiumContent}
            onInput={e => setChromiumContent(e.detail.value)}
          />
        </View>

        <View className={styles.formRow}>
          <Text className={styles.formLabel}>排放量(t)</Text>
          <Input
            className={styles.formInput}
            type="digit"
            placeholder="如5.2"
            value={dischargeVolume}
            onInput={e => setDischargeVolume(e.detail.value)}
          />
        </View>

        <View className={styles.formRow}>
          <Text className={styles.formLabel}>处理方式</Text>
          <View className={styles.pickerRow}>
            {treatmentMethods.map(method => (
              <View
                key={method}
                className={classnames(styles.pickerItem, treatmentMethod === method && styles.pickerItemActive)}
                onClick={() => setTreatmentMethod(method)}
              >
                <Text>{method}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className={styles.formRow}>
          <Text className={styles.formLabel}>达标结果</Text>
          <View className={styles.resultSelector}>
            <View
              className={classnames(styles.resultButton, styles.resultButtonPass, result === 'pass' && styles.resultButtonPassActive)}
              onClick={() => setResult('pass')}
            >
              <Text>达标</Text>
            </View>
            <View
              className={classnames(styles.resultButton, styles.resultButtonFail, result === 'fail' && styles.resultButtonFailActive)}
              onClick={() => setResult('fail')}
            >
              <Text>超标</Text>
            </View>
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

        <View className={styles.standardTip}>
          <Text className={styles.standardTipText}>
            排放标准（GB 21900-2008）：{'\n'}总铬 ≤ 1.0mg/L，六价铬 ≤ 0.5mg/L
          </Text>
        </View>

        <View className={styles.submitButton} onClick={handleSubmit}>
          <Text className={styles.submitButtonText}>保存记录</Text>
        </View>
      </View>

      {wastewaterRecords.map(record => (
        <View className={styles.recordCard} key={record.id}>
          <View className={styles.recordHeader}>
            <Text className={styles.recordId}>{record.treatmentMethod} · {record.id}</Text>
            <Text className={classnames(record.result === 'pass' ? styles.statusPass : styles.statusFail)}>
              {record.result === 'pass' ? '达标' : '超标'}
            </Text>
          </View>
          <View className={styles.recordDetail}>
            <Text
              className={classnames(
                record.chromiumContent > 1.0 ? styles.chromiumHighlight : styles.chromiumNormal
              )}
            >
              铬 {record.chromiumContent}mg/L
            </Text>
            <Text className={styles.detailItem}>排放 {record.dischargeVolume}t</Text>
            <Text className={styles.detailItem}>{record.operator}</Text>
            <Text className={styles.detailItem}>{record.date}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default WastewaterPage;
