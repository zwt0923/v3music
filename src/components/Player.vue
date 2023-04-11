<script setup>
import {
  ref,
  onMounted,
  inject,
  computed,
  watch,
  watchPostEffect,
  onBeforeUnmount,
} from "vue";
import {
  StepBackwardOutlined,
  StepForwardOutlined,
  CaretRightOutlined,
  PauseOutlined,
} from "@ant-design/icons-vue";
import { formatTime, intToPercent } from "../tool/index";
import { throttle } from "../tool/index";

//从inject获取音乐详情
const { songdetails, updateSongdetails } = inject("songdetails", {});
//进度条百分比
const sliderVal = ref(0);
const msToS = 1000; //毫秒转秒
//进度条拖动结束后获取当前进度
const changeSlider = () => {
  audio.ontimeupdate = null;
  cpdCurrentTime();
};
const afchangeSlider = (val) => {
  songdetails.value.url &&
    (audio.currentTime =
      (songdetails.value.time * sliderVal.value) / (msToS * 100));
  audio.ontimeupdate = throttle(currentTimeChage, 1000);
};
//
onBeforeUnmount(() => {
  // 停止播放音频
  audio.pause();
  // 从DOM中删除音频对象
  audio.remove();
});

//监听音乐详情变换并处理相关数据
watch(songdetails, () => {
  // 处理inject的变化
  sliderVal.value = 0;
  audio.pause();
  playUrl.value = songdetails.value.url || "";
  audio.src = playUrl.value;
  audio.currentTime = 0;
  audio.play();
  isPlay.value = true;
});
//音乐播放路径
const playUrl = ref("");
//判断当前播放状态
const isPlay = ref(false);
//播放暂停事件
const Play = () => {
  playUrl.value = songdetails.value.url || "";
  if (!playUrl.value || !audio) {
    return;
  }
  // audio.src = playUrl.value;
  isPlay.value ? audio.pause() : audio.play();
  isPlay.value = !isPlay.value;
};
//定义一个Audio元素
let audio=null;
//计算当前播放时间
const cpdCurrentTime = () => {
  currentTime.value = (songdetails.value.time * sliderVal.value) / 100 || 0;
};
const currentTime = ref("0");
//音频播放时当前进度改变
const currentTimeChage = (v) => {
  sliderVal.value = (audio?.currentTime * msToS * 100) / songdetails.value.time;
  cpdCurrentTime();
};
//挂载完成后获取当前url并创建audio元素
onMounted(() => {
  playUrl.value = songdetails.value.url || "";
  audio = new Audio(playUrl.value);
  audio.src = playUrl.value;
  audio.ontimeupdate = throttle(currentTimeChage, 1000);
});
</script>

<template>
  <div id="player">
    <div class="content">
      <a-space align="end">
        <a-button shape="circle" @click="Play">
          <template #icon><StepBackwardOutlined /></template>
        </a-button>
        <a-button shape="circle" @click="Play">
          <template #icon v-if="isPlay"><PauseOutlined /></template>
          <template #icon v-else-if="!isPlay"><CaretRightOutlined /></template>
        </a-button>
        <a-button shape="circle">
          <template #icon><StepForwardOutlined /></template>
        </a-button>
        <div style="width: 460px">
          <a-slider
            :tipFormatter="null"
            v-model:value="sliderVal"
            @change="changeSlider"
            @afterChange="afchangeSlider"
          />
        </div>
        <div>
          <p class="sliderText">
            {{ formatTime(currentTime) }}/
            {{ formatTime(songdetails.time || 0) }}
          </p>
        </div>
      </a-space>
    </div>
  </div>
</template>

<style scoped lang='scss'>
#player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 53px;
  min-width: 980px;
  padding: 0 calc((100% - 980px) / 2);
  background: rgb(48, 48, 48);
  .content {
    width: 137px;
    height: 100%;
    display: flex;
    align-items: center; /* 垂直居中 */
    .sliderText {
      display: inline-block;
      margin: auto;
      vertical-align: super;
      color: #fff;
      width: 80px;
    }
  }
}
</style>