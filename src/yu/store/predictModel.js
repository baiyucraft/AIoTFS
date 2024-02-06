import { defineStore } from 'pinia'
import { ref } from 'vue'
import yu from '@yu'
import { client } from '@gradio/client'

const usePredictModelStore = defineStore(
  'predictModel',
  () => {
    // state
    const selectedModel = ref({
      id: 0,
      predictModelId: 0,
      path: '',
      properties: [],
      callCount: 0
    })
    // getters
    // actions
    const getPredictModelLinkInfo = async(id) => {
      const data = await yu.$api.model.getPredictModelLinkInfo(id)
      selectedModel.value = data
    }
    const uploadImage = async(filePath) => {
      const { data } = await uni.uploadFile({
        url: 'http://192.168.1.164:1111/app/predictModel/uploadImage',
        filePath: filePath,
        name: 'file'
      })
      return JSON.parse(data).data
    }
    const predict = async(imgPath) => {
      const gradioApp = await client('http://192.168.1.164:7860/')
      const imgBlob = await fetch(imgPath).then(r => r.blob())
      const { data } = await gradioApp.predict(selectedModel.value.path, [imgBlob])
      return data[0]
    }

    return {
      selectedModel,
      getPredictModelLinkInfo,
      uploadImage,
      predict
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [{
        key: 'predict-model-store'
      }]
    }
  }
)

export default usePredictModelStore
