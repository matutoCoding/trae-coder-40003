import React, { useState, useMemo } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import RecordItem from '@/components/RecordItem';
import SearchFilter from '@/components/SearchFilter';
import type { FilterOption } from '@/components/SearchFilter';
import { usePlatingStore } from '@/store/plating';
import styles from './index.module.scss';

const tabs = ['镀层厚度', '结合力试验', '盐雾试验'];

const statusFilters: FilterOption[] = [
  { key: 'all', label: '全部' },
  { key: 'pass', label: '合格' },
  { key: 'fail', label: '不合格' },
];

const QualityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const thicknessMeasurements = usePlatingStore(state => state.thicknessMeasurements);
  const bondTests = usePlatingStore(state => state.bondTests);
  const saltSprayTests = usePlatingStore(state => state.saltSprayTests);

  const handleAdd = () => {
    const paths = ['/pages/thickness/index', '/pages/bond/index', '/pages/salt-spray/index'];
    Taro.navigateTo({ url: paths[activeTab] });
  };

  const goToDetail = (type: string, id: string) => {
    Taro.navigateTo({
      url: `/pages/record-detail/index?type=${type}&id=${id}&fromTab=quality`,
    });
  };

  const handleClear = () => {
    setSearchText('');
    setStatusFilter('all');
  };

  const filteredThickness = useMemo(() => {
    return thicknessMeasurements.filter(r => {
      const matchSearch = !searchText
        || r.workpieceId.includes(searchText)
        || r.inspector.includes(searchText)
        || r.id.includes(searchText);
      const matchStatus = statusFilter === 'all' || r.result === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [thicknessMeasurements, searchText, statusFilter]);

  const filteredBond = useMemo(() => {
    return bondTests.filter(r => {
      const matchSearch = !searchText
        || r.workpieceId.includes(searchText)
        || r.testMethod.includes(searchText)
        || r.inspector.includes(searchText)
        || r.id.includes(searchText);
      const matchStatus = statusFilter === 'all' || r.result === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [bondTests, searchText, statusFilter]);

  const filteredSaltSpray = useMemo(() => {
    return saltSprayTests.filter(r => {
      const matchSearch = !searchText
        || r.workpieceId.includes(searchText)
        || r.inspector.includes(searchText)
        || r.id.includes(searchText);
      const matchStatus = statusFilter === 'all' || r.result === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [saltSprayTests, searchText, statusFilter]);

  const thicknessPassRate = filteredThickness.length > 0
    ? Math.round((filteredThickness.filter(r => r.result === 'pass').length / filteredThickness.length) * 100)
    : 0;
  const bondPassRate = filteredBond.length > 0
    ? Math.round((filteredBond.filter(r => r.result === 'pass').length / filteredBond.length) * 100)
    : 0;
  const saltPassRate = filteredSaltSpray.length > 0
    ? Math.round((filteredSaltSpray.filter(r => r.result === 'pass').length / filteredSaltSpray.length) * 100)
    : 0;

  const renderThickness = () => (
    <View>
      <SearchFilter
        searchPlaceholder="搜索工件编号、检验员、编号"
        searchValue={searchText}
        onSearchChange={setSearchText}
        filterOptions={statusFilters}
        filterValue={statusFilter}
        onFilterChange={setStatusFilter}
        onClear={handleClear}
      />

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
          <Text className={styles.summaryValue}>{filteredThickness.length}</Text>
          <Text className={styles.summaryLabel}>检测总数</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{filteredThickness.filter(r => r.result === 'pass').length}</Text>
          <Text className={styles.summaryLabel}>合格</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{filteredThickness.filter(r => r.result === 'fail').length}</Text>
          <Text className={styles.summaryLabel}>不合格</Text>
        </View>
      </View>

      <View className={styles.sectionHeader}>
        <View className={styles.sectionDot} />
        <Text className={styles.sectionTitle}>镀层厚度记录</Text>
        <Text className={styles.sectionCount}>共{filteredThickness.length}条</Text>
      </View>
      {filteredThickness.map(record => (
        <RecordItem
          key={record.id}
          title={`${record.workpieceId} · ${record.platingType === 'chrome' ? '镀铬' : '镀镍'}`}
          subtitle={`${record.inspector} | ${record.date}`}
          tags={[{ text: `${record.thickness}μm`, type: 'info' }, { text: record.result === 'pass' ? '合格' : '不合格', type: record.result }]}
          rightText={`标准${record.standardMin}-${record.standardMax}μm`}
          onClick={() => goToDetail('thickness', record.id)}
        />
      ))}
      {filteredThickness.length === 0 && (
        <View className={styles.emptyState}>
          <Text className={styles.emptyText}>暂无相关记录</Text>
        </View>
      )}
    </View>
  );

  const renderBond = () => (
    <View>
      <SearchFilter
        searchPlaceholder="搜索工件编号、试验方式、检验员"
        searchValue={searchText}
        onSearchChange={setSearchText}
        filterOptions={statusFilters}
        filterValue={statusFilter}
        onFilterChange={setStatusFilter}
        onClear={handleClear}
      />

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
          <Text className={styles.summaryValue}>{filteredBond.length}</Text>
          <Text className={styles.summaryLabel}>试验总数</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{filteredBond.filter(r => r.result === 'pass').length}</Text>
          <Text className={styles.summaryLabel}>合格</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{filteredBond.filter(r => r.result === 'fail').length}</Text>
          <Text className={styles.summaryLabel}>不合格</Text>
        </View>
      </View>

      <View className={styles.sectionHeader}>
        <View className={styles.sectionDot} style={{ background: '#fdcb6e' }} />
        <Text className={styles.sectionTitle}>结合力试验记录</Text>
        <Text className={styles.sectionCount}>共{filteredBond.length}条</Text>
      </View>
      {filteredBond.map(record => (
        <RecordItem
          key={record.id}
          title={`${record.workpieceId} · ${record.testMethod}`}
          subtitle={`${record.inspector} | ${record.date}`}
          tags={[{ text: record.result === 'pass' ? '合格' : '不合格', type: record.result }]}
          rightText={record.description}
          onClick={() => goToDetail('bond', record.id)}
        />
      ))}
      {filteredBond.length === 0 && (
        <View className={styles.emptyState}>
          <Text className={styles.emptyText}>暂无相关记录</Text>
        </View>
      )}
    </View>
  );

  const renderSaltSpray = () => (
    <View>
      <SearchFilter
        searchPlaceholder="搜索工件编号、检验员、编号"
        searchValue={searchText}
        onSearchChange={setSearchText}
        filterOptions={statusFilters}
        filterValue={statusFilter}
        onFilterChange={setStatusFilter}
        onClear={handleClear}
      />

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
          <Text className={styles.summaryValue}>{filteredSaltSpray.length}</Text>
          <Text className={styles.summaryLabel}>试验总数</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{filteredSaltSpray.filter(r => r.result === 'pass').length}</Text>
          <Text className={styles.summaryLabel}>合格</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{filteredSaltSpray.filter(r => r.result === 'fail').length}</Text>
          <Text className={styles.summaryLabel}>不合格</Text>
        </View>
      </View>

      <View className={styles.sectionHeader}>
        <View className={styles.sectionDot} style={{ background: '#00cec9' }} />
        <Text className={styles.sectionTitle}>盐雾试验记录</Text>
        <Text className={styles.sectionCount}>共{filteredSaltSpray.length}条</Text>
      </View>
      {filteredSaltSpray.map(record => (
        <RecordItem
          key={record.id}
          title={`${record.workpieceId} · 盐雾试验`}
          subtitle={`${record.inspector} | ${record.date}`}
          tags={[{ text: `${record.duration}h`, type: 'info' }, { text: `评级${record.rating}`, type: 'info' }, { text: record.result === 'pass' ? '合格' : '不合格', type: record.result }]}
          onClick={() => goToDetail('saltSpray', record.id)}
        />
      ))}
      {filteredSaltSpray.length === 0 && (
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
