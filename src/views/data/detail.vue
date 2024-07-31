<template>
    <div>
        <ElButton type="primary" @click="$router.go(-1)">back</ElButton>
    </div>
    <div class=" flex flex-wrap">
        <div class=" item">品种：{{ detail?.breed }}</div>
        <div class=" item" >水分：{{ detail?.water }}</div>
        <div class=" item" >入库时间：{{ detail?.entryTime }}</div>
        <div class=" item" >保管：{{ detail?.keeper }}</div>
        <div class=" item" >仓温：{{ detail?.inTemperature }}</div>
        <div class=" item" >外温度：{{ detail?.outTemperature }}</div>
        <div class=" item" >仓湿：{{ detail?.inHumidity }}</div>
        <div class=" item" >外湿：{{ detail?.outHumidity }}</div>
        <div class=" item" >高温：{{ $route.query.maxTemperature }}</div>
        <div class=" item" >低温：{{ $route.query.minTemperature }}</div>
        <div class=" item" >均温：{{ $route.query.avgTemperature }}</div>
        <div class=" item" v-show="item.length > 0" v-for="item,key in ($route.query.layerAvg as unknown as string ).split('|')">{{ (key + 1) + ' 层：' + item }}</div>
    </div>
    <div class="flex flex-wrap justify-evenly">
        <div class="m-2" v-for="item, key in detail?.list">
            <div><span class="titem" style="background-color: aqua;">{{ key +1 }} 层</span>
                <span  class="titem side"  v-for="i,kk in item[0]">{{ kk + 1 }}列</span>
            </div>
            <div v-for="x,keyx in item">
                <span class="titem side">{{ keyx+1 }} 行</span>
                <span class="titem" v-for="y in x">
                    {{ y }}
                </span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ElButton } from 'element-plus';
import data, { type type_Data_Detail } from '@/api/data';
import { ref } from 'vue'
import { useRoute } from 'vue-router';
const route = useRoute()
console.log();

const detail = ref<type_Data_Detail>()
data.getDetil(route.query.id as unknown as number).then(res => {
    detail.value = res.data.value
})
</script>
<style scoped>
.item{
    background-color: rgb(155, 255, 4);
    padding: 0.5rem;
    border-radius: 0.5rem;
    margin-right: 1rem;
    margin-top: 1rem;
    cursor: pointer;
}
.titem{
    background-color: rgb(155, 255, 4);
    padding: 0.25rem;
    border-radius: 0.5rem;
    margin-right: 0.25rem;
    margin-top: 0.25rem;
    cursor: pointer;
    min-width: 5rem;
    display: inline-block;
}
.side {
    background-color: antiquewhite;
}
.lie {
    background-color: blueviolet;
}
</style>