<template>
    <!-- login box -->
    <div id='bg' class="w-screen h-screen">
        <div id="login-box" class="rounded-lg">
            <div id="mask"></div>
            <h2 class="text-white mt-12">註冊帳號</h2>
            <h3 class="text-white">【{{ server.value }}】</h3>
            <PhoneValidation />
        </div>
    </div>
</template>
<script setup>
import PhoneValidation from '../form/PhoneValidation.vue';
import { onMounted, ref } from 'vue'
import { useRouter } from "vue-router";

const router = useRouter()
const server = ref()

onMounted(() => {
    server.value = router.currentRoute._value.params.server
    console.log(server.value);
})

</script>