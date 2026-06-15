import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import RecordItem from '@/components/RecordItem';
import { usePlatingStore } from '@/store/plating';
import styles from './index.module.scss';

const tabs = ['镀层厚度', '结合力试验', '盐雾试验'];

const QualityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const thicknessMeasurements = usePlatingStore(state => state.thicknessMeasurements);
  const bondTests = usePlatingStore(state => state.bondTests);
  const saltSprayTests = usePlatingStore(state => state.saltSprayTests);

  const handleAdd = () => {
    const paths = ['/pages/thickness/index', '/pages/bond/index', '/pages/salt-spray/index'];
    Taro.navigateTo({ url: paths[activeTab] });
  };

  const thicknessPassRate = thicknessMeasurements.length > 0
    ? Math.round((thicknessMeasurements.filter(r => r.result === 'pass').length / thicknessMeasurements.length) * 100)
    : 0;
  const bondPassRate = bondTests.length > 0
    ? Math.round((bondTests.filter(r => r.result === 'pass').length / bondTests.length) * 100)
    : 0;
  const saltPassRate = saltSprayTests.length > 0
    ? Math.round((saltSprayTests.filter(r => r.result === 'pass').length / saltSprayTests.length) * 100)
    : 0;

  const renderThickness = () => (
    <View>
      <View className={styles.passRate}>
        <View className={styles.passRateHeader}>
          <Text className={styles.passRateTitle}>厚度检测合格率</Text>
          <Text className={styles.passRateValue}>{thicknessPassRate}%</Text>
        </View>
        <View className={styles.passRateBar}>
          <View className={styles.passRateFill} style={{ width: `${thicknessPassRate}%` }} />
        </View>
      </View>

      <View className={styles.summaryCards}>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{thicknessMeasurements.length}</Text>
          <Text className={styles.summaryLabel}>检测总数</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{thicknessMeasurements.filter(r => r.result === 'pass').length}</Text>
          <Text className={styles.summaryLabel}>合格</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{thicknessMeasurements.filter(r => r.result === 'fail').length}</Text>
          <Text className={styles.summaryLabel}>不合格</Text>
        </View>
      </View>

      <View className={styles.sectionHeader}>
        <View className={styles.sectionDot} />
        <Text className={styles.sectionTitle}>镀层厚度记录</Text>
      </View>
      {thicknessMeasurements.map(record => (
        <RecordItem
          key={record.id}
          title={`${record.workpieceId} · ${record.platingType === 'chrome' ? '镀铬' : '镀镍'}`}
          subtitle={`${record.inspector} | ${record.date}`}
          tags={[{ text: `${record.thickness}μm`, type: 'info' }, { text: record.result === 'pass' ? '合格' : '不合格', type: record.result }]}
          rightText={`标准${record.standardMin}-${record.standardMax}μm`}
        />
      ))}
    </View>
  );

  const renderBond = () => (
    <View>
      <View className={styles.passRate}>
        <View className={styles.passRateHeader}>
          <Text className={styles.passRateTitle}>结合力试验合格率</Text>
          <Text className={styles.passRateValue}>{bondPassRate}%</Text>
        </View>
        <View className={styles.passRateBar}>
          <View className={styles.passRateFill} style={{ width: `${bondPassRate}%` }} />
        </View>
      </View>

      <View className={styles.summaryCards}>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{bondTests.length}</Text>
          <Text className={styles.summaryLabel}>试验总数</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{bondTests.filter(r => r.result === 'pass').length}</Text>
          <Text className={styles.summaryLabel}>合格</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{bondTests.filter(r => r.result === 'fail').length}</Text>
          <Text className={styles.summaryLabel}>不合格</Text>
        </View>
      </View>

      <View className={styles.sectionHeader}>
        <View className={styles.sectionDot} style={{ background: '#fdcb6e' }} />
        <Text className={styles.sectionTitle}>结合力试验记录</Text>
      </View>
      {bondTests.map(record => (
        <RecordItem
          key={record.id}
          title={`${record.workpieceId} · ${record.testMethod}`}
          subtitle={`${record.inspector} | ${record.date}`}
          tags={[{ text: record.result === 'pass' ? '合格' : '不合格', type: record.result }]}
          rightText={record.description}
        />
      ))}
    </View>
  );

  const renderSaltSpray = () => (
    <View>
      <View className={styles.passRate}>
        <View className={styles.passRateHeader}>
          <Text className={styles.passRateTitle}>盐雾试验合格率</Text>
          <Text className={styles.passRateValue}>{saltPassRate}%</Text>
        </View>
        <View className={styles.passRateBar}>
          <View className={styles.passRateFill} style={{ width: `${saltPassRate}%` }} />
        </View>
      </View>

      <View className={styles.summaryCards}>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{saltSprayTests.length}</Text>
          <Text className={styles.summaryLabel}>试验总数</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{saltSprayTests.filter(r => r.result === 'pass').length}</Text>
          <Text className={styles.summaryLabel}>合格</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{saltSprayTests.filter(r => r.result === 'fail').length}</Text>
          <Text className={styles.summaryLabel}>不合格</Text>
        </View>
      </View>

      <View className={styles.sectionHeader}>
        <View className={styles.sectionDot} style={{ background: '#00cec9' }} />
        <Text className={styles.sectionTitle}>盐雾试验记录</Text>
      </View>
      {saltSprayTests.map(record => (
        <RecordItem
          key={record.id}
          title={`${record.workpieceId} · 盐雾试验`}
          subtitle={`${record.inspector} | ${record.date}`}
          tags={[{ text: `${record.duration}h`, type: 'info' }, { text: `评级${record.rating}`, type: 'info' }, { text: record.result === 'pass' ? '合格' : '不合格', type: record.result }]}
        />
      ))}
    </View>
  );

  return (
    <View className={styles.container}>
      <View className={styles.tabRow}>
        {tabs.map((tab, idx) => (
          <View
            key={tab}
            className={classnames(styles.tabItem, activeTab === idx && styles.tabItemActive)}
            onClick={() => setActiveTab(idx)}
          >
            <Text className={classnames(styles.tabText, activeTab === idx && styles.tabTextActive)}>{tab}</Text>
          </View>
        ))}
      </View>

      {activeTab === 0 && renderThickness()}
      {activeTab === 1 && renderBond()}
      {activeTab === 2 && renderSaltSpray()}

      <View className={styles.addButton} onClick={handleAdd}>
        <Text className={styles.addButtonText}>+ 新增记录</Text>
      </View>
    </View>
  );
};

export default QualityPage;
