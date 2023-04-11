
<script setup>
import { ref, onMounted, provide } from "vue";
import Lyric from "../components/Lyric.vue";
import SongList from "../components/SongList.vue";
import PlayList from "../components/PlayList.vue";
import { inject } from "vue";

onMounted(() => {});
const paneKey = [
  { key: 1, type: "单曲" },
  { key: 10, type: "专辑" },
  { key: 100, type: "歌手" },
  { key: 1000, type: "歌单" },
  { key: 11002, type: "用户" },
  { key: 0, type: "歌曲" },
];
const activeKey = ref(1);
</script>

<template>
  <div>
    <a-tabs v-model:activeKey="activeKey">
      <!-- 想循环搞出来 但是有点问题不知道怎么实现 先往下走 -->
      <!-- <a-tab-pane v-for="item in paneKey" :key="item.key" :tab="item.type">{{item.type}}</a-tab-pane> -->
      <a-tab-pane :key="1" tab="单曲"><SongList /></a-tab-pane>
      <a-tab-pane :key="0" tab="歌词" ><Lyric/></a-tab-pane>
      <a-tab-pane :key="1000" tab="歌单" force-render><PlayList/></a-tab-pane>
    </a-tabs>
  </div>
</template>

<style scoped lang='scss'>
</style>