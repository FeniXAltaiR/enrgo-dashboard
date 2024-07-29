export type GetSessionStorageValue<T> = {
  key: string
  formatter?: (value: string) => T
}

export const getSessionStorageValue = <T>({
  key,
  formatter,
}: GetSessionStorageValue<T>): T | string | null => {
  const value = window.sessionStorage.getItem(key)

  if (value && formatter) {
    return formatter(value) as T
  }

  return value
}

export type SetSessionStorageValue = {
  key: string
  value: string
}

export const setSessionStorageValue = ({
  key,
  value,
}: SetSessionStorageValue) => {
  window.sessionStorage.setItem(key, value)
}
