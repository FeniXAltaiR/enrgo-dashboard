import HTTP from './http'

const dicts = {
  post: (request: string, params = {}) => HTTP.post(request, params),
}

const reports = {
  post: (params = {}) => HTTP.post('reports', params),
  chart: (params = {}) => HTTP.post('graph_contract', params),
}

export default {
  dicts,
  reports,
}
