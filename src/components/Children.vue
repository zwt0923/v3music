<script setup>

import { ref, onMounted, reactive, inject } from "vue";
import Son from './Son.vue';
const props = defineProps(["data"]);
const { data } = props;
onMounted(() => {
});
const cc = ref('zzz')
const zz = reactive({ name: 'zzz', age: 11 })
const emit = defineEmits(['chlidrenFn']);
function changeData() {
  emit('chlidrenFn', zz)
}
</script>
<template>
  <div>
    children --
    <p>姓名--{{ data.name }}</p>
    <p>子组件年龄--{{ data.age }}</p>
    <button @click="changeData"> 年龄++</button>
    <Son />
  </div>
</template>
<style scoped lang='scss'></style>