<template>
    <div class="mb-4">
        <el-button @click="addDialog = true" type="primary">新增</el-button>
    </div>
    <div>
        <el-table :data="list?.records" border>
            <!-- <el-table-column prop="id" label="ID" /> -->

            <el-table-column prop="username" label="用户名" />
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="sex" label="性别" width="60" />
            <el-table-column label="所属公司">
                <template #default="scope">
                    {{ kv.filter(x => x.key == scope.row.companyID)[0]?.value }}
                </template>
            </el-table-column>
            <el-table-column prop="position" label="职位" />
            <el-table-column prop="phone" label="手机号" width="100" />
            <el-table-column prop="priv" label="权利" width="168">
                <template #default="scope">
                    <el-tag class="mx-[1px]" v-show="scope.row.priv.length > 0"
                        v-for="item in scope.row.priv.split(',')" :key="item"
                        :type="item == 0 ? 'success' : item == 1 ? 'primary' : item == 2 ? 'danger' : 'warning'">{{
                            privList[item] }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <!-- {{ scope.row.id }} -->
                    <el-button type="primary" size="small"
                        @click="() => { current = scope.row; updateDialog = true; }">编辑</el-button>

                    <!-- <el-button v-if="scope.row.username != 'admin'" type="danger" size="small"
                        @click="() => user.deleteById(scope.row.id).then(() => fetchData())">删除</el-button> -->

                    <el-popconfirm 
                    v-if="scope.row.username != 'admin'" type="danger" size="small"
                    @confirm="() => user.deleteById(scope.row.id).then(() => fetchData())" title="确定删除?">
                        <template #reference>
                            <el-button>删除</el-button>
                        </template>
                    </el-popconfirm>

                </template>
            </el-table-column>
        </el-table>
        <el-pagination @current-change="pagechange" :default-page-size="size" :page-count="list?.pages"
            layout="prev, pager, next" />
    </div>
    <AddDialog :priv-list="privList" :kv="kv" :dialog-visible="addDialog" @refresh="fetchData"
        @close="addDialog = false">
    </AddDialog>
    <UpdateDialog :priv-list="privList" :kv="kv" :current="current!" :dialog-visible="updateDialog" @refresh="fetchData"
        @close="updateDialog = false"></UpdateDialog>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import user, { type type_User, privList } from '@/api/user';
import house from '@/api/house';
import warehouse from '@/api/warehouse';
import AddDialog from './AddDialog.vue';
import UpdateDialog from './UpdateDialog.vue';
const list = ref<Page<type_User>>()
const addDialog = ref(false)
const updateDialog = ref(false)
const current = ref<type_User>()
const currentpage = ref(1)
const size = ref(import.meta.env.ENV_PAGE_SIZE)
function fetchData() {
    user.list(currentpage.value, size.value).then(res => {
        list.value = res.data.value
    })
}
function pagechange(page: number) {
    currentpage.value = page
    fetchData()
}
const kv = ref<any[]>([{
    value: '总公司',
    key: 0
}])
warehouse.kv().then(res => {
    kv.value.push(...res.data.value)

})
fetchData()
</script>
<style scoped></style>