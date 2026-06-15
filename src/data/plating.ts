import { StatItem, ModuleEntry, DegreasingRecord, PicklingRecord, ChromeRecord, NickelRecord, BathAnalysis, RackInspection, ThicknessMeasurement, BondTest, SaltSprayTest, ReworkRecord, WastewaterRecord } from '@/types/plating';

export const homeStats: StatItem[] = [
  { label: '今日产量', value: 128, unit: '件', trend: 'up', status: 'normal' },
  { label: '质检合格率', value: 97.6, unit: '%', trend: 'stable', status: 'normal' },
  { label: '槽液异常', value: 2, unit: '项', trend: 'down', status: 'warning' },
  { label: '待返工件', value: 5, unit: '件', trend: 'up', status: 'error' },
];

export const homeModules: ModuleEntry[] = [
  { id: 'degreasing', title: '除油除锈', subtitle: '前处理记录', path: '/pages/degreasing/index', icon: '🧹', color: '#2e7bbf' },
  { id: 'pickling', title: '酸洗活化', subtitle: '活化时长', path: '/pages/pickling/index', icon: '⚗️', color: '#4a96d5' },
  { id: 'chrome', title: '镀铬工艺', subtitle: '电流密度', path: '/pages/chrome/index', icon: '✨', color: '#d4a84b' },
  { id: 'nickel', title: '镀镍工艺', subtitle: '光亮剂添加', path: '/pages/nickel/index', icon: '🔩', color: '#8b9daf' },
  { id: 'bath', title: '槽液分析', subtitle: '成分监控', path: '/pages/bath/index', icon: '🧪', color: '#6c5ce7' },
  { id: 'rack', title: '挂具检查', subtitle: '导电检查', path: '/pages/rack/index', icon: '🔧', color: '#00b894' },
  { id: 'thickness', title: '镀层厚度', subtitle: '厚度测量', path: '/pages/thickness/index', icon: '📏', color: '#e17055' },
  { id: 'rework', title: '退镀返工', subtitle: '不合格处理', path: '/pages/rework/index', icon: '🔄', color: '#f53f3f' },
  { id: 'wastewater', title: '废水处理', subtitle: '含铬排放', path: '/pages/wastewater/index', icon: '💧', color: '#0984e3' },
  { id: 'salt-spray', title: '盐雾试验', subtitle: '耐腐蚀测试', path: '/pages/salt-spray/index', icon: '🌊', color: '#00cec9' },
  { id: 'bond', title: '结合力试验', subtitle: '附着力测试', path: '/pages/bond/index', icon: '🔨', color: '#fdcb6e' },
];

export const degreasingRecords: DegreasingRecord[] = [
  { id: 'DG001', date: '2026-06-15 08:30', method: '化学除油', temperature: 65, duration: 15, operator: '张伟', status: 'pass' },
  { id: 'DG002', date: '2026-06-15 09:15', method: '电解除油', temperature: 70, duration: 10, operator: '李明', status: 'pass' },
  { id: 'DG003', date: '2026-06-14 14:20', method: '化学除油', temperature: 60, duration: 20, operator: '王强', status: 'pass' },
  { id: 'DG004', date: '2026-06-14 10:45', method: '超声波除油', temperature: 55, duration: 12, operator: '张伟', status: 'pass' },
  { id: 'DG005', date: '2026-06-13 16:00', method: '电解除油', temperature: 72, duration: 8, operator: '赵刚', status: 'fail' },
  { id: 'DG006', date: '2026-06-13 11:30', method: '化学除油', temperature: 68, duration: 18, operator: '李明', status: 'pass' },
  { id: 'DG007', date: '2026-06-12 09:00', method: '超声波除油', temperature: 58, duration: 14, operator: '王强', status: 'pass' },
  { id: 'DG008', date: '2026-06-12 15:20', method: '化学除油', temperature: 63, duration: 16, operator: '张伟', status: 'pass' },
  { id: 'DG009', date: '2026-06-11 13:45', method: '电解除油', temperature: 69, duration: 11, operator: '赵刚', status: 'pass' },
  { id: 'DG010', date: '2026-06-11 08:10', method: '化学除油', temperature: 66, duration: 17, operator: '李明', status: 'pass' },
];

export const picklingRecords: PicklingRecord[] = [
  { id: 'PK001', date: '2026-06-15 08:45', acidType: '盐酸', concentration: 20, duration: 5, operator: '张伟', status: 'pass' },
  { id: 'PK002', date: '2026-06-15 09:30', acidType: '硫酸', concentration: 15, duration: 8, operator: '李明', status: 'pass' },
  { id: 'PK003', date: '2026-06-14 14:40', acidType: '盐酸', concentration: 22, duration: 4, operator: '王强', status: 'pass' },
  { id: 'PK004', date: '2026-06-14 11:00', acidType: '混合酸', concentration: 18, duration: 6, operator: '张伟', status: 'pass' },
  { id: 'PK005', date: '2026-06-13 16:15', acidType: '硫酸', concentration: 12, duration: 10, operator: '赵刚', status: 'fail' },
  { id: 'PK006', date: '2026-06-13 11:45', acidType: '盐酸', concentration: 21, duration: 5, operator: '李明', status: 'pass' },
  { id: 'PK007', date: '2026-06-12 09:20', acidType: '混合酸', concentration: 19, duration: 7, operator: '王强', status: 'pass' },
  { id: 'PK008', date: '2026-06-12 15:40', acidType: '硫酸', concentration: 16, duration: 9, operator: '张伟', status: 'pass' },
  { id: 'PK009', date: '2026-06-11 14:00', acidType: '盐酸', concentration: 23, duration: 3, operator: '赵刚', status: 'pass' },
  { id: 'PK010', date: '2026-06-11 08:30', acidType: '混合酸', concentration: 17, duration: 6, operator: '李明', status: 'pass' },
];

export const chromeRecords: ChromeRecord[] = [
  { id: 'CR001', date: '2026-06-15 09:00', currentDensity: 35, temperature: 55, platingTime: 30, targetThickness: 20, operator: '张伟' },
  { id: 'CR002', date: '2026-06-15 10:30', currentDensity: 40, temperature: 52, platingTime: 25, targetThickness: 18, operator: '李明' },
  { id: 'CR003', date: '2026-06-14 14:00', currentDensity: 38, temperature: 54, platingTime: 28, targetThickness: 22, operator: '王强' },
  { id: 'CR004', date: '2026-06-14 11:20', currentDensity: 42, temperature: 56, platingTime: 22, targetThickness: 15, operator: '张伟' },
  { id: 'CR005', date: '2026-06-13 16:30', currentDensity: 36, temperature: 53, platingTime: 32, targetThickness: 25, operator: '赵刚' },
  { id: 'CR006', date: '2026-06-13 12:00', currentDensity: 30, temperature: 50, platingTime: 35, targetThickness: 20, operator: '李明' },
  { id: 'CR007', date: '2026-06-12 09:30', currentDensity: 44, temperature: 57, platingTime: 20, targetThickness: 16, operator: '王强' },
  { id: 'CR008', date: '2026-06-12 15:00', currentDensity: 33, temperature: 51, platingTime: 30, targetThickness: 19, operator: '张伟' },
  { id: 'CR009', date: '2026-06-11 14:20', currentDensity: 39, temperature: 55, platingTime: 26, targetThickness: 21, operator: '赵刚' },
  { id: 'CR010', date: '2026-06-11 08:50', currentDensity: 37, temperature: 54, platingTime: 29, targetThickness: 23, operator: '李明' },
];

export const nickelRecords: NickelRecord[] = [
  { id: 'NK001', date: '2026-06-15 08:20', brightenerAdded: 5.2, currentDensity: 4.0, temperature: 58, platingTime: 20, operator: '张伟' },
  { id: 'NK002', date: '2026-06-15 10:00', brightenerAdded: 3.8, currentDensity: 3.5, temperature: 60, platingTime: 25, operator: '李明' },
  { id: 'NK003', date: '2026-06-14 13:30', brightenerAdded: 6.0, currentDensity: 4.5, temperature: 56, platingTime: 18, operator: '王强' },
  { id: 'NK004', date: '2026-06-14 10:45', brightenerAdded: 4.5, currentDensity: 3.8, temperature: 59, platingTime: 22, operator: '张伟' },
  { id: 'NK005', date: '2026-06-13 15:50', brightenerAdded: 5.5, currentDensity: 4.2, temperature: 57, platingTime: 19, operator: '赵刚' },
  { id: 'NK006', date: '2026-06-13 11:15', brightenerAdded: 4.0, currentDensity: 3.6, temperature: 61, platingTime: 24, operator: '李明' },
  { id: 'NK007', date: '2026-06-12 09:40', brightenerAdded: 5.8, currentDensity: 4.3, temperature: 55, platingTime: 21, operator: '王强' },
  { id: 'NK008', date: '2026-06-12 14:30', brightenerAdded: 3.5, currentDensity: 3.2, temperature: 62, platingTime: 28, operator: '张伟' },
  { id: 'NK009', date: '2026-06-11 13:00', brightenerAdded: 4.8, currentDensity: 3.9, temperature: 58, platingTime: 23, operator: '赵刚' },
  { id: 'NK010', date: '2026-06-11 08:30', brightenerAdded: 5.0, currentDensity: 4.1, temperature: 60, platingTime: 20, operator: '李明' },
];

export const bathAnalyses: BathAnalysis[] = [
  { id: 'BA001', date: '2026-06-15', bathType: '镀铬槽', component: 'CrO₃', concentration: 252, standardMin: 230, standardMax: 270, status: 'normal', analyst: '张伟' },
  { id: 'BA002', date: '2026-06-15', bathType: '镀铬槽', component: 'H₂SO₄', concentration: 2.8, standardMin: 2.2, standardMax: 3.2, status: 'normal', analyst: '张伟' },
  { id: 'BA003', date: '2026-06-15', bathType: '镀镍槽', component: 'NiSO₄', concentration: 295, standardMin: 280, standardMax: 320, status: 'normal', analyst: '李明' },
  { id: 'BA004', date: '2026-06-15', bathType: '镀镍槽', component: 'NiCl₂', concentration: 48, standardMin: 40, standardMax: 55, status: 'normal', analyst: '李明' },
  { id: 'BA005', date: '2026-06-14', bathType: '镀铬槽', component: 'Cr³⁺', concentration: 4.2, standardMin: 2.0, standardMax: 4.0, status: 'warning', analyst: '王强' },
  { id: 'BA006', date: '2026-06-14', bathType: '镀镍槽', component: '硼酸', concentration: 38, standardMin: 35, standardMax: 45, status: 'normal', analyst: '赵刚' },
  { id: 'BA007', date: '2026-06-13', bathType: '镀铬槽', component: 'CrO₃', concentration: 218, standardMin: 230, standardMax: 270, status: 'abnormal', analyst: '张伟' },
  { id: 'BA008', date: '2026-06-13', bathType: '镀镍槽', component: '光亮剂', concentration: 8.5, standardMin: 6.0, standardMax: 10.0, status: 'normal', analyst: '李明' },
  { id: 'BA009', date: '2026-06-12', bathType: '镀铬槽', component: 'H₂SO₄', concentration: 1.8, standardMin: 2.2, standardMax: 3.2, status: 'warning', analyst: '王强' },
  { id: 'BA010', date: '2026-06-12', bathType: '镀镍槽', component: 'NiSO₄', concentration: 310, standardMin: 280, standardMax: 320, status: 'normal', analyst: '赵刚' },
];

export const rackInspections: RackInspection[] = [
  { id: 'RK001', date: '2026-06-15', rackId: 'GJ-001', conductivity: 'good', contactResistance: 0.5, inspector: '张伟', nextInspectionDate: '2026-06-22' },
  { id: 'RK002', date: '2026-06-15', rackId: 'GJ-002', conductivity: 'poor', contactResistance: 2.3, inspector: '李明', nextInspectionDate: '2026-06-18' },
  { id: 'RK003', date: '2026-06-14', rackId: 'GJ-003', conductivity: 'good', contactResistance: 0.3, inspector: '王强', nextInspectionDate: '2026-06-21' },
  { id: 'RK004', date: '2026-06-14', rackId: 'GJ-004', conductivity: 'failed', contactResistance: 5.8, inspector: '赵刚', nextInspectionDate: '2026-06-15' },
  { id: 'RK005', date: '2026-06-13', rackId: 'GJ-005', conductivity: 'good', contactResistance: 0.4, inspector: '张伟', nextInspectionDate: '2026-06-20' },
  { id: 'RK006', date: '2026-06-13', rackId: 'GJ-006', conductivity: 'good', contactResistance: 0.6, inspector: '李明', nextInspectionDate: '2026-06-20' },
  { id: 'RK007', date: '2026-06-12', rackId: 'GJ-007', conductivity: 'poor', contactResistance: 1.8, inspector: '王强', nextInspectionDate: '2026-06-15' },
  { id: 'RK008', date: '2026-06-12', rackId: 'GJ-008', conductivity: 'good', contactResistance: 0.2, inspector: '赵刚', nextInspectionDate: '2026-06-19' },
  { id: 'RK009', date: '2026-06-11', rackId: 'GJ-009', conductivity: 'good', contactResistance: 0.5, inspector: '张伟', nextInspectionDate: '2026-06-18' },
  { id: 'RK010', date: '2026-06-11', rackId: 'GJ-010', conductivity: 'poor', contactResistance: 2.1, inspector: '李明', nextInspectionDate: '2026-06-14' },
];

export const thicknessMeasurements: ThicknessMeasurement[] = [
  { id: 'TH001', date: '2026-06-15 10:00', workpieceId: 'WP-A001', platingType: 'chrome', thickness: 22.5, standardMin: 18, standardMax: 25, result: 'pass', inspector: '张伟' },
  { id: 'TH002', date: '2026-06-15 10:30', workpieceId: 'WP-A002', platingType: 'nickel', thickness: 15.8, standardMin: 12, standardMax: 20, result: 'pass', inspector: '李明' },
  { id: 'TH003', date: '2026-06-14 14:00', workpieceId: 'WP-B001', platingType: 'chrome', thickness: 16.2, standardMin: 18, standardMax: 25, result: 'fail', inspector: '王强' },
  { id: 'TH004', date: '2026-06-14 14:30', workpieceId: 'WP-B002', platingType: 'nickel', thickness: 13.5, standardMin: 12, standardMax: 20, result: 'pass', inspector: '赵刚' },
  { id: 'TH005', date: '2026-06-13 11:00', workpieceId: 'WP-C001', platingType: 'chrome', thickness: 20.0, standardMin: 18, standardMax: 25, result: 'pass', inspector: '张伟' },
  { id: 'TH006', date: '2026-06-13 11:30', workpieceId: 'WP-C002', platingType: 'nickel', thickness: 10.5, standardMin: 12, standardMax: 20, result: 'fail', inspector: '李明' },
  { id: 'TH007', date: '2026-06-12 09:00', workpieceId: 'WP-D001', platingType: 'chrome', thickness: 23.1, standardMin: 18, standardMax: 25, result: 'pass', inspector: '王强' },
  { id: 'TH008', date: '2026-06-12 09:30', workpieceId: 'WP-D002', platingType: 'nickel', thickness: 17.8, standardMin: 12, standardMax: 20, result: 'pass', inspector: '赵刚' },
  { id: 'TH009', date: '2026-06-11 15:00', workpieceId: 'WP-E001', platingType: 'chrome', thickness: 24.5, standardMin: 18, standardMax: 25, result: 'pass', inspector: '张伟' },
  { id: 'TH010', date: '2026-06-11 15:30', workpieceId: 'WP-E002', platingType: 'nickel', thickness: 14.2, standardMin: 12, standardMax: 20, result: 'pass', inspector: '李明' },
];

export const bondTests: BondTest[] = [
  { id: 'BD001', date: '2026-06-15', workpieceId: 'WP-A001', testMethod: '弯曲试验', result: 'pass', description: '镀层无剥落、起皮', inspector: '张伟' },
  { id: 'BD002', date: '2026-06-15', workpieceId: 'WP-A002', testMethod: '划格试验', result: 'pass', description: '划格区域0级脱落', inspector: '李明' },
  { id: 'BD003', date: '2026-06-14', workpieceId: 'WP-B001', testMethod: '热震试验', result: 'fail', description: '加热后镀层出现起泡', inspector: '王强' },
  { id: 'BD004', date: '2026-06-14', workpieceId: 'WP-B002', testMethod: '弯曲试验', result: 'pass', description: '弯曲后镀层完好', inspector: '赵刚' },
  { id: 'BD005', date: '2026-06-13', workpieceId: 'WP-C001', testMethod: '划格试验', result: 'pass', description: '划格区域1级脱落', inspector: '张伟' },
  { id: 'BD006', date: '2026-06-13', workpieceId: 'WP-C002', testMethod: '热震试验', result: 'pass', description: '镀层无变化', inspector: '李明' },
  { id: 'BD007', date: '2026-06-12', workpieceId: 'WP-D001', testMethod: '弯曲试验', result: 'pass', description: '镀层结合良好', inspector: '王强' },
  { id: 'BD008', date: '2026-06-12', workpieceId: 'WP-D002', testMethod: '划格试验', result: 'fail', description: '划格区域2级脱落', inspector: '赵刚' },
  { id: 'BD009', date: '2026-06-11', workpieceId: 'WP-E001', testMethod: '热震试验', result: 'pass', description: '镀层完好', inspector: '张伟' },
  { id: 'BD010', date: '2026-06-11', workpieceId: 'WP-E002', testMethod: '弯曲试验', result: 'pass', description: '弯曲无剥落', inspector: '李明' },
];

export const saltSprayTests: SaltSprayTest[] = [
  { id: 'SS001', date: '2026-06-15', workpieceId: 'WP-A001', duration: 72, rating: 10, result: 'pass', inspector: '张伟' },
  { id: 'SS002', date: '2026-06-15', workpieceId: 'WP-A002', duration: 48, rating: 9, result: 'pass', inspector: '李明' },
  { id: 'SS003', date: '2026-06-14', workpieceId: 'WP-B001', duration: 24, rating: 5, result: 'fail', inspector: '王强' },
  { id: 'SS004', date: '2026-06-14', workpieceId: 'WP-B002', duration: 96, rating: 10, result: 'pass', inspector: '赵刚' },
  { id: 'SS005', date: '2026-06-13', workpieceId: 'WP-C001', duration: 48, rating: 8, result: 'pass', inspector: '张伟' },
  { id: 'SS006', date: '2026-06-13', workpieceId: 'WP-C002', duration: 72, rating: 9, result: 'pass', inspector: '李明' },
  { id: 'SS007', date: '2026-06-12', workpieceId: 'WP-D001', duration: 120, rating: 10, result: 'pass', inspector: '王强' },
  { id: 'SS008', date: '2026-06-12', workpieceId: 'WP-D002', duration: 24, rating: 4, result: 'fail', inspector: '赵刚' },
  { id: 'SS009', date: '2026-06-11', workpieceId: 'WP-E001', duration: 72, rating: 8, result: 'pass', inspector: '张伟' },
  { id: 'SS010', date: '2026-06-11', workpieceId: 'WP-E002', duration: 48, rating: 7, result: 'pass', inspector: '李明' },
];

export const reworkRecords: ReworkRecord[] = [
  { id: 'RW001', date: '2026-06-15', workpieceId: 'WP-B001', reason: '镀层厚度不足', reworkType: 'replating', method: '补镀', operator: '张伟', status: 'processing' },
  { id: 'RW002', date: '2026-06-15', workpieceId: 'WP-C002', reason: '镀层起泡', reworkType: 'stripping', method: '化学退镀', operator: '李明', status: 'pending' },
  { id: 'RW003', date: '2026-06-14', workpieceId: 'WP-D002', reason: '结合力不合格', reworkType: 'stripping', method: '电解退镀', operator: '王强', status: 'completed' },
  { id: 'RW004', date: '2026-06-14', workpieceId: 'WP-F001', reason: '外观缺陷', reworkType: 'replating', method: '补镀', operator: '赵刚', status: 'processing' },
  { id: 'RW005', date: '2026-06-13', workpieceId: 'WP-F002', reason: '盐雾试验不合格', reworkType: 'stripping', method: '化学退镀', operator: '张伟', status: 'completed' },
  { id: 'RW006', date: '2026-06-13', workpieceId: 'WP-G001', reason: '镀层粗糙', reworkType: 'stripping', method: '机械打磨', operator: '李明', status: 'pending' },
  { id: 'RW007', date: '2026-06-12', workpieceId: 'WP-G002', reason: '色差超标', reworkType: 'replating', method: '补镀', operator: '王强', status: 'completed' },
  { id: 'RW008', date: '2026-06-12', workpieceId: 'WP-H001', reason: '漏镀', reworkType: 'replating', method: '补镀', operator: '赵刚', status: 'processing' },
  { id: 'RW009', date: '2026-06-11', workpieceId: 'WP-H002', reason: '镀层脱落', reworkType: 'stripping', method: '化学退镀', operator: '张伟', status: 'completed' },
  { id: 'RW010', date: '2026-06-11', workpieceId: 'WP-I001', reason: '厚度超标', reworkType: 'stripping', method: '电解退镀', operator: '李明', status: 'completed' },
];

export const wastewaterRecords: WastewaterRecord[] = [
  { id: 'WW001', date: '2026-06-15 10:00', chromiumContent: 0.3, dischargeVolume: 5.2, treatmentMethod: '化学沉淀', result: 'pass', operator: '张伟' },
  { id: 'WW002', date: '2026-06-15 14:00', chromiumContent: 0.5, dischargeVolume: 4.8, treatmentMethod: '离子交换', result: 'pass', operator: '李明' },
  { id: 'WW003', date: '2026-06-14 09:30', chromiumContent: 1.2, dischargeVolume: 6.0, treatmentMethod: '化学沉淀', result: 'fail', operator: '王强' },
  { id: 'WW004', date: '2026-06-14 15:00', chromiumContent: 0.4, dischargeVolume: 3.5, treatmentMethod: '电解还原', result: 'pass', operator: '赵刚' },
  { id: 'WW005', date: '2026-06-13 10:30', chromiumContent: 0.2, dischargeVolume: 4.2, treatmentMethod: '化学沉淀', result: 'pass', operator: '张伟' },
  { id: 'WW006', date: '2026-06-13 14:30', chromiumContent: 0.8, dischargeVolume: 5.5, treatmentMethod: '离子交换', result: 'pass', operator: '李明' },
  { id: 'WW007', date: '2026-06-12 09:00', chromiumContent: 0.1, dischargeVolume: 3.8, treatmentMethod: '电解还原', result: 'pass', operator: '王强' },
  { id: 'WW008', date: '2026-06-12 15:30', chromiumContent: 1.5, dischargeVolume: 6.2, treatmentMethod: '化学沉淀', result: 'fail', operator: '赵刚' },
  { id: 'WW009', date: '2026-06-11 10:00', chromiumContent: 0.3, dischargeVolume: 4.0, treatmentMethod: '离子交换', result: 'pass', operator: '张伟' },
  { id: 'WW010', date: '2026-06-11 14:00', chromiumContent: 0.6, dischargeVolume: 5.0, treatmentMethod: '化学沉淀', result: 'pass', operator: '李明' },
];
