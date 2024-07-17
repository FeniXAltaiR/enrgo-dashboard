import { ReportDataModel } from '@/utils/reports'

export type DashboardViewInfo = {
  value: keyof ReportDataModel
  title: string
  color: string
  suffix: string
}
