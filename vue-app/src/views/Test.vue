<template>
    <button @click="move">Move</button>
</template>
<script setup>
import { useRouter } from "vue-router";

const router = useRouter()

const move = () =>{
  router.push('/phonevalidation/test_server')
}

</script>