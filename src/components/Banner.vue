<script setup>
import { ref, onMounted } from "vue";
const props = defineProps(["data"]);
onMounted(() => {});
const onChange = (current) => {
  console.log(current);
};
</script>

<template>
  <div class="outside">
    <div class="inside">
      <a-carousel  arrows >
        <template #prevArrow>
          <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
            <left-circle-outlined />
          </div>
        </template>
        <template #nextArrow>
          <div class="custom-slick-arrow" style="right: 10px">
            <right-circle-outlined />
          </div>
        </template>
        <div><h3>暂缓</h3></div>
        <div><h3>不如自己写</h3></div>
        <div><h3>费时费力</h3></div>
        <div><h3>他妈的</h3></div>
      </a-carousel>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.outside {
  width: 100%;
  height: 100%;
  .inside {
    width: 982px;
    height: 285px;
    margin: 0 auto;
    .test{
        width: 10px;
        height: 10px;
        background: red;
    }
  }
}

:deep(.slick-slide) {
  text-align: center;
  height: 285px;
  line-height: 285px;
  background: #364d79;
  overflow: hidden;
}

:deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  transition: ease all 0.3s;
  opacity: 0.3;
  z-index: 1;
}
:deep(.slick-arrow.custom-slick-arrow:before) {
  display: none;
}
:deep(.slick-arrow.custom-slick-arrow:hover) {
  color: #fff;
  opacity: 0.5;
}

:deep(.slick-slide h3) {
  color: #fff;
}
.custom-pagination .slick-dots li button {
  background-color: white;
  border: none;
  color: #1890ff;
  margin-left: 8px;
  margin-right: 8px;
}

.custom-pagination .slick-dots li.slick-active button {
  background-color: #1890ff;
  color: white;
}
</style>