<script setup>
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import Login from '../api/login';
import User from '../api/user';
onMounted(() => { })
const loginEWM = ref('')
const loginKey = ref('')
const login = () => {
    Login.loginGetKey().then(res => {
        if (res.code == 200 && res.data.code === 200 && res.data.unikey) {
            loginKey.value = res.data.unikey
            Login.loginCreate({ params: { key: res.data.unikey, qrimg: true, timestamp: Date.now() } }).then(res => {
                console.log('res', res)
                loginEWM.value = res.data.qrimg
            })
        } else {
            message.warning(res.data.message || "未知错误");
        }
    })
}
const login2 = () => {
    Login.loginCheck({ params: { key: loginKey.value } }).then(res => {
        console.log('res', res)
        if (res.code === 803) {
            sessionStorage.setItem('cookie', res.cookie)
        } else {
            message.warning(res.message || "未知错误");
        }
    })
}
const logout = () => {
    Login.logout().then(res => {
        if (res.code == 200) {
            // sessionStorage.clear('cookie')
            message.success("退出登录成功");

        }
    })
}
const test=()=>{
    User.getUser().then(res=>{
        console.log('res',res)
        User.detail({uid:res.account.id}).then(res=>{
            console.log('res',res)
        })
    })
}
</script>

<template>
    <div>
        歌单组件
        <img :src="loginEWM" alt="">
<button @click="test">test</button>
        <button @click="logout">退出</button>
    </div>
</template>

<style scoped lang='scss'></style>