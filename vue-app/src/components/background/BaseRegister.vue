<template>
    <!-- login box -->
    <div id='bg' class="w-screen h-screen">
        <div id="register-box" class="rounded-lg">
            <div id="mask"></div>
        </div>
        <div id="register-form" class="rounded-lg">
            <h2 class="text-white mt-12">註冊帳號</h2>
            <h3 id='server_name' class="text-white mt-3">【{{ server_name }}】</h3>
            <Register />
        </div>
    </div>
</template>
<script setup>
import Register from '../form/Register.vue';
import { onMounted, ref } from 'vue'
import { useRouter } from "vue-router";
import axios from 'axios'

const router = useRouter()
const server = ref()
const server_name = ref()
const apiUrl = ref()
const apiParam = ref()
const apiUrlPrefix = '/api/bonus-register/'

const birthday2 = ref()

onMounted(async() => {
    server.value = router.currentRoute._value.params.server
    get_server()
})

const get_server = async() => {
    const formData = ref({
        server: server.value,
    })
    apiParam.value = '?action=server_name'
    apiUrl.value = apiUrlPrefix + "common.php" + apiParam.value

    const { data: { success, data } } = await axios.post(
        apiUrl.value, formData.value
    )

    if (success){
        server_name.value = data;
    }
}
</script>
<style>
#register-form{
    width: 350px;
    height: 560px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    backdrop-filter: blur(10px);
    z-index: 999;
}

.dp__main{
    width: 280px;
    height: 50px;
    position: absolute;
    top: 24.5rem;
    left: 50%;
    transform: translateX(-50%);
    background: transparent;
    z-index: 999;
    
}

.dp__input_wrap{
    width: 280px;
    height: 50px;
}
</style>