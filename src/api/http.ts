import axios from 'axios'
import keycloak from '@/utils/keycloak'

const HTTP = axios.create({
  baseURL: '/api/',
})

HTTP.interceptors.request.use((config) => {
  const keycloakToken = keycloak.token
  config.headers.token = keycloakToken

  return config
})

HTTP.interceptors.response.use(
  (response) => {
    if (response?.data?.status === 'error') {
      console.error(response.request.responseURL, response.data)
    }
    return response
  },
  (err) => {
    if (err.response.status === 401) {
      keycloak.logout()
    }
    return Promise.reject(err)
  }
)

export default HTTP
