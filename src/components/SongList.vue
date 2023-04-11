<script setup>
import { ref, onBeforeMount, watch } from "vue";
import { PlayCircleFilled } from "@ant-design/icons-vue";
import { inject } from "vue";
import { debounce } from "../tool/index";
import Api from "../api/search";
const { songList, updateSongList } = inject("songList", []);
const { songdetails, updateSongdetails } = inject("songdetails", {});
const list = ref([]);
watch(songList, () => {
  list.value = songList.value.map((item) => {
    return {
      id: item.id,
      musicName: item.name,
      singer: item.ar[0].name,
      album: item.al.name,
    };
  });
});
const columns = [
  {
    title: "歌名",
    dataIndex: "musicName",
    key: "musicName",
  },
  {
    title: "歌手",
    dataIndex: "singer",
    key: "singer",
  },
  {
    title: "专辑",
    dataIndex: "album",
    key: "album",
  },
];
const play = debounce((item) => {
  Api.getSong({ params: { id: item.id } }).then((res) => {
    res.data[0] && updateSongdetails({...res.data[0],...item} || {});
  });
});
</script>

<template>
  <div>
    <a-table :columns="columns" class="ant-table-striped" :data-source="list" :row-class-name="
      (_record, index) => (index % 2 === 1 ? 'table-striped' : null)
    " :pagination="false">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'musicName'">
          <a-button shape="circle">
            <template #icon>
              <PlayCircleFilled @click="play(record)" />
            </template>
          </a-button>
          <a-button type="link">{{ record.musicName }}</a-button>
        </template>
        <template v-if="column.key === 'singer'">
          <a-button class="link" type="text">{{ record.singer }}</a-button>
        </template>
        <template v-if="column.key === 'album'">
          <a-button class="link" type="text">《{{ record.album }}》</a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>

<style scoped lang='scss'>
.link {
  &:hover {
    border-bottom: 1px solid #000000;
    background: none;
  }
}

.ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}
</style>