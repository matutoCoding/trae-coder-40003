import React, { useMemo } from 'react';
import { View, Text } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import classnames from 'classnames';
import { usePlatingStore } from '@/store/plating';
import {
  DegreasingRecord,
  PicklingRecord,
  ChromeRecord,
  NickelRecord,
  BathAnalysis,
  RackInspection,
  ThicknessMeasurement,
  BondTest,
  SaltSprayTest,
  ReworkRecord,
  WastewaterRecord,
} from '@/types/plating';
import styles from './index.module.scss';

type RecordType =
  | 'degreasing'
  | 'pickling'
  | 'chrome'
  | 'nickel'
  | 'bath'
  | 'rack'
  | 'thickness'
  | 'bond'
  | 'saltSpray'
  | 'rework'
  | 'wastewater';

const typeNameMap: Record<RecordType, string> = {
  degreasing: '除油除锈',
  pickling: '酸洗活化',
  chrome: '镀铬工艺',
  nickel: '镀镍工艺',
  bath: '槽液分析',
  rack: '挂具检查',
  thickness: '镀层厚度',
  bond: '结合力试验',
  saltSpray: '盐雾试验',
  rework: '退镀返工',
  wastewater: '废水处理',
};

interface DetailField {
  label: string;
  value: string;
  type?: 'text' | 'status';
  statusType?: 'pass' | 'fail' | 'warning' | 'info';
}

const RecordDetailPage: React.FC = () => {
  const router = useRouter();
  const recordType = (router.params.type as RecordType) || 'degreasing';
  const recordId = router.params.id || '';
  const fromTab = router.params.fromTab || '';

  const store = usePlatingStore();

  const record = useMemo(() => {
    const recordsMap: Record<RecordType, any[]> = {
      degreasing: store.degreasingRecords,
      pickling: store.picklingRecords,
      chrome: store.chromeRecords,
      nickel: store.nickelRecords,
      bath: store.bathAnalyses,
      rack: store.rackInspections,
      thickness: store.thicknessMeasurements,
      bond: store.bondTests,
      saltSpray: store.saltSprayTests,
      rework: store.reworkRecords,
      wastewater: store.wastewaterRecords,
    };
    return recordsMap[recordType]?.find(r => r.id === recordId);
  }, [store, recordType, recordId]);

  const title = useMemo(() => {
    if (!record) return typeNameMap[recordType];
    switch (recordType) {
      case 'degreasing': return `${(record as DegreasingRecord).method} · ${record.id}`;
      case 'pickling': return `${(record as PicklingRecord).acidType}酸洗 · ${record.id}`;
      case 'chrome': return `镀铬 · ${record.id}`;
      case 'nickel': return `镀镍 · ${record.id}`;
      case 'bath': return `${(record as BathAnalysis).bathType} · ${(record as BathAnalysis).component}`;
      case 'rack': return `${(record as RackInspection).rackId} · 挂具检查`;
      case 'thickness': return `${(record as ThicknessMeasurement).workpieceId} · ${(record as ThicknessMeasurement).platingType === 'chrome' ? '镀铬' : '镀镍'}`;
      case 'bond': return `${(record as BondTest).workpieceId} · ${(record as BondTest).testMethod}`;
      case 'saltSpray': return `${(record as SaltSprayTest).workpieceId} · 盐雾试验`;
      case 'rework': return `${(record as ReworkRecord).workpieceId} · ${(record as ReworkRecord).reworkType === 'stripping' ? '退镀' : '返镀'}`;
      case 'wastewater': return `${(record as WastewaterRecord).treatmentMethod} · ${record.id}`;
      default: return record.id;
    }
  }, [record, recordType]);

  const subtitle = useMemo(() => {
    if (!record) return '';
    switch (recordType) {
      case 'degreasing': return (record as DegreasingRecord).operator;
      case 'pickling': return (record as PicklingRecord).operator;
      case 'chrome': return (record as ChromeRecord).operator;
      case 'nickel': return (record as NickelRecord).operator;
      case 'bath': return (record as BathAnalysis).analyst;
      case 'rack': return (record as RackInspection).inspector;
      case 'thickness': return (record as ThicknessMeasurement).inspector;
      case 'bond': return (record as BondTest).inspector;
      case 'saltSpray': return (record as SaltSprayTest).inspector;
      case 'rework': return (record as ReworkRecord).operator;
      case 'wastewater': return (record as WastewaterRecord).operator;
      default: return '';
    }
  }, [record, recordType]);

  const detailFields = useMemo((): DetailField[] => {
    if (!record) return [];
    switch (recordType) {
      case 'degreasing': {
        const r = record as DegreasingRecord;
        return [
          { label: '记录编号', value: r.id },
          { label: '除油方式', value: r.method },
          { label: '温度', value: `${r.temperature}℃` },
          { label: '时长', value: `${r.duration}min` },
          { label: '操作员', value: r.operator },
          { label: '状态', value: r.status === 'pass' ? '合格' : '不合格', type: 'status', statusType: r.status },
          { label: '创建时间', value: r.date },
        ];
      }
      case 'pickling': {
        const r = record as PicklingRecord;
        return [
          { label: '记录编号', value: r.id },
          { label: '酸洗类型', value: r.acidType },
          { label: '浓度', value: `${r.concentration}%` },
          { label: '活化时长', value: `${r.duration}min` },
          { label: '操作员', value: r.operator },
          { label: '状态', value: r.status === 'pass' ? '合格' : '不合格', type: 'status', statusType: r.status },
          { label: '创建时间', value: r.date },
        ];
      }
      case 'chrome': {
        const r = record as ChromeRecord;
        return [
          { label: '记录编号', value: r.id },
          { label: '镀种', value: '镀铬' },
          { label: '电流密度', value: `${r.currentDensity}A/dm²` },
          { label: '槽液温度', value: `${r.temperature}℃` },
          { label: '电镀时间', value: `${r.platingTime}min` },
          { label: '目标厚度', value: `${r.targetThickness}μm` },
          { label: '操作员', value: r.operator },
          { label: '创建时间', value: r.date },
        ];
      }
      case 'nickel': {
        const r = record as NickelRecord;
        return [
          { label: '记录编号', value: r.id },
          { label: '镀种', value: '镀镍' },
          { label: '光亮剂添加', value: `${r.brightenerAdded}ml/L` },
          { label: '电流密度', value: `${r.currentDensity}A/dm²` },
          { label: '槽液温度', value: `${r.temperature}℃` },
          { label: '电镀时间', value: `${r.platingTime}min` },
          { label: '操作员', value: r.operator },
          { label: '创建时间', value: r.date },
        ];
      }
      case 'bath': {
        const r = record as BathAnalysis;
        const statusMap = { normal: '正常', warning: '预警', abnormal: '异常' };
        const statusTypeMap = { normal: 'pass' as const, warning: 'warning' as const, abnormal: 'fail' as const };
        return [
          { label: '记录编号', value: r.id },
          { label: '槽液类型', value: r.bathType },
          { label: '分析成分', value: r.component },
          { label: '浓度', value: `${r.concentration}g/L` },
          { label: '标准范围', value: `${r.standardMin}-${r.standardMax}g/L` },
          { label: '状态', value: statusMap[r.status], type: 'status', statusType: statusTypeMap[r.status] },
          { label: '分析员', value: r.analyst },
          { label: '创建时间', value: r.date },
        ];
      }
      case 'rack': {
        const r = record as RackInspection;
        const condMap = { good: '良好', poor: '不良', failed: '失效' };
        const condTypeMap = { good: 'pass' as const, poor: 'warning' as const, failed: 'fail' as const };
        return [
          { label: '记录编号', value: r.id },
          { label: '挂具编号', value: r.rackId },
          { label: '接触电阻', value: `${r.contactResistance}mΩ` },
          { label: '导电状态', value: condMap[r.conductivity], type: 'status', statusType: condTypeMap[r.conductivity] },
          { label: '检查员', value: r.inspector },
          { label: '下次检查', value: r.nextInspectionDate },
          { label: '创建时间', value: r.date },
        ];
      }
      case 'thickness': {
        const r = record as ThicknessMeasurement;
        return [
          { label: '记录编号', value: r.id },
          { label: '工件编号', value: r.workpieceId },
          { label: '镀种类型', value: r.platingType === 'chrome' ? '镀铬' : '镀镍' },
          { label: '测量厚度', value: `${r.thickness}μm` },
          { label: '标准范围', value: `${r.standardMin}-${r.standardMax}μm` },
          { label: '结果', value: r.result === 'pass' ? '合格' : '不合格', type: 'status', statusType: r.result },
          { label: '检验员', value: r.inspector },
          { label: '创建时间', value: r.date },
        ];
      }
      case 'bond': {
        const r = record as BondTest;
        return [
          { label: '记录编号', value: r.id },
          { label: '工件编号', value: r.workpieceId },
          { label: '试验方式', value: r.testMethod },
          { label: '结果', value: r.result === 'pass' ? '合格' : '不合格', type: 'status', statusType: r.result },
          { label: '检验员', value: r.inspector },
          { label: '创建时间', value: r.date },
        ];
      }
      case 'saltSpray': {
        const r = record as SaltSprayTest;
        return [
          { label: '记录编号', value: r.id },
          { label: '工件编号', value: r.workpieceId },
          { label: '试验时长', value: `${r.duration}h` },
          { label: '评级', value: `${r.rating}级` },
          { label: '结果', value: r.result === 'pass' ? '合格' : '不合格', type: 'status', statusType: r.result },
          { label: '检验员', value: r.inspector },
          { label: '创建时间', value: r.date },
        ];
      }
      case 'rework': {
        const r = record as ReworkRecord;
        const statusMap = { pending: '待处理', processing: '处理中', completed: '已完成' };
        const statusTypeMap = { pending: 'warning' as const, processing: 'info' as const, completed: 'pass' as const };
        const fields: DetailField[] = [
          { label: '记录编号', value: r.id },
          { label: '工件编号', value: r.workpieceId },
          { label: '不合格原因', value: r.reason },
          { label: '类型', value: r.reworkType === 'stripping' ? '退镀' : '返镀' },
          { label: '处理方式', value: r.method },
          { label: '处理状态', value: statusMap[r.status], type: 'status', statusType: statusTypeMap[r.status] },
          { label: '操作员', value: r.operator },
          { label: '创建时间', value: r.date },
        ];
        if (r.sourceType) {
          const sourceNameMap: Record<string, string> = {
            thickness: '镀层厚度检测',
            bond: '结合力试验',
            saltSpray: '盐雾试验',
          };
          fields.push({ label: '来源', value: `${sourceNameMap[r.sourceType] || r.sourceType} · ${r.sourceId || ''}`, type: 'status', statusType: 'info' });
        }
        return fields;
      }
      case 'wastewater': {
        const r = record as WastewaterRecord;
        return [
          { label: '记录编号', value: r.id },
          { label: '铬含量', value: `${r.chromiumContent}mg/L`, type: 'status', statusType: r.chromiumContent > 1.0 ? 'fail' : 'pass' },
          { label: '排放量', value: `${r.dischargeVolume}t` },
          { label: '处理方式', value: r.treatmentMethod },
          { label: '结果', value: r.result === 'pass' ? '达标' : '超标', type: 'status', statusType: r.result },
          { label: '操作员', value: r.operator },
          { label: '创建时间', value: r.date },
        ];
      }
      default:
        return [];
    }
  }, [record, recordType]);

  const description = useMemo(() => {
    if (recordType === 'bond' && record) {
      return (record as BondTest).description;
    }
    if (recordType === 'rework' && record) {
      return (record as ReworkRecord).reason;
    }
    return '';
  }, [record, recordType]);

  const isUnqualifiedQuality = useMemo(() => {
    if (!record) return false;
    if (recordType === 'thickness') return (record as ThicknessMeasurement).result === 'fail';
    if (recordType === 'bond') return (record as BondTest).result === 'fail';
    if (recordType === 'saltSpray') return (record as SaltSprayTest).result === 'fail';
    return false;
  }, [record, recordType]);

  const handleRework = () => {
    if (!record) return;
    const r = record as ThicknessMeasurement | BondTest | SaltSprayTest;
    let reason = '';
    if (recordType === 'thickness') {
      reason = `镀层厚度不合格，测量${(r as ThicknessMeasurement).thickness}μm`;
    } else if (recordType === 'bond') {
      reason = `结合力试验不合格，${(r as BondTest).description || '试验未通过'}`;
    } else if (recordType === 'saltSpray') {
      reason = `盐雾试验不合格，评级${(r as SaltSprayTest).rating}级`;
    }
    const url = `/pages/rework/index?workpieceId=${encodeURIComponent(r.workpieceId)}&reason=${encodeURIComponent(reason)}&sourceType=${recordType}&sourceId=${r.id}`;
    Taro.navigateTo({ url });
  };

  const handleGoBack = () => {
    if (fromTab) {
      const tabMap: Record<string, string> = {
        production: '/pages/production/index',
        quality: '/pages/quality/index',
        manage: '/pages/manage/index',
      };
      Taro.navigateBack().catch(() => {
        Taro.switchTab({ url: tabMap[fromTab] || '/pages/home/index' });
      });
    } else {
      Taro.navigateBack();
    }
  };

  if (!record) {
    return (
      <View className={styles.container}>
        <View className={styles.headerCard}>
          <Text className={styles.headerTitle}>记录不存在</Text>
          <Text className={styles.headerSubtitle}>未找到对应的记录信息</Text>
        </View>
      </View>
    );
  }

  return (
    <View className={styles.container}>
      <View className={styles.headerCard}>
        <Text className={styles.headerTitle}>{title}</Text>
        <Text className={styles.headerSubtitle}>{subtitle}</Text>
        <View className={styles.headerBadge}>
          <Text>{typeNameMap[recordType]}</Text>
        </View>
      </View>

      <View className={styles.detailSection}>
        <Text className={styles.sectionTitle}>详细信息</Text>
        {detailFields.map((field, idx) => (
          <View className={styles.detailRow} key={idx}>
            <Text className={styles.detailLabel}>{field.label}</Text>
            {field.type === 'status' ? (
              <Text className={classnames(
                styles.detailValue,
                field.statusType === 'pass' && styles.statusPass,
                field.statusType === 'fail' && styles.statusFail,
                field.statusType === 'warning' && styles.statusWarning,
                field.statusType === 'info' && styles.statusInfo,
              )}>
                {field.value}
              </Text>
            ) : (
              <Text className={styles.detailValue}>{field.value}</Text>
            )}
          </View>
        ))}
      </View>

      {description && (
        <View className={styles.detailSection}>
          <Text className={styles.sectionTitle}>说明</Text>
          <View className={styles.descSection}>
            <Text className={styles.descText}>{description}</Text>
          </View>
        </View>
      )}

      {isUnqualifiedQuality && (
        <View className={styles.actionSection}>
          <View className={styles.actionButton} onClick={handleRework}>
            <Text className={styles.actionButtonText}>转退镀返工处理</Text>
          </View>
        </View>
      )}

      <View className={styles.actionSection}>
        <View className={classnames(styles.actionButton, styles.actionButtonSecondary)} onClick={handleGoBack}>
          <Text className={styles.actionButtonText}>返回列表</Text>
        </View>
      </View>
    </View>
  );
};

export default RecordDetailPage;
