import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import RecordItem from '@/components/RecordItem';
import { usePlatingStore } from '@/store/plating';
import styles from './index.module.scss';

const tabs = ['前处理', '镀种工艺', '槽液管理'];

const ProductionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const degreasingRecords = usePlatingStore(state => state.degreasingRecords);
  const picklingRecords = usePlatingStore(state => state.picklingRecords);
  const chromeRecords = usePlatingStore(state => state.chromeRecords);
  const nickelRecords = usePlatingStore(state => state.nickelRecords);
  const bathAnalyses = usePlatingStore(state => state.bathAnalyses);

  const handleAdd = () => {
    const paths = ['/pages/degreasing/index', '/pages/chrome/index', '/pages/bath/index'];
    Taro.navigateTo({ url: paths[activeTab] });
  };

  const renderPreTreatment = () => (
    <View>
      <View className={styles.summaryCards}>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{degreasingRecords.length}</Text>
          <Text className={styles.summaryLabel}>除油记录</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{picklingRecords.length}</Text>
          <Text className={styles.summaryLabel}>酸洗记录</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>
            {degreasingRecords.filter(r => r.status === 'fail').length + picklingRecords.filter(r => r.status === 'fail').length}
          </Text>
          <Text className={styles.summaryLabel}>异常项</Text>
        </View>
      </View>

      <View className={styles.sectionHeader}>
        <View className={styles.sectionDot} />
        <Text className={styles.sectionTitle}>除油除锈记录</Text>
      </View>
      {degreasingRecords.slice(0, 5).map(record => (
        <RecordItem
          key={record.id}
          title={`${record.method} · ${record.id}`}
          subtitle={`${record.operator} | ${record.date}`}
          tags={[{ text: `${record.temperature}℃`, type: 'info' }, { text: record.status === 'pass' ? '合格' : '不合格', type: record.status }]}
          rightText={`${record.duration}min`}
        />
      ))}

      <View className={styles.sectionHeader} style={{ marginTop: '32rpx' }}>
        <View className={styles.sectionDot} />
        <Text className={styles.sectionTitle}>酸洗活化记录</Text>
      </View>
      {picklingRecords.slice(0, 5).map(record => (
        <RecordItem
          key={record.id}
          title={`${record.acidType}酸洗 · ${record.id}`}
          subtitle={`${record.operator} | ${record.date}`}
          tags={[{ text: `${record.concentration}%`, type: 'info' }, { text: record.status === 'pass' ? '合格' : '不合格', type: record.status }]}
          rightText={`${record.duration}min`}
        />
      ))}
    </View>
  );

  const renderPlating = () => (
    <View>
      <View className={styles.summaryCards}>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{chromeRecords.length}</Text>
          <Text className={styles.summaryLabel}>镀铬批次</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{nickelRecords.length}</Text>
          <Text className={styles.summaryLabel}>镀镍批次</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>2</Text>
          <Text className={styles.summaryLabel}>镀种</Text>
        </View>
      </View>

      <View className={styles.sectionHeader}>
        <View className={styles.sectionDot} style={{ background: '#d4a84b' }} />
        <Text className={styles.sectionTitle}>镀铬工艺</Text>
      </View>
      {chromeRecords.slice(0, 5).map(record => (
        <RecordItem
          key={record.id}
          title={`镀铬 · ${record.id}`}
          subtitle={`${record.operator} | ${record.date}`}
          tags={[{ text: `${record.currentDensity}A/dm²`, type: 'info' }, { text: `${record.temperature}℃`, type: 'info' }]}
          rightText={`${record.platingTime}min`}
          rightSubText={`目标${record.targetThickness}μm`}
        />
      ))}

      <View className={styles.sectionHeader} style={{ marginTop: '32rpx' }}>
        <View className={styles.sectionDot} style={{ background: '#8b9daf' }} />
        <Text className={styles.sectionTitle}>镀镍工艺</Text>
      </View>
      {nickelRecords.slice(0, 5).map(record => (
        <RecordItem
          key={record.id}
          title={`镀镍 · ${record.id}`}
          subtitle={`${record.operator} | ${record.date}`}
          tags={[{ text: `光亮剂${record.brightenerAdded}ml`, type: 'info' }, { text: `${record.currentDensity}A/dm²`, type: 'info' }]}
          rightText={`${record.platingTime}min`}
        />
      ))}
    </View>
  );

  const renderBath = () => (
    <View>
      <View className={styles.summaryCards}>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{bathAnalyses.filter(b => b.status === 'normal').length}</Text>
          <Text className={styles.summaryLabel}>正常项</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{bathAnalyses.filter(b => b.status === 'warning').length}</Text>
          <Text className={styles.summaryLabel}>预警项</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{bathAnalyses.filter(b => b.status === 'abnormal').length}</Text>
          <Text className={styles.summaryLabel}>异常项</Text>
        </View>
      </View>

      <View className={styles.sectionHeader}>
        <View className={styles.sectionDot} />
        <Text className={styles.sectionTitle}>槽液成分分析</Text>
      </View>
      {bathAnalyses.map(record => (
        <RecordItem
          key={record.id}
          title={`${record.bathType} · ${record.component}`}
          subtitle={`${record.analyst} | ${record.date}`}
          tags={[{ text: record.status === 'normal' ? '正常' : record.status === 'warning' ? '预警' : '异常', type: record.status === 'normal' ? 'pass' : record.status === 'warning' ? 'warning' : 'fail' }]}
          rightText={`${record.concentration}`}
          rightSubText={`标准${record.standardMin}-${record.standardMax}`}
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

      {activeTab === 0 && renderPreTreatment()}
      {activeTab === 1 && renderPlating()}
      {activeTab === 2 && renderBath()}

      <View className={styles.addButton} onClick={handleAdd}>
        <Text className={styles.addButtonText}>+ 新增记录</Text>
      </View>
    </View>
  );
};

export default ProductionPage;
