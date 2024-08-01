<template>
    <div>
        {{ user.getUserDetail() }}
    </div>
    <div class=" flex">
        <div>
            <div>level
                <el-checkbox-group v-model="levels">
                    <el-checkbox :disabled="!user.getPriv()?.includes('1')" label="一般报警" value="一般报警" size="large" />
                    <el-checkbox :disabled="!user.getPriv()?.includes('2')" label="严重报警" value="严重报警" size="large" />
                </el-checkbox-group>
            </div>
            <div>type
                <el-checkbox-group v-model="types">
                    <el-checkbox value="发热" label="发热" size="large" />
                    <el-checkbox value="不连续" label="不连续" size="large" />
                    <el-checkbox value="霉变趋势" label="霉变趋势" size="large" />
                    <el-checkbox value="结露趋势" label="结露趋势" size="large" />
                    <el-checkbox value="空仓" label="空仓" size="large" />
                    <el-checkbox value="备用类型" label="备用类型" size="large" />
                </el-checkbox-group>
            </div>
        </div>
        <div>
            <el-button type="primary" @click="fetchData">搜索</el-button>
        </div>
    </div>
    <div>
        <el-table :data="alarmList" border>
            <!-- <el-table-column prop="id" label="ID" /> -->
            <el-table-column prop="alarm.houseID" label="仓房编号" />
            <el-table-column prop="alarm.alertPos" label="位置"   />
            <el-table-column prop="alarm.alertLevel" label="等级"   >
                <template #default="scope">
                    <el-tag v-if="scope.row.alarm.alertLevel == '一般报警'" type="warning">{{ scope.row.alarm.alertLevel }}</el-tag>
                    <el-tag v-else type="danger">{{ scope.row.alarm.alertLevel }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="alarm.alertType" label="类型"  />
            <el-table-column prop="alarm.alertTime" label="时间"  />
            <el-table-column prop="yuntu" label="云图" width="80" >
                <template #default="scope">
                    <el-button type="primary" size="small" @click="$router.push({path:'/show',query:{imgs:scope.row.yuntu}})" >查看</el-button>
                </template>
            </el-table-column>
            <el-table-column  label="审核"   >
                <template #default="scope">
                    <el-tag v-if="scope.row.alarm.isVerify" type="success">已审核</el-tag>
                    <el-tag v-else type="danger">未审核</el-tag>
                    <el-button v-if="scope.row.alarm.isVerify" type="primary" size="small" @click="showHandleDialog = true;currentHandle = scope.row.alarm.handle" >查看审核</el-button>
                    <el-button :disabled="!user.getPriv()?.includes('3')" v-else type="success" size="small" @click="handleDialog = true;currentid = scope.row.alarm.id" >审核</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <handle :id="currentid" :dialogVisible="handleDialog" @close="handleDialog = false" @refresh="fetchData"></handle>
    <ShowHandle :handle="currentHandle" :dialogVisible="showHandleDialog" @close="showHandleDialog = false"></ShowHandle>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import alarm, { type type_Alarm } from '@/api/alarm';
import handle from './Handle.vue';
import ShowHandle from './ShowHandle.vue';
import { useCurrentUserStore } from '@/stores/currentUser';
const levels = ref<string[]>([])
const types = ref<string[]>([])
const alarmList = ref<type_Alarm[]>([])
const currentid = ref(undefined)
const currentHandle = ref('')
const handleDialog = ref(false)
const showHandleDialog = ref(false)
const user = useCurrentUserStore()
function fetchData() {
    alarm.list(levels.value, types.value).then(res => {
        alarmList.value = res.data.value
    })
}
fetchData()
</script>
<style scoped></style>