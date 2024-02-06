import request from '@/sheep/request'

const TestApi = {
  getModelInfo: (id) => {
    return request({
      url: '/app/test/model/get-model-info',
      method: 'GET',
      params: { id }
    })
  },
  uploadImage: (data) => {
    return request({
      url: '/predictModel/uploadImage',
      method: 'POST',
      data
    })
  }
}

export default TestApi
