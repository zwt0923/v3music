<script setup>
import { ref, reactive, computed, watch, provide } from "vue";
import Children from "./Children.vue"

const count = reactive({ name: '父组件', title: "标题" });
const setCount = () => {
  count.name = '改变父组件name'
}
const obj = reactive({ name: "zzz", age: 12, arr: [1, 2, 3, 4] });
const dou = computed(() => obj.age * 2);
// watch(obj.arr, (newValue, oldValue) => {
//   console.log("newValue", newValue);
//   console.log("oldValue", oldValue);
// },{deep: true});
const fatherFn = (data) => {
  console.log('父组件方法', data);
}
provide('count', {
  count,
  setCount
})
</script>

<template>
  <div>
    <p>
      父组件年龄{{ obj.age }}
    </p>
    <button @click="obj.age++">父组件年龄</button>
    <children :data="obj" @chlidrenFn="fatherFn" />
  </div>
</template>

<style scoped></style>
