<template>
    <div class="mb-4">
       起始时间 <el-date-picker v-model="from" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="选择入库时间" />
       结束时间 <el-date-picker v-model="to" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="选择入库时间" />
       <el-input v-model="houseName" class="max-w-48 m-2" placeholder="仓房名" />
       <el-input v-model="warehouseName" class="max-w-48 m-2" placeholder="仓库名" />
       <el-button type="success" @click="fetchData">搜索</el-button>
    </div>
    <div>
        <el-table :data="list" border>
            <!-- <el-table-column prop="id" label="ID" /> -->
            <el-table-column prop="houseId" label="仓房编号" />
            <el-table-column prop="houseName" label="仓房名" />
            <el-table-column prop="inTemperature" label="仓温" width="55" />
            <el-table-column prop="inHumidity" label="仓湿" width="55" />
            <el-table-column prop="maxTemperature" label="高温" width="55" />
            <el-table-column prop="minTemperature" label="低温" width="55" />
            <el-table-column prop="avgTemperature" label="均温" width="55"/>
            <el-table-column prop="layerMax" label="层高" />
            <el-table-column prop="layerMin" label="层底" />
            <el-table-column prop="layerAvg" label="层均" />
            <el-table-column prop="testDate" label="时间" width="90" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="() => $router.push({path:'/data/detail',
                    query:{id:scope.row.id,maxTemperature:scope.row.maxTemperature,minTemperature:scope.row.minTemperature,
                    avgTemperature:scope.row.avgTemperature,layerAvg:scope.row.layerAvg
                    }})">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import data, {type type_Data} from '@/api/data';

const list = ref<type_Data[]>([])
const from = ref<string | null>(null)
const to = ref<string | null>(null)
const houseName = ref<string | null>(null)
const warehouseName = ref<string | null>(null)

function fetchData() {
    data.list(from.value,to.value,houseName.value,warehouseName.value).then(res => {
        list.value = res.data.value
    })
}
fetchData()
</script>
<style scoped></style>