<template>
    <div class="mb-4">
        <el-button @click="addDialog = true" type="primary">入库</el-button>
    </div>
    <div>
        <el-table :data="list" border>
            <!-- <el-table-column prop="id" label="ID" /> -->
            <el-table-column label="仓房" >
                <template #default="scope">
                    {{ kv.filter(x=>x.key == scope.row.houseID)[0]?.value }}
                </template>
            </el-table-column>
            <el-table-column prop="breed" label="品种" />
            <el-table-column prop="entryTime" label="入库时间" />
            <el-table-column prop="water" label="GrainWater" />
            <el-table-column label="操作">
                <template #default="scope">
                    <!-- {{ scope.row.id }} -->
                    <el-button type="primary" size="small" @click="() => {current= scope.row;updateDialog = true;}">编辑</el-button>
                    <el-button type="danger" size="small" @click="() => entry.deleteById(scope.row.id).then(() => fetchData())">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <AddDialog :dialog-visible="addDialog" @refresh="fetchData" @close="addDialog = false"></AddDialog>
    <UpdateDialog :entry="current!" :dialog-visible="updateDialog" @refresh="fetchData" @close="updateDialog = false"></UpdateDialog>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import entry, { type type_Entry } from '@/api/entry';
import house from '@/api/house';
import AddDialog from './AddDialog.vue';
import UpdateDialog from './UpdateDialog.vue';
const list = ref<type_Entry[]>([])
const addDialog = ref(false)
const updateDialog = ref(false)
const current = ref<type_Entry>()
function fetchData() {
    entry.list().then(res => {
        list.value = res.data.value
    })
}
const kv = ref<any[]>([])
house.kv().then(res => {
    kv.value = res.data.value
})
fetchData()
</script>
<style scoped></style>