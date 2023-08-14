import HTTP from './http'

const dicts = {
  post: (request: string, params = {}) => HTTP.post(request, params),
}

export default {
  dicts,
}
