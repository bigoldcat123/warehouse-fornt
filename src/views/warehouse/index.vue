<template>
    <div class="mb-4">
        <el-button @click="addDialog = true" type="primary">新增</el-button>
    </div>
    <div>
        <el-table :data="list?.records" border>
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="warehouseNo" label="仓库编号" />
            <el-table-column prop="warehouseName" label="仓库名" />
            <el-table-column prop="warehouseAddress" label="地址" />
            <el-table-column label="操作">
                <template #default="scope">
                    <!-- {{ scope.row.id }} -->
                    <el-button type="primary" size="small" @click="() => {current= scope.row;updateDialog = true;}">编辑</el-button>
                    <el-button type="danger" size="small" @click="() => warehouse.deleteById(scope.row.id).then(() => fetchData())">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @current-change="pagechange" :default-page-size="size"  :page-count="list?.pages" layout="prev, pager, next"  />
    </div>  
    <AddDialog :dialog-visible="addDialog" @refresh="fetchData" @close="addDialog = false"></AddDialog>
    <UpdateDialog :warehouse="current!" :dialog-visible="updateDialog" @refresh="fetchData" @close="updateDialog = false"></UpdateDialog>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import warehouse, { type type_WareHouse } from '@/api/warehouse';
import AddDialog from './AddDialog.vue';
import UpdateDialog from './UpdateDialog.vue';
const list = ref<Page<type_WareHouse>>()
const visible = ref(false)
const addDialog = ref(false)
const updateDialog = ref(false)
const current = ref<type_WareHouse>()
const currentpage = ref(1)
const size = ref(import.meta.env.ENV_PAGE_SIZE)
function fetchData() {
    warehouse.list(currentpage.value,size.value).then(res => {
        list.value = res.data.value
    })
}
fetchData()
function pagechange(page: number) {
    currentpage.value = page
    fetchData()
}
</script>
<style scoped></style>