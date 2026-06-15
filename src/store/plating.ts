import { create } from 'zustand';
import Taro from '@tarojs/taro';
import dayjs from 'dayjs';
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
import {
  degreasingRecords as initialDegreasing,
  picklingRecords as initialPickling,
  chromeRecords as initialChrome,
  nickelRecords as initialNickel,
  bathAnalyses as initialBath,
  rackInspections as initialRack,
  thicknessMeasurements as initialThickness,
  bondTests as initialBond,
  saltSprayTests as initialSaltSpray,
  reworkRecords as initialRework,
  wastewaterRecords as initialWastewater,
} from '@/data/plating';

const STORAGE_KEY = 'plating_data_v1';

interface PlatingState {
  degreasingRecords: DegreasingRecord[];
  picklingRecords: PicklingRecord[];
  chromeRecords: ChromeRecord[];
  nickelRecords: NickelRecord[];
  bathAnalyses: BathAnalysis[];
  rackInspections: RackInspection[];
  thicknessMeasurements: ThicknessMeasurement[];
  bondTests: BondTest[];
  saltSprayTests: SaltSprayTest[];
  reworkRecords: ReworkRecord[];
  wastewaterRecords: WastewaterRecord[];
  addDegreasing: (record: Omit<DegreasingRecord, 'id' | 'date'>) => void;
  addPickling: (record: Omit<PicklingRecord, 'id' | 'date'>) => void;
  addChrome: (record: Omit<ChromeRecord, 'id' | 'date'>) => void;
  addNickel: (record: Omit<NickelRecord, 'id' | 'date'>) => void;
  addBath: (record: Omit<BathAnalysis, 'id' | 'date'>) => void;
  addRack: (record: Omit<RackInspection, 'id' | 'date'>) => void;
  addThickness: (record: Omit<ThicknessMeasurement, 'id' | 'date'>) => void;
  addBond: (record: Omit<BondTest, 'id' | 'date'>) => void;
  addSaltSpray: (record: Omit<SaltSprayTest, 'id' | 'date'>) => void;
  addRework: (record: Omit<ReworkRecord, 'id' | 'date'>) => void;
  addWastewater: (record: Omit<WastewaterRecord, 'id' | 'date'>) => void;
  initialize: () => void;
}

const generateId = (prefix: string, records: { id: string }[]): string => {
  const maxNum = records.reduce((max, r) => {
    const num = parseInt(r.id.replace(prefix, ''), 10);
    return num > max ? num : max;
  }, 0);
  return `${prefix}${String(maxNum + 1).padStart(3, '0')}`;
};

const getNow = (): string => dayjs().format('YYYY-MM-DD HH:mm');

const getNextWeek = (): string => dayjs().add(7, 'day').format('YYYY-MM-DD');

const saveToStorage = (state: Partial<PlatingState>) => {
  try {
    const data = {
      degreasingRecords: state.degreasingRecords,
      picklingRecords: state.picklingRecords,
      chromeRecords: state.chromeRecords,
      nickelRecords: state.nickelRecords,
      bathAnalyses: state.bathAnalyses,
      rackInspections: state.rackInspections,
      thicknessMeasurements: state.thicknessMeasurements,
      bondTests: state.bondTests,
      saltSprayTests: state.saltSprayTests,
      reworkRecords: state.reworkRecords,
      wastewaterRecords: state.wastewaterRecords,
    };
    Taro.setStorageSync(STORAGE_KEY, data);
    console.log('[Store] 数据已保存到本地存储');
  } catch (error) {
    console.error('[Store] 保存到本地存储失败:', error);
  }
};

const loadFromStorage = (): Partial<PlatingState> | null => {
  try {
    const data = Taro.getStorageSync(STORAGE_KEY);
    if (data) {
      console.log('[Store] 从本地存储加载数据');
      return data;
    }
    return null;
  } catch (error) {
    console.error('[Store] 从本地存储加载失败:', error);
    return null;
  }
};

export const usePlatingStore = create<PlatingState>((set, get) => ({
  degreasingRecords: initialDegreasing,
  picklingRecords: initialPickling,
  chromeRecords: initialChrome,
  nickelRecords: initialNickel,
  bathAnalyses: initialBath,
  rackInspections: initialRack,
  thicknessMeasurements: initialThickness,
  bondTests: initialBond,
  saltSprayTests: initialSaltSpray,
  reworkRecords: initialRework,
  wastewaterRecords: initialWastewater,

  initialize: () => {
    const saved = loadFromStorage();
    if (saved) {
      set(saved);
    }
  },

  addDegreasing: (record) => {
    const newRecord: DegreasingRecord = {
      ...record,
      id: generateId('DG', get().degreasingRecords),
      date: getNow(),
    };
    const newRecords = [newRecord, ...get().degreasingRecords];
    set({ degreasingRecords: newRecords });
    saveToStorage({ ...get(), degreasingRecords: newRecords });
  },

  addPickling: (record) => {
    const newRecord: PicklingRecord = {
      ...record,
      id: generateId('PK', get().picklingRecords),
      date: getNow(),
    };
    const newRecords = [newRecord, ...get().picklingRecords];
    set({ picklingRecords: newRecords });
    saveToStorage({ ...get(), picklingRecords: newRecords });
  },

  addChrome: (record) => {
    const newRecord: ChromeRecord = {
      ...record,
      id: generateId('CR', get().chromeRecords),
      date: getNow(),
    };
    const newRecords = [newRecord, ...get().chromeRecords];
    set({ chromeRecords: newRecords });
    saveToStorage({ ...get(), chromeRecords: newRecords });
  },

  addNickel: (record) => {
    const newRecord: NickelRecord = {
      ...record,
      id: generateId('NK', get().nickelRecords),
      date: getNow(),
    };
    const newRecords = [newRecord, ...get().nickelRecords];
    set({ nickelRecords: newRecords });
    saveToStorage({ ...get(), nickelRecords: newRecords });
  },

  addBath: (record) => {
    const newRecord: BathAnalysis = {
      ...record,
      id: generateId('BA', get().bathAnalyses),
      date: getNow(),
    };
    const newRecords = [newRecord, ...get().bathAnalyses];
    set({ bathAnalyses: newRecords });
    saveToStorage({ ...get(), bathAnalyses: newRecords });
  },

  addRack: (record) => {
    const newRecord: RackInspection = {
      ...record,
      id: generateId('RK', get().rackInspections),
      date: getNow(),
      nextInspectionDate: getNextWeek(),
    };
    const newRecords = [newRecord, ...get().rackInspections];
    set({ rackInspections: newRecords });
    saveToStorage({ ...get(), rackInspections: newRecords });
  },

  addThickness: (record) => {
    const newRecord: ThicknessMeasurement = {
      ...record,
      id: generateId('TH', get().thicknessMeasurements),
      date: getNow(),
    };
    const newRecords = [newRecord, ...get().thicknessMeasurements];
    set({ thicknessMeasurements: newRecords });
    saveToStorage({ ...get(), thicknessMeasurements: newRecords });
  },

  addBond: (record) => {
    const newRecord: BondTest = {
      ...record,
      id: generateId('BD', get().bondTests),
      date: getNow(),
    };
    const newRecords = [newRecord, ...get().bondTests];
    set({ bondTests: newRecords });
    saveToStorage({ ...get(), bondTests: newRecords });
  },

  addSaltSpray: (record) => {
    const newRecord: SaltSprayTest = {
      ...record,
      id: generateId('SS', get().saltSprayTests),
      date: getNow(),
    };
    const newRecords = [newRecord, ...get().saltSprayTests];
    set({ saltSprayTests: newRecords });
    saveToStorage({ ...get(), saltSprayTests: newRecords });
  },

  addRework: (record) => {
    const newRecord: ReworkRecord = {
      ...record,
      id: generateId('RW', get().reworkRecords),
      date: getNow(),
    };
    const newRecords = [newRecord, ...get().reworkRecords];
    set({ reworkRecords: newRecords });
    saveToStorage({ ...get(), reworkRecords: newRecords });
  },

  addWastewater: (record) => {
    const newRecord: WastewaterRecord = {
      ...record,
      id: generateId('WW', get().wastewaterRecords),
      date: getNow(),
    };
    const newRecords = [newRecord, ...get().wastewaterRecords];
    set({ wastewaterRecords: newRecords });
    saveToStorage({ ...get(), wastewaterRecords: newRecords });
  },
}));
