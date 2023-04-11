<script setup>
import { ref, onMounted, onBeforeMount, reactive, watch, renderSlot } from "vue";
import { SearchOutlined } from "@ant-design/icons-vue";
import { message, Modal } from "ant-design-vue";
import { inject } from "vue";
import { debounce } from "../tool/index";
import searchApi from "../api/search";
import Login from '../api/login';
const { songList, updateSongList } = inject("songList", []);
onBeforeMount(() => { });
//关键字搜索
const getSearchKeyWrod = debounce((newVal, oldVal) => {

  if (search.value.length !== 0) {
    let params = { keywords: search.value, limit: 10 };
    searchApi.searchKeyWrod({ params }).then((res) => {
      if (res.result?.songs) {
        // store.increment(res.result.songs || []);//不用store
        updateSongList(res.result.songs || []);
      } else {
        message.warning("获取歌曲列表失败");
      }
    });
  } else {
    updateSongList([]);
  }
}
  , 1000);
const headerList = ref([
  "发现音乐",
  "我的音乐",
  "关注",
  "商城",
  "音乐人",
  "下载客户端",
]);
const search = ref("");
watch(search, getSearchKeyWrod);
const loginKey = ref('');//登录key
const loginImg = ref('');//二维码img
//登录 分三步 
const getKey = () => {
  Login.loginGetKey().then(res => {
    if (res.code == 200 && res.data.code === 200 && res.data.unikey) {
      loginKey.value = res.data.unikey
      Login.loginCreate({ key: res.data.unikey, qrimg: true, timestamp: Date.now() }).then(res => {
        loginImg.value = res.data.qrimg
      })
      open.value = true;
      timer = setInterval(loginCheck, 2000)
    } else {
      message.warning(res.data.message || "未知错误");
    }
  })
}
//检查登录状态 
const loginCheck = () => {
  Login.loginCheck({ key: loginKey.value, timestamp: Date.now() }).then(res => {
    console.log('res', res)
    switch (res.code) {
      case 800:
        message.warning("二维码过期");
        getKey();
        clearInterval(timer);
        timer = null;
        break;
      case 803:
        message.success(res.message || "登录成功");
        open.value = false;
        sessionStorage.setItem('cookie', res.cookie);
        clearInterval(timer);
        timer = null;
      default:
        break;
    }
  })
}
let timer = null;
const open = ref(false);
const cancelModal = () => {
  clearInterval(timer);
  timer = null;
  open.value = false;
}
const gets = () => {
  Login.loginStatus({cookie:sessionStorage.getItem("cookie")}).then(res => {
    console.log('res', res)
  })
}
</script>

<template>
  <div class="header">
    <h1 class="logo"></h1>
    <ul>
      <li v-for="(item, index) in headerList" :key="index">
        {{ item }}
      </li>
      <li>
        <a-input class="circle" v-model:value="search" placeholder="音乐/视频/电台/用户">
          <template #prefix>
            <search-outlined />
          </template>
        </a-input>
      </li>
    </ul>
    <a class="login" href="#" @click="getKey">登录</a>
    <button @click="gets"> 查询状态</button>
  </div>
  <a-modal :visible="open" title="扫码登录" @cancel='cancelModal'>
    <img style="width: 125px;height: 220px;  margin-right: 65px;margin-left: 20px;" src="../assets/login.png" alt="扫码登录">
    <img :src="loginImg" alt="二维码登录">
    <template #footer>
    </template>
  </a-modal>
</template>

<style scoped lang='scss'>
.header {
  color: #fff;
  width: 1100px;
  margin: 0 auto;
  height: 70px;
  display: flex;

  ul {
    display: flex;

    .liActive {
      background: rgb(0, 0, 0);
      color: #fff;
    }

    li {
      display: inline-block;
      height: 70px;
      padding: 0 19px;
      color: #ccc;



      &:hover {
        background: rgb(0, 0, 0);
        color: #fff;
      }
    }
  }

  .login {
    display: block;
    width: 28px;
    margin-top: 7px;
    line-height: 55px;
    color: #787878;

    &:hover {
      text-decoration: underline;
    }
  }
}

.logo {
  float: left;
  width: 176px;
  height: 69px;
  background: url(../assets/topbar.png) no-repeat 0 9999px;
  background-position: 0 0;
}

.circle {
  color: #000;
  border-radius: 20px;

  &:hover {
    border-color: #ffffff00 !important;
  }
}
</style>