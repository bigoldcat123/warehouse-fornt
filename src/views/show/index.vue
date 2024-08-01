<template>
    <div>
        <el-button type="primary" @click="$router.go(-1)">返回</el-button>
    </div>
    <div>
        <img v-for="item in ($route.query.imgs as unknown as string).split(',')" :src="api_PreFix + item" alt="">
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { api_PreFix } from '@/api';
</script>
<style scoped>
</style>