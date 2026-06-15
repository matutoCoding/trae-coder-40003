import React, { useState, useMemo } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import RecordItem from '@/components/RecordItem';
import SearchFilter from '@/components/SearchFilter';
import type { FilterOption } from '@/components/SearchFilter';
import { usePlatingStore } from '@/store/plating';
import styles from './index.module.scss';

const tabs = ['前处理', '镀种工艺', '槽液管理'];

const statusFilters: FilterOption[] = [
  { key: 'all', label: '全部' },
  { key: 'pass', label: '合格' },
  { key: 'fail', label: '不合格' },
];

const bathStatusFilters: FilterOption[] = [
  { key: 'all', label: '全部' },
  { key: 'normal', label: '正常' },
  { key: 'warning', label: '预警' },
  { key: 'abnormal', label: '异常' },
];

const ProductionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const degreasingRecords = usePlatingStore(state => state.degreasingRecords);
  const picklingRecords = usePlatingStore(state => state.picklingRecords);
  const chromeRecords = usePlatingStore(state => state.chromeRecords);
  const nickelRecords = usePlatingStore(state => state.nickelRecords);
  const bathAnalyses = usePlatingStore(state => state.bathAnalyses);

  const handleAdd = () => {
    const paths = ['/pages/degreasing/index', '/pages/chrome/index', '/pages/bath/index'];
    Taro.navigateTo({ url: paths[activeTab] });
  };

  const goToDetail = (type: string, id: string) => {
    Taro.navigateTo({
      url: `/pages/record-detail/index?type=${type}&id=${id}&fromTab=production`,
    });
  };

  const handleClear = () => {
    setSearchText('');
    setStatusFilter('all');
  };

  const filteredDegreasing = useMemo(() => {
    return degreasingRecords.filter(r => {
      const matchSearch = !searchText
        || r.method.includes(searchText)
        || r.operator.includes(searchText)
        || r.id.includes(searchText);
      const matchStatus = statusFilter === 'all' || r.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [degreasingRecords, searchText, statusFilter]);

  const filteredPickling = useMemo(() => {
    return picklingRecords.filter(r => {
      const matchSearch = !searchText
        || r.acidType.includes(searchText)
        || r.operator.includes(searchText)
        || r.id.includes(searchText);
      const matchStatus = statusFilter === 'all' || r.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [picklingRecords, searchText, statusFilter]);

  const filteredChrome = useMemo(() => {
    return chromeRecords.filter(r => {
      const matchSearch = !searchText
        || r.operator.includes(searchText)
        || r.id.includes(searchText);
      return matchSearch;
    });
  }, [chromeRecords, searchText]);

  const filteredNickel = useMemo(() => {
    return nickelRecords.filter(r => {
      const matchSearch = !searchText
        || r.operator.includes(searchText)
        || r.id.includes(searchText);
      return matchSearch;
    });
  }, [nickelRecords, searchText]);

  const filteredBath = useMemo(() => {
    return bathAnalyses.filter(r => {
      const matchSearch = !searchText
        || r.bathType.includes(searchText)
        || r.component.includes(searchText)
        || r.analyst.includes(searchText)
        || r.id.includes(searchText);
      const matchStatus = statusFilter === 'all' || r.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [bathAnalyses, searchText, statusFilter]);

  const preTreatmentTotal = filteredDegreasing.length + filteredPickling.length;
  const platingTotal = filteredChrome.length + filteredNickel.length;

  const renderPreTreatment = () => (
    <View>
      <SearchFilter
        searchPlaceholder="搜索方式、操作员、编号"
        searchValue={searchText}
        onSearchChange={setSearchText}
        filterOptions={statusFilters}
        filterValue={statusFilter}
        onFilterChange={setStatusFilter}
        onClear={handleClear}
      />

      <View className={styles.summaryCards}>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{filteredDegreasing.length}</Text>
          <Text className={styles.summaryLabel}>除油记录</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{filteredPickling.length}</Text>
          <Text className={styles.summaryLabel}>酸洗记录</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>
            {filteredDegreasing.filter(r => r.status === 'fail').length + filteredPickling.filter(r => r.status === 'fail').length}
          </Text>
          <Text className={styles.summaryLabel}>异常项</Text>
        </View>
      </View>

      <View className={styles.sectionHeader}>
        <View className={styles.sectionDot} />
        <Text className={styles.sectionTitle}>除油除锈记录</Text>
        <Text className={styles.sectionCount}>共{filteredDegreasing.length}条</Text>
      </View>
      {filteredDegreasing.slice(0, 5).map(record => (
        <RecordItem
          key={record.id}
          title={`${record.method} · ${record.id}`}
          subtitle={`${record.operator} | ${record.date}`}
          tags={[{ text: `${record.temperature}℃`, type: 'info' }, { text: record.status === 'pass' ? '合格' : '不合格', type: record.status }]}
          rightText={`${record.duration}min`}
          onClick={() => goToDetail('degreasing', record.id)}
        />
      ))}
      {filteredDegreasing.length === 0 && (
        <View className={styles.emptyState}>
          <Text className={styles.emptyText}>暂无相关记录</Text>
        </View>
      )}

      <View className={styles.sectionHeader} style={{ marginTop: '32rpx' }}>
        <View className={styles.sectionDot} />
        <Text className={styles.sectionTitle}>酸洗活化记录</Text>
        <Text className={styles.sectionCount}>共{filteredPickling.length}条</Text>
      </View>
      {filteredPickling.slice(0, 5).map(record => (
        <RecordItem
          key={record.id}
          title={`${record.acidType}酸洗 · ${record.id}`}
          subtitle={`${record.operator} | ${record.date}`}
          tags={[{ text: `${record.concentration}%`, type: 'info' }, { text: record.status === 'pass' ? '合格' : '不合格', type: record.status }]}
          rightText={`${record.duration}min`}
          onClick={() => goToDetail('pickling', record.id)}
        />
      ))}
      {filteredPickling.length === 0 && (
        <View className={styles.emptyState}>
          <Text className={styles.emptyText}>暂无相关记录</Text>
        </View>
      )}
    </View>
  );

  const renderPlating = () => (
    <View>
      <SearchFilter
        searchPlaceholder="搜索操作员、编号"
        searchValue={searchText}
        onSearchChange={setSearchText}
        onClear={handleClear}
      />

      <View className={styles.summaryCards}>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{filteredChrome.length}</Text>
          <Text className={styles.summaryLabel}>镀铬批次</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{filteredNickel.length}</Text>
          <Text className={styles.summaryLabel}>镀镍批次</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{platingTotal}</Text>
          <Text className={styles.summaryLabel}>总计</Text>
        </View>
      </View>

      <View className={styles.sectionHeader}>
        <View className={styles.sectionDot} style={{ background: '#d4a84b' }} />
        <Text className={styles.sectionTitle}>镀铬工艺</Text>
        <Text className={styles.sectionCount}>共{filteredChrome.length}条</Text>
      </View>
      {filteredChrome.slice(0, 5).map(record => (
        <RecordItem
          key={record.id}
          title={`镀铬 · ${record.id}`}
          subtitle={`${record.operator} | ${record.date}`}
          tags={[{ text: `${record.currentDensity}A/dm²`, type: 'info' }, { text: `${record.temperature}℃`, type: 'info' }]}
          rightText={`${record.platingTime}min`}
          rightSubText={`目标${record.targetThickness}μm`}
          onClick={() => goToDetail('chrome', record.id)}
        />
      ))}
      {filteredChrome.length === 0 && (
        <View className={styles.emptyState}>
          <Text className={styles.emptyText}>暂无相关记录</Text>
        </View>
      )}

      <View className={styles.sectionHeader} style={{ marginTop: '32rpx' }}>
        <View className={styles.sectionDot} style={{ background: '#8b9daf' }} />
        <Text className={styles.sectionTitle}>镀镍工艺</Text>
        <Text className={styles.sectionCount}>共{filteredNickel.length}条</Text>
      </View>
      {filteredNickel.slice(0, 5).map(record => (
        <RecordItem
          key={record.id}
          title={`镀镍 · ${record.id}`}
          subtitle={`${record.operator} | ${record.date}`}
          tags={[{ text: `光亮剂${record.brightenerAdded}ml`, type: 'info' }, { text: `${record.currentDensity}A/dm²`, type: 'info' }]}
          rightText={`${record.platingTime}min`}
          onClick={() => goToDetail('nickel', record.id)}
        />
      ))}
      {filteredNickel.length === 0 && (
        <View className={styles.emptyState}>
          <Text className={styles.emptyText}>暂无相关记录</Text>
        </View>
      )}
    </View>
  );

  const renderBath = () => (
    <View>
      <SearchFilter
        searchPlaceholder="搜索槽液、成分、分析员"
        searchValue={searchText}
        onSearchChange={setSearchText}
        filterOptions={bathStatusFilters}
        filterValue={statusFilter}
        onFilterChange={setStatusFilter}
        onClear={handleClear}
      />

      <View className={styles.summaryCards}>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{filteredBath.filter(b => b.status === 'normal').length}</Text>
          <Text className={styles.summaryLabel}>正常项</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{filteredBath.filter(b => b.status === 'warning').length}</Text>
          <Text className={styles.summaryLabel}>预警项</Text>
        </View>
        <View className={styles.summaryCard}>
          <Text className={styles.summaryValue}>{filteredBath.filter(b => b.status === 'abnormal').length}</Text>
          <Text className={styles.summaryLabel}>异常项</Text>
        </View>
      </View>

      <View className={styles.sectionHeader}>
        <View className={styles.sectionDot} />
        <Text className={styles.sectionTitle}>槽液成分分析</Text>
        <Text className={styles.sectionCount}>共{filteredBath.length}条</Text>
      </View>
      {filteredBath.map(record => (
        <RecordItem
          key={record.id}
          title={`${record.bathType} · ${record.component}`}
          subtitle={`${record.analyst} | ${record.date}`}
          tags={[{ text: record.status === 'normal' ? '正常' : record.status === 'warning' ? '预警' : '异常', type: record.status === 'normal' ? 'pass' : record.status === 'warning' ? 'warning' : 'fail' }]}
          rightText={`${record.concentration}`}
          rightSubText={`标准${record.standardMin}-${record.standardMax}`}
          onClick={() => goToDetail('bath', record.id)}
        />
      ))}
      {filteredBath.length === 0 && (
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
