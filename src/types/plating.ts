export interface DegreasingRecord {
  id: string;
  date: string;
  method: string;
  temperature: number;
  duration: number;
  operator: string;
  status: 'pass' | 'fail';
}

export interface PicklingRecord {
  id: string;
  date: string;
  acidType: string;
  concentration: number;
  duration: number;
  operator: string;
  status: 'pass' | 'fail';
}

export interface ChromeRecord {
  id: string;
  date: string;
  currentDensity: number;
  temperature: number;
  platingTime: number;
  targetThickness: number;
  operator: string;
}

export interface NickelRecord {
  id: string;
  date: string;
  brightenerAdded: number;
  currentDensity: number;
  temperature: number;
  platingTime: number;
  operator: string;
}

export interface BathAnalysis {
  id: string;
  date: string;
  bathType: string;
  component: string;
  concentration: number;
  standardMin: number;
  standardMax: number;
  status: 'normal' | 'warning' | 'abnormal';
  analyst: string;
}

export interface RackInspection {
  id: string;
  date: string;
  rackId: string;
  conductivity: 'good' | 'poor' | 'failed';
  contactResistance: number;
  inspector: string;
  nextInspectionDate: string;
}

export interface ThicknessMeasurement {
  id: string;
  date: string;
  workpieceId: string;
  platingType: 'chrome' | 'nickel';
  thickness: number;
  standardMin: number;
  standardMax: number;
  result: 'pass' | 'fail';
  inspector: string;
}

export interface BondTest {
  id: string;
  date: string;
  workpieceId: string;
  testMethod: string;
  result: 'pass' | 'fail';
  description: string;
  inspector: string;
}

export interface SaltSprayTest {
  id: string;
  date: string;
  workpieceId: string;
  duration: number;
  rating: number;
  result: 'pass' | 'fail';
  inspector: string;
}

export interface ReworkRecord {
  id: string;
  date: string;
  workpieceId: string;
  reason: string;
  reworkType: 'stripping' | 'replating';
  method: string;
  operator: string;
  status: 'pending' | 'processing' | 'completed';
}

export interface WastewaterRecord {
  id: string;
  date: string;
  chromiumContent: number;
  dischargeVolume: number;
  treatmentMethod: string;
  result: 'pass' | 'fail';
  operator: string;
}

export interface StatItem {
  label: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  status?: 'normal' | 'warning' | 'error';
}

export interface ModuleEntry {
  id: string;
  title: string;
  subtitle: string;
  path: string;
  icon: string;
  color: string;
  badge?: number;
}
