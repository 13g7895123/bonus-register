<template>
    <!-- login box -->
    <div id='bg' class="w-screen h-screen">
        <div id="phone-validation-box" class="rounded-lg">
            <div id="mask"></div>
            <h2 class="text-white mt-12">註冊帳號</h2>
            <h3 id='server_name' class="text-white mt-3">【{{ server_name }}】</h3>
            <PhoneValidation />
        </div>
    </div>
</template>
<script setup>
import PhoneValidation from '../form/PhoneValidation.vue';
import { onMounted, ref } from 'vue'
import { useRouter } from "vue-router";
import axios from 'axios'

const router = useRouter()
const server = ref()
const server_name = ref()
const apiUrl = ref()
const apiParam = ref()
const apiUrlPrefix = '/api/'

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
        server_name.value = data.name
    }
}

</script>
<style>
#bg{
    display: flex;
    align-items: center;
    justify-content: center;
    background: url('../../assets/bg-1.jpg') no-repeat;
    background-size: cover;
    background-position: center;
    animation: bg-rotate 5s linear infinite;
}
@keyframes bg-rotate{
    100% {
        filter: hue-rotate(360deg);
    }
} 
</style>