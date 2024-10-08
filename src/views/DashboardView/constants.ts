import { ReportDataColumn } from '@/utils/reports'
import { DashboardViewInfo } from './types'

export const dashboardViewList: DashboardViewInfo[] = [
  {
    value: 'c_price',
    text: 'Цена',
    color: 'info',
    suffix: 'руб',
  },
  {
    value: 'ccount',
    text: 'Количество',
    color: 'info',
    suffix: '',
  },
  {
    value: 'is_current',
    text: 'Выполняется',
    color: 'warning',
    suffix: '',
  },
  {
    value: 'price_fulfilled',
    text: 'Выполняется в суммах',
    color: 'warning',
    suffix: 'руб',
  },
  {
    value: 'is_completed',
    text: 'Закрыто',
    color: 'warning',
    suffix: '',
  },
  {
    value: 'price_done',
    text: 'Выполнено',
    color: 'success',
    suffix: 'руб',
  },
  {
    value: 'price_price_done',
    text: 'Оплачено',
    color: 'success',
    suffix: 'руб',
  },
  {
    value: 'price_paid_y',
    text: 'К оплате',
    color: 'success',
    suffix: 'руб',
  },
  // {
  //   value: 'debt',
  //   text: 'Дебиторская',
  //   color: 'error',
  //   suffix: 'руб',
  // },
  // {
  //   value: 'e_sum',
  //   text: 'Кредиторская',
  //   color: 'error',
  //   suffix: 'руб',
  // },
]
