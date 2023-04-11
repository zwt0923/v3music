<script setup>
import { ref, inject, onMounted, onUpdated } from 'vue';
import Api from "../api/search";
const imgSrc = ref('');
const lyric=ref('')
const { songdetails, updateSongdetails } = inject("songdetails", {});
onMounted(() => {
  imgSrc.value = 'https://p1.music.126.net/LWamdPAD-HOmn7O6batfrw==/109951165400478653.jpg?param=130y130';

})
onUpdated(() => {
  console.log('songdetails', songdetails)
  if (songdetails.value.id) {
    Api.getLyric({ params: { id: songdetails.value.id } }).then(res => {
      lyric.value = res.tlyric.lyric.replace(/\[\d{2}:\d{2}.\d{3}\]/g, "").replace(/\n/g, "<br>").replace(/  /g, "");
      console.log('res', res.lrc.lyric)
    })  
  }
})
</script>

<template>
  <div class="lyric">
    <div class="lyricR">
      <img :src="imgSrc" alt="专辑">
      <div class="lyrics">
      <!-- 歌曲信息 -->
        <p class="musicName"> {{ songdetails.musicName }}</p>
        <p class="smallP">歌手: <a href="">{{ songdetails.singer }}</a></p>
        <p class="smallP">所属专辑: <a href="">{{ songdetails.album }}</a></p>
      <!-- 歌词 -->
        <div v-html="lyric" class="lyric-content">
        </div>
      </div>

    </div>
    <div class="lyricL">
      这里放其他
    </div>
  </div>
</template>

<style scoped lang='scss'>
.lyric {
  width: 100%;
  background-color: rgb(255, 255, 255);
  border-right : 1px solid #d3d3d3;
  border-left : 1px solid #d3d3d3;
  display: flex;
  flex: 1;

  .lyricR {
    width: calc(100% - 270px);
    padding: 20px;
    display: flex;

    img {
      width: 160px;
      height: 160px;
      margin: 34px;
      border-radius: 50%;
      border: 30px solid;
    }
    .lyric-content{
      // overflow: auto;
      // max-height:500px;
    }
  }

  .lyricL {
    width: 270px;
  }

  .musicName {
    font-size: 24px;
    font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
  }
}
.smallP{
  font-size: 12px;
  a{
    &:hover{
    text-decoration: underline;

    }
  }
}
</style>