<template>
    <!-- login box -->
    <div id='bg' class="w-screen h-screen">
        <div id="register-box" class="rounded-lg">
            <div id="mask"></div>
            <h2 class="text-white mt-12">註冊帳號</h2>
            <h3 id='server_name' class="text-white mt-3">【{{ server_name }}】</h3>
            <Register />
        </div>
        <VueDatePicker 
            v-model='birthday2' 
            :format="dateFormat"
            placeholder="出生年月日"
            hide-input-icon
            auto-apply
            :enable-time-picker="false"
        />
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
.dp__main dp__theme_light{
    position: absolute;
    top: 0;
    left: 0;
}
</style>