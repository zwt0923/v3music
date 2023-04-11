<script setup>
import { ref, onMounted,provide  } from "vue";
import { useRouter } from "vue-router";
import Header from "../components/Header.vue"
import Banner from "../components/Banner.vue"
import Player from "../components/Player.vue"
import SearchTabs from "../components/SearchTabs.vue"
const songList =ref([])
function updateSongList(data) {
  songList.value = data
}
provide('songList', songList);
  provide('songList', {
  songList,
  updateSongList
})
const songdetails =ref({})
function updateSongdetails(data) {
  songdetails.value = data;
}
provide("songdetails", {
  songdetails,
  updateSongdetails,
});
// 创建 router 对象，调出方法
const router = useRouter();

</script>

<template>
  <div>
      <a-layout>
    <a-layout-header >
      <!-- top -->
      <Header/>
      </a-layout-header>
    <a-layout-content>  
      <div style="width:900px; margin:0 auto">
      <SearchTabs/>

      </div>
      <!-- banner -->
          <!-- <Banner/> -->
</a-layout-content>
    <a-layout-footer>Footer</a-layout-footer>
  </a-layout>
  <Player />
    <!-- <router-view />暂时没用 -->
  </div>
</template>

<style scoped lang='scss'>
.ant-layout-header{
  background: #242424;
  height: 70px;
}
</style>