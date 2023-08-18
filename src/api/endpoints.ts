import HTTP from './http'

const dicts = {
  post: (request: string, params = {}) => HTTP.post(request, params),
}

const reports = {
  post: (params = {}) => HTTP.post('reports', params),
}

export default {
  dicts,
  reports,
}
