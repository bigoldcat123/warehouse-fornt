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
const router = useRouter()
const currentUser = useCurrentUserStore()
function logout() {
    auth.logout().then(res => {
        currentUser.logout()
        router.push({ path: '/login' })
    })
}
// server.post('/no',{
//     id:'1',
//     testName:'x',
//     email:'xx@som',
//     phone:'1111111111'
// }).then(res => {
//     console.log(res);
    
// })
</script>

<template>
    <div class=" flex overflow-hidden w-full">
        <div class="flex flex-col h-screen">
            <div>head</div>
            <el-menu
                 class=" flex-1 el-menu-vertical-demo"
                default-active="1"
            >
                 <el-menu-item @click="$router.push('/warehouse')" index="1">
                <el-icon><Box /></el-icon>
                <span>仓库管理</span>
                </el-menu-item>
                <el-menu-item @click="$router.push('/house')" index="2">
                <el-icon><Location /></el-icon>
                <span>仓房管理</span>
                </el-menu-item>
                <el-menu-item @click="$router.push('/entry')" index="3">
                <el-icon><setting /></el-icon>
                <span>仓房入库管理</span>
                </el-menu-item>
                <el-menu-item @click="$router.push('/user')" index="4">
                <el-icon><Avatar /></el-icon>
                <span>用户管理</span>
                </el-menu-item>
                <el-menu-item @click="$router.push('/data')" index="5">
                <el-icon><IconMenu /></el-icon>
                <span>数据查看</span>
                </el-menu-item>
                <el-menu-item @click="$router.push('/alarm')" index="6">
                <el-icon><Bell /></el-icon>
                <span>报警信息查看</span>
                </el-menu-item>
      </el-menu>
        </div>
        <div class=" flex-1 flex flex-col">
            <div>
                <button @click="logout">logout</button>
            </div>
            <div class="p-8 w-full">
                <RouterView />
            </div>
        </div>
    </div>
</template>
