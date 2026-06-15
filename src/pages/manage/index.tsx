import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import RecordItem from '@/components/RecordItem';
import { rackInspections, reworkRecords, wastewaterRecords } from '@/data/plating';
import styles from './index.module.scss';

const tabs = ['挂具检查', '退镀返工', '废水处理'];

const ManagePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleAdd = () => {
    const paths = ['/pages/rack/index', '/pages/rework/index', '/pages/wastewater/index'];
    Taro.navigateTo({ url: paths[activeTab] });
  };

  const wastewaterPassRate = Math.round(
    (wastewaterRecords.filter(r => r.result === 'pass').length / wastewaterRecords.length) * 100
  );

  const renderRack = () => (
    <View>
      <View className={styles.summaryCards}>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{rackInspections.filter(r => r.conductivity === 'good').length}</Text>
          <Text className={styles.summaryLabel}>导电良好</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{rackInspections.filter(r => r.conductivity === 'poor').length}</Text>
          <Text className={styles.summaryLabel}>导电不良</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{rackInspections.filter(r => r.conductivity === 'failed').length}</Text>
          <Text className={styles.summaryLabel}>导电失效</Text>
        </View>
      </View>

      <View className={styles.sectionHeader}>
        <View className={styles.sectionDot} style={{ background: '#00b894' }} />
        <Text className={styles.sectionTitle}>挂具导电检查</Text>
      </View>
      {rackInspections.map(record => (
        <RecordItem
          key={record.id}
          title={`${record.rackId} · 挂具检查`}
          subtitle={`${record.inspector} | ${record.date}`}
          tags={[
            { text: record.conductivity === 'good' ? '良好' : record.conductivity === 'poor' ? '不良' : '失效', type: record.conductivity === 'good' ? 'pass' : record.conductivity === 'poor' ? 'warning' : 'fail' },
            { text: `${record.contactResistance}mΩ`, type: 'info' },
          ]}
          rightText={`下次${record.nextInspectionDate.slice(5)}`}
        />
      ))}
    </View>
  );

  const renderRework = () => (
    <View>
      <View className={styles.summaryCards}>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{reworkRecords.filter(r => r.status === 'pending').length}</Text>
          <Text className={styles.summaryLabel}>待处理</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{reworkRecords.filter(r => r.status === 'processing').length}</Text>
          <Text className={styles.summaryLabel}>处理中</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{reworkRecords.filter(r => r.status === 'completed').length}</Text>
          <Text className={styles.summaryLabel}>已完成</Text>
        </View>
      </View>

      <View className={styles.sectionHeader}>
        <View className={styles.sectionDot} style={{ background: '#f53f3f' }} />
        <Text className={styles.sectionTitle}>退镀返工记录</Text>
      </View>
      {reworkRecords.map(record => (
        <RecordItem
          key={record.id}
          title={`${record.workpieceId} · ${record.reworkType === 'stripping' ? '退镀' : '返镀'}`}
          subtitle={`${record.operator} | ${record.date}`}
          tags={[
            { type: record.status },
            { text: record.method, type: 'info' },
          ]}
          rightText={record.reason}
        />
      ))}
    </View>
  );

  const renderWastewater = () => (
    <View>
      <View className={styles.complianceCard}>
        <View className={styles.complianceHeader}>
          <Text className={styles.complianceTitle}>含铬废水排放达标率</Text>
          <Text className={classnames(styles.complianceStatus, wastewaterPassRate < 100 && styles.statusFail)}>
            {wastewaterPassRate}%
          </Text>
        </View>
        <Text className={styles.complianceDesc}>
          排放标准：总铬 ≤ 1.0mg/L，六价铬 ≤ 0.5mg/L（GB 21900-2008）
        </Text>
      </View>

      <View className={styles.summaryCards}>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{wastewaterRecords.length}</Text>
          <Text className={styles.summaryLabel}>排放记录</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{wastewaterRecords.filter(r => r.result === 'pass').length}</Text>
          <Text className={styles.summaryLabel}>达标</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{wastewaterRecords.filter(r => r.result === 'fail').length}</Text>
          <Text className={styles.summaryLabel}>超标</Text>
        </View>
      </View>

      <View className={styles.sectionHeader}>
        <View className={styles.sectionDot} style={{ background: '#0984e3' }} />
        <Text className={styles.sectionTitle}>含铬废水排放记录</Text>
      </View>
      {wastewaterRecords.map(record => (
        <RecordItem
          key={record.id}
          title={`${record.treatmentMethod} · ${record.id}`}
          subtitle={`${record.operator} | ${record.date}`}
          tags={[
            { text: record.result === 'pass' ? '达标' : '超标', type: record.result },
            { text: `${record.chromiumContent}mg/L`, type: 'info' },
          ]}
          rightText={`${record.dischargeVolume}t`}
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

      {activeTab === 0 && renderRack()}
      {activeTab === 1 && renderRework()}
      {activeTab === 2 && renderWastewater()}

      <View className={styles.addButton} onClick={handleAdd}>
        <Text className={styles.addButtonText}>+ 新增记录</Text>
      </View>
    </View>
  );
};

export default ManagePage;
