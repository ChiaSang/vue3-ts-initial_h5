<template>
  <div class="main-wrapper">
    <div class="fz-24 mb-100 c-black_40">HomePage</div>
    <div>userId:{{ userInfo.userId }}</div>
    <div>dingTalkId:{{ userInfo.dingTalkId }}</div>
    <div>userName:{{ userInfo.userName }}</div>
    <div>zentaoUserName:{{ userInfo.zentaoUserName }}</div>
    <VanButton class="mt-20" type="primary" @click="handleCalendarChooseOneDay">月历组件：选择某天</VanButton>
    <VanButton class="mt-20" type="primary" @click="handleContactComplexPicker">选择部门和人</VanButton>
    <RouterLink :to="{ name: 'NotFound' }">to NotFound</RouterLink>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, getCurrentInstance } from 'vue'
  import { useStore } from '@/store'
  import { RouterLink } from 'vue-router'
  import { Button as VanButton } from 'vant'
  const internalInstance = getCurrentInstance()
  const $dd = internalInstance?.proxy?.$dd
  const store = useStore()
  console.log('store :>> ', store.state.user.userId)
  const text = ref('1')
  const userInfo = computed(() => {
    return store.state.user
  })

  async function handleCalendarChooseOneDay() {
    try {
      const res = await $dd?.biz.calendar.chooseOneDay({
        default: 1494415396228
      })
      console.log('res :>> ', res)
    } catch (error) {
      console.error(error)
    }
  }
  async function handleContactComplexPicker() {
    try {
      const res = await $dd?.biz.contact.complexPicker({
        title: '测试标题', // 标题
        corpId: store.state.sys.corpId, // 企业的corpId
        multiple: true, // 是否多选
        limitTips: '超出了', // 超过限定人数返回提示
        maxUsers: 1000, // 最大可选人数
        pickedUsers: [], // 已选用户
        pickedDepartments: [], // 已选部门
        disabledUsers: [], // 不可选用户
        disabledDepartments: [], // 不可选部门
        requiredUsers: [], // 必选用户（不可取消选中状态）
        requiredDepartments: [], // 必选部门（不可取消选中状态）
        appId: Number(store.state.sys.agentId), // 微应用Id，企业内部应用查看AgentId
        permissionType: 'GLOBAL', // 可添加权限校验，选人权限，目前只有GLOBAL这个参数
        responseUserOnly: false, // 返回人，或者返回人和部门
        startWithDepartmentId: -1 // 仅支持0和-1
      })
      console.log('res :>> ', res)
    } catch (error) {
      console.error(error)
    }
  }
</script>
<style lang="scss" scoped>
  // xxx
</style>
