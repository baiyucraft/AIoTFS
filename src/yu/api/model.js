import yu from '@yu'

export const getAllPredictModel = (data = null) => {
  return yu.$request({
    url: '/app/predictModel/getAllPredictModel',
    method: 'get',
    params: {
      ...data
    }
  })
}
export const getPredictModelInfo = (id) => {
  return yu.$request({
    url: '/app/predictModel/getPredictModelInfo',
    method: 'GET',
    params: { id }
  })
}
export const getPredictModelLinkInfo = (id) => {
  return yu.$request({
    url: '/app/predictModel/getPredictModelLinkInfo',
    method: 'GET',
    params: { id }
  })
}
export const uploadImage = (data) => {
  return yu.$request({
    url: '/predictModel/uploadImage',
    method: 'POST',
    data
  })
}
