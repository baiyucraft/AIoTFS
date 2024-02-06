<template>
  <view class="u-page_item" v-if="tabbar?.items?.length > 0">
    <su-tabbar :value="path" :fixed="true" :placeholder="true" :safeAreaInsetBottom="true"
               :inactiveColor="tabbar.style.color"
               :activeColor="tabbar.style.activeColor"
               :customStyle="{ background: tabbar.style.bgColor }">
      <su-tabbar-item
        v-for="item in tabbar.items"
        :key="item.text"
        :text="item.text"
        :name="item.url"
        @tap="yu.$router.go(item.url)">
        <template v-slot:active-icon>
          <image class="u-page_item_slot-icon" :src="yu.$url.cdn(item.activeIconUrl)"></image>
        </template>
        <template v-slot:inactive-icon>
          <image class="u-page_item_slot-icon" :src="yu.$url.cdn(item.iconUrl)"></image>
        </template>
      </su-tabbar-item>
    </su-tabbar>
  </view>
</template>

<script setup>
import { computed } from 'vue'
import yu from '@yu'

defineProps({
  path: {
    type: String,
    default: ''
  }
})
const useAppStore = yu.$store.useAppStore()
const tabbar = computed(() => useAppStore.tabbar)

</script>

<style lang="scss" scoped>
	.u-page {
		padding: 0;

		&_item {
			&_slot-icon {
				width: 25px;
				height: 25px;
			}
		}
	}
</style>
