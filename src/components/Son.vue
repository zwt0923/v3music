<script setup>
import { ref, onMounted, inject } from 'vue';
import { storeToRefs } from 'pinia'
import { useCounterStore ,} from '../store/testStore'
const store = useCounterStore();
console.log('store',store.count,store.double);
const {count, double} = storeToRefs(store);
const props = defineProps(['data'])
onMounted(() => { })

// const { count, setCount } = inject('count')
</script>

<template>
  <div>孙子组件
    <h1>{{ count }}</h1>
    <!-- <button @click="setCount">ddd</button> -->
    <button @click="store.increment()">修改store的值</button>
  </div>
</template>

<style scoped lang='scss'></style>