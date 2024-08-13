import { DashboardViewInfo } from './types'

export const dashboardViewList: DashboardViewInfo[] = [
  {
    value: 'c_price',
    title: 'Цена договора',
    color: 'info',
    suffix: 'руб',
  },
  {
    value: 'is_current',
    title: 'Состояние договора',
    color: 'warning',
    suffix: 'На исполнении',
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
    title: 'Дебиторская задолженность',
    color: 'error',
    suffix: 'руб',
  },
  {
    value: 'e_sum',
    title: 'Кредиторская задолженность',
    color: 'error',
    suffix: 'руб',
  },
]
