import React, { useState, useMemo } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import RecordItem from '@/components/RecordItem';
import SearchFilter from '@/components/SearchFilter';
import type { FilterOption } from '@/components/SearchFilter';
import { usePlatingStore } from '@/store/plating';
import styles from './index.module.scss';

const tabs = ['挂具检查', '退镀返工', '废水处理'];

const rackStatusFilters: FilterOption[] = [
  { key: 'all', label: '全部' },
  { key: 'good', label: '良好' },
  { key: 'poor', label: '不良' },
  { key: 'failed', label: '失效' },
];

const reworkStatusFilters: FilterOption[] = [
  { key: 'all', label: '全部' },
  { key: 'pending', label: '待处理' },
  { key: 'processing', label: '处理中' },
  { key: 'completed', label: '已完成' },
];

const wastewaterStatusFilters: FilterOption[] = [
  { key: 'all', label: '全部' },
  { key: 'pass', label: '达标' },
  { key: 'fail', label: '超标' },
];

const ManagePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const rackInspections = usePlatingStore(state => state.rackInspections);
  const reworkRecords = usePlatingStore(state => state.reworkRecords);
  const wastewaterRecords = usePlatingStore(state => state.wastewaterRecords);

  const handleAdd = () => {
    const paths = ['/pages/rack/index', '/pages/rework/index', '/pages/wastewater/index'];
    Taro.navigateTo({ url: paths[activeTab] });
  };

  const goToDetail = (type: string, id: string) => {
    Taro.navigateTo({
      url: `/pages/record-detail/index?type=${type}&id=${id}&fromTab=manage`,
    });
  };

  const handleClear = () => {
    setSearchText('');
    setStatusFilter('all');
  };

  const filteredRack = useMemo(() => {
    return rackInspections.filter(r => {
      const matchSearch = !searchText
        || r.rackId.includes(searchText)
        || r.inspector.includes(searchText)
        || r.id.includes(searchText);
      const matchStatus = statusFilter === 'all' || r.conductivity === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [rackInspections, searchText, statusFilter]);

  const filteredRework = useMemo(() => {
    return reworkRecords.filter(r => {
      const matchSearch = !searchText
        || r.workpieceId.includes(searchText)
        || r.operator.includes(searchText)
        || r.reason.includes(searchText)
        || r.id.includes(searchText);
      const matchStatus = statusFilter === 'all' || r.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [reworkRecords, searchText, statusFilter]);

  const filteredWastewater = useMemo(() => {
    return wastewaterRecords.filter(r => {
      const matchSearch = !searchText
        || r.treatmentMethod.includes(searchText)
        || r.operator.includes(searchText)
        || r.id.includes(searchText);
      const matchStatus = statusFilter === 'all' || r.result === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [wastewaterRecords, searchText, statusFilter]);

  const wastewaterPassRate = filteredWastewater.length > 0
    ? Math.round((filteredWastewater.filter(r => r.result === 'pass').length / filteredWastewater.length) * 100)
    : 0;

  const getCurrentFilters = () => {
    switch (activeTab) {
      case 0: return rackStatusFilters;
      case 1: return reworkStatusFilters;
      case 2: return wastewaterStatusFilters;
      default: return [];
    }
  };

  const getSearchPlaceholder = () => {
    switch (activeTab) {
      case 0: return '搜索挂具编号、检查员、编号';
      case 1: return '搜索工件编号、原因、操作员';
      case 2: return '搜索处理方式、操作员、编号';
      default: return '搜索...';
    }
  };

  const renderRack = () => (
    <View>
      <View className={styles.summaryCards}>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{filteredRack.filter(r => r.conductivity === 'good').length}</Text>
          <Text className={styles.summaryLabel}>导电良好</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{filteredRack.filter(r => r.conductivity === 'poor').length}</Text>
          <Text className={styles.summaryLabel}>导电不良</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{filteredRack.filter(r => r.conductivity === 'failed').length}</Text>
          <Text className={styles.summaryLabel}>导电失效</Text>
        </View>
      </View>

      <View className={styles.sectionHeader}>
        <View className={styles.sectionDot} style={{ background: '#00b894' }} />
        <Text className={styles.sectionTitle}>挂具导电检查</Text>
        <Text className={styles.sectionCount}>共{filteredRack.length}条</Text>
      </View>
      {filteredRack.map(record => (
        <RecordItem
          key={record.id}
          title={`${record.rackId} · 挂具检查`}
          subtitle={`${record.inspector} | ${record.date}`}
          tags={[
            { text: record.conductivity === 'good' ? '良好' : record.conductivity === 'poor' ? '不良' : '失效', type: record.conductivity === 'good' ? 'pass' : record.conductivity === 'poor' ? 'warning' : 'fail' },
            { text: `${record.contactResistance}mΩ`, type: 'info' },
          ]}
          rightText={`下次${record.nextInspectionDate.slice(5)}`}
          onClick={() => goToDetail('rack', record.id)}
        />
      ))}
      {filteredRack.length === 0 && (
        <View className={styles.emptyState}>
          <Text className={styles.emptyText}>暂无相关记录</Text>
        </View>
      )}
    </View>
  );

  const renderRework = () => (
    <View>
      <View className={styles.summaryCards}>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{filteredRework.filter(r => r.status === 'pending').length}</Text>
          <Text className={styles.summaryLabel}>待处理</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{filteredRework.filter(r => r.status === 'processing').length}</Text>
          <Text className={styles.summaryLabel}>处理中</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{filteredRework.filter(r => r.status === 'completed').length}</Text>
          <Text className={styles.summaryLabel}>已完成</Text>
        </View>
      </View>

      <View className={styles.sectionHeader}>
        <View className={styles.sectionDot} style={{ background: '#f53f3f' }} />
        <Text className={styles.sectionTitle}>退镀返工记录</Text>
        <Text className={styles.sectionCount}>共{filteredRework.length}条</Text>
      </View>
      {filteredRework.map(record => (
        <RecordItem
          key={record.id}
          title={`${record.workpieceId} · ${record.reworkType === 'stripping' ? '退镀' : '返镀'}`}
          subtitle={`${record.operator} | ${record.date}`}
          tags={[
            { text: record.status === 'pending' ? '待处理' : record.status === 'processing' ? '处理中' : '已完成', type: record.status },
            { text: record.method, type: 'info' },
          ]}
          rightText={record.reason}
          onClick={() => goToDetail('rework', record.id)}
        />
      ))}
      {filteredRework.length === 0 && (
        <View className={styles.emptyState}>
          <Text className={styles.emptyText}>暂无相关记录</Text>
        </View>
      )}
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
          <Text className={styles.summaryValue}>{filteredWastewater.length}</Text>
          <Text className={styles.summaryLabel}>排放记录</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{filteredWastewater.filter(r => r.result === 'pass').length}</Text>
          <Text className={styles.summaryLabel}>达标</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{filteredWastewater.filter(r => r.result === 'fail').length}</Text>
          <Text className={styles.summaryLabel}>超标</Text>
        </View>
      </View>

      <View className={styles.sectionHeader}>
        <View className={styles.sectionDot} style={{ background: '#0984e3' }} />
        <Text className={styles.sectionTitle}>含铬废水排放记录</Text>
        <Text className={styles.sectionCount}>共{filteredWastewater.length}条</Text>
      </View>
      {filteredWastewater.map(record => (
        <RecordItem
          key={record.id}
          title={`${record.treatmentMethod} · ${record.id}`}
          subtitle={`${record.operator} | ${record.date}`}
          tags={[
            { text: record.result === 'pass' ? '达标' : '超标', type: record.result },
            { text: `${record.chromiumContent}mg/L`, type: 'info' },
          ]}
          rightText={`${record.dischargeVolume}t`}
          onClick={() => goToDetail('wastewater', record.id)}
        />
      ))}
      {filteredWastewater.length === 0 && (
        <View className={styles.emptyState}>
          <Text className={styles.emptyText}>暂无相关记录</Text>
        </View>
      )}
    </View>
  );

  const handleTabChange = (idx: number) => {
    setActiveTab(idx);
    setSearchText('');
    setStatusFilter('all');
  };

  return (
    <View className={styles.container}>
      <View className={styles.tabRow}>
        {tabs.map((tab, idx) => (
          <View
            key={tab}
            className={classnames(styles.tabItem, activeTab === idx && styles.tabItemActive)}
            onClick={() => handleTabChange(idx)}
          >
            <Text className={classnames(styles.tabText, activeTab === idx && styles.tabTextActive)}>{tab}</Text>
          </View>
        ))}
      </View>

      <SearchFilter
        searchPlaceholder={getSearchPlaceholder()}
        searchValue={searchText}
        onSearchChange={setSearchText}
        filterOptions={getCurrentFilters()}
        filterValue={statusFilter}
        onFilterChange={setStatusFilter}
        onClear={handleClear}
      />

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
