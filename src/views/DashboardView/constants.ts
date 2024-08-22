import { DashboardViewInfo } from './types'

export const dashboardViewList: DashboardViewInfo[] = [
  {
    value: 'c_price',
    title: 'Цена',
    color: 'info',
    suffix: 'руб',
  },
  {
    value: 'is_current',
    title: 'Выполняется',
    color: 'warning',
    suffix: '',
  },
  {
    value: 'is_completed',
    title: 'Закрыто',
    color: 'warning',
    suffix: '',
  },
  {
    value: 'profit',
    title: 'Выполнено',
    color: 'success',
    suffix: 'руб',
  },
  {
    value: 'curent_profit',
    title: 'Оплачено',
    color: 'success',
    suffix: 'руб',
  },
  {
    value: 'debt',
    title: 'Дебиторская',
    color: 'error',
    suffix: 'руб',
  },
  {
    value: 'e_sum',
    title: 'Кредиторская',
    color: 'error',
    suffix: 'руб',
  },
]
