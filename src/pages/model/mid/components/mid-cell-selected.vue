<template>
  <!-- 规格弹窗 -->
  <su-popup :show="show" round="10" @close="emit('close')">
    <view class="model-box bg-white ss-flex-col">
      <!-- 头 -->
      <view class="model-header ss-line-2">{{ modelInfo.name }}</view>

      <!-- 属性选择 -->
      <view class="model-content ss-flex-1">
        <scroll-view scroll-y="true" class="model-content-scroll" @touchmove.stop>
          <view class="ss-m-b-20" v-for="property in state.propertyList" :key="property.id">
            <view class="label-text ss-m-b-20">{{ property.name }}</view>
            <view class="ss-flex ss-col-center ss-flex-wrap">
              <button
                class="ss-reset-button spec-btn"
                :class="getbuttonClass(property.id, value)"
                v-for="value in property.values"
                :key="value.id"
                :disabled="value.disabled === true"
                @tap="onSelectModel(property.id, value.id)">
                {{ value.name }}
              </button>
            </view>
          </view>
        </scroll-view>
      </view>

      <!-- 操作区 -->
      <view class="model-footer">
        <view class="go-box ss-flex ss-col-center ss-row-center">
          <button class="ss-reset-button reset-btn ui-Shadow-Main" @tap="onResetSelected">重置选择</button>
          <button class="ss-reset-button go-btn ui-Shadow-Main" @tap="onGoModel">立即使用</button>
        </view>
      </view>
    </view>
  </su-popup>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
const props = defineProps({
  modelInfo: {
    type: Object,
    default: () => {}
  },
  show: {
    type: Boolean,
    default: false
  }
})

const state = ref({
  propertyList: [], // 渲染的属性列表
  maxPropertyId: 0, // 最大的propertyId
  curPropertyArray: [] // 当前选择的属性数组
})
const emit = defineEmits(['selectedModelChange', 'onGoModel', 'close'])

/* 处理 属性选择 */
// 生成属性列表
state.value.propertyList = props.modelInfo.modelTypes.reduce((propertyList, modelType) => {
  modelType.properties.forEach(property => {
    let findProperty = propertyList.find(item => item.id === property.propertyId)
    if (!findProperty) {
      findProperty = {
        id: property.propertyId,
        name: property.propertyName,
        values: []
      }
      propertyList.push(findProperty)
    }

    if (!findProperty.values.some(item => item.id === property.valueId)) {
      findProperty.values.push({
        id: property.valueId,
        name: property.valueName,
        disabled: false
      })
    }
  })
  return propertyList
}, [])
state.value.maxPropertyId = Math.max.apply(Math, state.value.propertyList.map((item) => item.id))

const initProperty = () => {
  state.value.curPropertyArray = Array.from({ length: state.value.maxPropertyId + 1 }, () => 0)
  // 如果有属性只有一个，则常亮
  state.value.propertyList.forEach(property => {
    if (property.values.length === 1) {
      property.values[0].disabled = true
      state.value.curPropertyArray[property.id] = property.values[0].id
    }
  })
}

// 得到过滤后的 modelTypes 列表
const modelTypes = computed(() => {
  const modelTypes = []
  for (const modelType of props.modelInfo.modelTypes) {
    const modelTypeTmp = {
      id: modelType.id,
      path: modelType.path,
      properties: modelType.properties,
      propertyValueId: Array.from({ length: state.value.maxPropertyId + 1 }, () => 0)
    }
    modelType.properties.forEach(item => {
      modelTypeTmp.propertyValueId[item.propertyId] = item.valueId
    })
    modelTypes.push(modelTypeTmp)
  }
  return modelTypes
})

// 选择属性
const onSelectModel = (propertyId, valueId) => {
  // 选择
  if (state.value.curPropertyArray[propertyId] === valueId) {
    state.value.curPropertyArray[propertyId] = 0
  } else {
    state.value.curPropertyArray[propertyId] = valueId
  }

  // 获取当前所选 property 下，所有可以选择的属性，*每一行应该是 或 的关系*
  // TODO H: 仍需优化逻辑，当出现两两不相交的选择时，有bug
  const newModelTypes = []
  if (state.value.curPropertyArray.every(item => item === 0)) {
    // 未选择任何属性
    newModelTypes.push(...modelTypes.value)
  } else {
    for (const modelType of modelTypes.value) {
    // 是合法的 modelType
      let isValidModelType = false
      state.value.curPropertyArray.forEach((valueId, propertyId) => {
      // 当前 propertyId 下的 valueId 不为空
        if (valueId === 0) return
        // modelType 中对应 propertyId 的 valueId 相等
        if (modelType.propertyValueId[propertyId] === valueId) isValidModelType = true
      })
      if (isValidModelType) {
        newModelTypes.push(modelType)
      }
    }
  }
  // console.log('newModelTypes', newModelTypes)

  // 改变选择与禁用状态 即 disabled = true
  const propertyActivatedIds = Array.from({ length: state.value.maxPropertyId + 1 }, () => new Set())
  newModelTypes.forEach(modelType => {
    modelType.propertyValueId.forEach((valueId, propertyId) => {
      if (valueId === 0) return
      propertyActivatedIds[propertyId].add(valueId)
    })
  })
  // console.log('propertyActivatedIds', propertyActivatedIds)
  state.value.propertyList.forEach(property => {
    property.values.forEach(value => {
      value.disabled = !propertyActivatedIds[property.id].has(value.id)
    })
  })
  // console.log('propertyList', propertyList.value)

  // 判断是否选择完成
  const isChooseAll = state.value.curPropertyArray.slice(1).every(item => item !== 0)
  if (isChooseAll) {
    const selectedModel = newModelTypes.find(
      modelType => modelType.propertyValueId.toString() === state.value.curPropertyArray.toString()
    )
    emit('selectedModelChange', selectedModel)
  } else {
    emit('selectedModelChange', {})
  }
}

// 重置选择
const onResetSelected = () => {
  state.value.propertyList.forEach(property => {
    property.values.forEach(value => {
      value.disabled = false
    })
  })
  initProperty()
  emit('selectedModelChange', {})
}

// 立即使用
const onGoModel = () => {
  emit('onGoModel')
}

// 选择的样式
const getbuttonClass = (propertyId, value) => {
  const res = []
  if (state.value.curPropertyArray[propertyId] === value.id) {
    res.push('ui-BG-Main-Gradient')
  }
  if (value.disabled === true) {
    res.push('disabled-btn')
  }
  return res
}

onMounted(() => {
  initProperty()
})

</script>

<style lang="scss" scoped>
	// 购买
	.go-box {
		padding: 10rpx 0;

		.reset-btn{
			width: 356rpx;
			height: 80rpx;
			border-radius: 40rpx 0 0 40rpx;
			background-color: var(--ui-BG-Main-light);
			color: var(--ui-BG-Main);
		}

		.go-btn {
			width: 356rpx;
			height: 80rpx;
			border-radius: 0 40rpx 40rpx 0;
			background: linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
			color: #fff;
		}
	}

	.model-box {
		border-radius: 30rpx 30rpx 0 0;
		max-height: 1000rpx;

		.model-header {
      font-size: 28rpx;
      font-weight: 500;
      line-height: 42rpx;
			position: relative;
			padding: 80rpx 20rpx 40rpx;
		}

		.model-content {
			padding: 0 20rpx;

			.model-content-scroll {
				max-height: 600rpx;

				.label-text {
					font-size: 26rpx;
					font-weight: 500;
				}

				.spec-btn {
					height: 60rpx;
					min-width: 100rpx;
					padding: 0 30rpx;
					background: #f4f4f4;
					border-radius: 30rpx;
					color: #434343;
					font-size: 26rpx;
					margin-right: 10rpx;
					margin-bottom: 10rpx;
				}

				.disabled-btn {
					font-weight: 400;
					color: #c6c6c6;
					background: #f8f8f8;
				}
			}
		}
	}
</style>
