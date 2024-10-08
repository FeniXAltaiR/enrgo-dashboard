import { ReportDataColumn, ReportDataModel } from '@/utils/reports'

export type DashboardViewInfo = Partial<ReportDataColumn> & {
  color: string
  suffix: string
}
