import { DashboardViewInfo } from './types'

export const dashboardViewList: DashboardViewInfo[] = [
  {
    value: 'is_current',
    title: 'Состояние договора',
    color: 'warning',
    suffix: 'На исполнении',
  },
  {
    value: 'debt',
    title: 'Дебиторская задолженность',
    color: 'error',
    suffix: 'руб',
  },
  {
    value: 'profit',
    title: 'Плановая прибыль',
    color: 'success',
    suffix: 'руб',
  },
  {
    value: 'c_price',
    title: 'Цена договора',
    color: 'info',
    suffix: 'руб',
  },
  {
    value: 'e_sum',
    title: 'Расходы',
    color: 'error',
    suffix: 'руб',
  },
  {
    value: 'curent_profit',
    title: 'Прибыль на текущую дату',
    color: 'success',
    suffix: 'руб',
  },
]
