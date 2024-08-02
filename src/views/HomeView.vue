<script setup lang="ts">
import { ref } from 'vue'
import { useCurrentUserStore } from '@/stores/currentUser';
import { useRouter } from 'vue-router';
import auth from '@/api/auth';
import server from '@/api';
import {
    Menu as IconMenu,
    Location,
    Setting,
    Avatar,
    Bell,
    Box
} from '@element-plus/icons-vue'
import ChangePasswd from './ChangePasswd.vue';
import { ElTag } from 'element-plus';
import warehouse from '@/api/warehouse';
const router = useRouter()
const currentUser = useCurrentUserStore()
const kv = ref<any[]>([{
    value: '总公司',
    key: 0
}])
warehouse.kv().then(res => {
    kv.value.push(...res.data.value)

})
function logout() {
    auth.logout().then(res => {
        currentUser.logout()
        router.push({ path: '/login' })
    })
}
const v = ref(false)
</script>

<template>
    <div class=" flex overflow-hidden w-full">
        <div class="flex flex-col h-screen">
            <div>head</div>
            <el-menu class=" flex-1 el-menu-vertical-demo" default-active="1">
                <el-menu-item v-if="currentUser.getUserDetail()?.username == 'admin'"
                    @click="$router.push('/warehouse')" index="1">
                    <el-icon>
                        <Box />
                    </el-icon>
                    <span>仓库管理</span>
                </el-menu-item>
                <el-menu-item @click="$router.push('/house')" index="2">
                    <el-icon>
                        <Location />
                    </el-icon>
                    <span>仓房管理</span>
                </el-menu-item>
                <el-menu-item @click="$router.push('/entry')" index="3">
                    <el-icon>
                        <setting />
                    </el-icon>
                    <span>仓房入库管理</span>
                </el-menu-item>
                <el-menu-item v-if="currentUser.getUserDetail()?.username == 'admin'" @click="$router.push('/user')"
                    index="4">
                    <el-icon>
                        <Avatar />
                    </el-icon>
                    <span>用户管理</span>
                </el-menu-item>
                <el-menu-item @click="$router.push('/data')" index="5">
                    <el-icon>
                        <IconMenu />
                    </el-icon>
                    <span>数据查看</span>
                </el-menu-item>
                <el-menu-item @click="$router.push('/alarm')" index="6">
                    <el-icon>
                        <Bell />
                    </el-icon>
                    <span>报警信息查看</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class=" flex-1 flex flex-col items-end">
            <div class="p-8">

                <ElTag>{{ currentUser.getUserDetail()?.username }}</ElTag>
                <ElTag type="success">{{
                    kv.filter(x => x.key == currentUser.getUserDetail()!.companyID)[0]?.value
                }}</ElTag>
                <el-button type="primary" @click="v = true">修改密码</el-button>
                <el-button type="danger" @click="logout">退出</el-button>

            </div>
            <div class="px-8 w-full">
                <RouterView />
            </div>
        </div>
    </div>
    <ChangePasswd :dialog-visible="v" @close="v = false"></ChangePasswd>
</template>
