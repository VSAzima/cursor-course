import type { TableData } from '../types';

export const mockTableData: TableData[] = [
  { id: '1', name: 'Product Launch Campaign', category: 'Marketing', value: 45230, status: 'active', date: '2024-02-01' },
  { id: '2', name: 'Q1 Sales Report', category: 'Sales', value: 82100, status: 'completed', date: '2024-01-28' },
  { id: '3', name: 'Customer Feedback Analysis', category: 'Product', value: 12500, status: 'pending', date: '2024-02-03' },
  { id: '4', name: 'Email Marketing Campaign', category: 'Marketing', value: 28900, status: 'active', date: '2024-02-02' },
  { id: '5', name: 'New Feature Development', category: 'Product', value: 95400, status: 'active', date: '2024-01-30' },
  { id: '6', name: 'Partnership Outreach', category: 'Sales', value: 63200, status: 'pending', date: '2024-02-04' },
  { id: '7', name: 'Social Media Strategy', category: 'Marketing', value: 34100, status: 'completed', date: '2024-01-25' },
  { id: '8', name: 'User Onboarding Flow', category: 'Product', value: 71200, status: 'active', date: '2024-02-01' },
];

export function filterTableData(
  data: TableData[],
  category: string,
  status: string
): TableData[] {
  return data.filter((item) => {
    const matchesCategory =
      category === 'all' ||
      item.category.toLowerCase() === category.toLowerCase();

    const matchesStatus =
      status === 'all' ||
      item.status.toLowerCase() === status.toLowerCase();

    return matchesCategory && matchesStatus;
  });
}

export function calculateKPIs(data: TableData[]) {
  const totalRevenue = data.reduce((sum, item) => sum + item.value, 0);
  const activeCount = data.filter((item) => item.status === 'active').length;
  const totalCount = data.length;
  const conversionRate = totalCount > 0 ? (activeCount / totalCount) * 100 : 0;
  const avgValue = totalCount > 0 ? totalRevenue / totalCount : 0;

  return {
    totalRevenue,
    activeCount,
    totalCount,
    conversionRate,
    avgValue,
  };
}
