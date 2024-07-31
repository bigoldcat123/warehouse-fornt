<template>
    <div class="mb-4">
        <el-button @click="addDialog = true" type="primary">新增</el-button>
        <span class=" ml-16">
            <el-input v-model="warehouseName" class="max-w-32 m-2" placeholder="请输入仓库名" />
            <el-input v-model="houseNo" class="max-w-32 m-2" placeholder="请输入仓房编号" />
            <el-button type="success" @click="searchList">搜索</el-button>
        </span>
    </div>
    <div>
        <el-table :data="list" border style="width: 100%">
            <!-- <el-table-column prop="id" label="ID" width="60" /> -->
            <el-table-column prop="houseNo" label="仓房编号" />
            <el-table-column prop="houseName" label="仓房名" />
            <el-table-column prop="" label="所属仓库" >
                <template #default="scope">
                    {{ kv.filter(x=>x.key == scope.row.warehouseID)[0]?.value }}
                </template>
            </el-table-column>
            <el-table-column prop="houseAddr" label="地址" />
            <el-table-column prop="houseType" label="仓库类型"  width="70" />
            <el-table-column prop="x" label="行数" width="60"  />
            <el-table-column prop="y" label="列数" width="60"  />
            <el-table-column prop="z" label="层数" width="60"  />
            <el-table-column prop="y" label="云图" width="60"  />
            <el-table-column prop="z" label="曲线" width="60"  />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="() => {current= scope.row;updateDialog = true;}">编辑</el-button>
                    <el-button type="danger" size="small" @click="() => house.deleteById(scope.row.id).then(() => fetchData())">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <AddDialog :kv="kv" :dialog-visible="addDialog" @refresh="fetchData" @close="addDialog = false"></AddDialog>
    <UpdateDialog :kv="kv"  :house="current!" :dialog-visible="updateDialog" @refresh="fetchData" @close="updateDialog = false"></UpdateDialog>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import house, { type type_House } from '@/api/house';
import AddDialog from './AddDialog.vue';
import UpdateDialog from './UpdateDialog.vue';
import warehouse from '@/api/warehouse';
const list = ref<type_House[]>([])
    const sapre_list = ref<type_House[]>([])
const addDialog = ref(false)
const updateDialog = ref(false)
const current = ref<type_House>()
const kv = ref<any[]>([])
const warehouseName = ref('')
const houseNo = ref('')
warehouse.kv().then(res => {
  kv.value = res.data.value
})
function fetchData() {
    house.list().then(res => {
        list.value = res.data.value
        sapre_list.value = res.data.value
        current.value = list.value[0]
    })
}
function searchList() {
    list.value = sapre_list.value.filter(x => {
        return kv.value.filter(s=>s.key == x.warehouseID)[0]?.value.includes(warehouseName.value) && x.houseNo.includes(houseNo.value)
    })
}
fetchData()
</script>
<style scoped></style>