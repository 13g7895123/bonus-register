<template>
    <form id="form_area">
        <div class="inp_group mt-3">
            <input v-model = 'phone' required>
            <span class="">手機號碼</span>
            <i></i>
        </div>
        <div class="inp_group mt-2">
            <input v-model = 'code' required>
            <span>認證碼</span>
            <i style="width: 60%;"></i>
            <div id='btn_send_code' class="btn" @click="sendCode">發送認證碼</div>
        </div>
        <div class="bg-white rounded flex justify-center items-center btn py-1 mb-2 mt-6" @click="submit">送出</div>
        <hr class="mt-5">
        <div 
            class="bg-white rounded flex justify-center items-center btn py-1 mt-5"
            @click = "router.push('/checkAccount')"
            >查詢帳號</div>
        <div
            class="bg-white rounded flex justify-center items-center btn py-1 mt-3"
            @click = "router.push('/forgetPassword')"
            >找回密碼</div>
    </form>
</template>
<script setup>
import { ref } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from "vue-router";

// const server = ref()
const phone = ref()
const code = ref()
const apiUrl = ref()
const apiParam = ref()
const apiUrlPrefix = '/api/bonus-register/'
const router = useRouter()

// onMounted(() => {
//     server.value = router.currentRoute._value.params.server
// })

const sendCode = async() => {
    if (phone.value != ''){     // 驗證手機號碼不可為空值
        const formData = ref({
            phone: phone.value,
        })
        apiParam.value = '?action=sendCode'
        apiUrl.value = apiUrlPrefix + "phone.php" + apiParam.value

        const { data: { success, msg } } = await axios.post(
            apiUrl.value, formData.value
        )

        if (success){
            Swal.fire({
                title: '系統通知',
                text: msg,
                icon: 'success',
                showConfirmButton: false,
                showCancelButton: false,
                timer: 2000
            })     
        }else{
            Swal.fire({
                title: '系統訊息',
                text: msg,
                icon: 'error',
                showConfirmButton: false,
                showCancelButton: false,
                timer: 2000
            })
        }
    }else{
        // please input phone
        Swal.fire({
            title: '系統訊息',
            text: '請輸入手機號碼',
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 2000
        })
    }
}

const submit = async() => {
    // const formData = ref({
    //     phone: phone.value,
    //     code: code.value
    // })
    // apiParam.value = '?action=varify_validation_code'
    // apiUrl.value = apiUrlPrefix + "phone.php" + apiParam.value

    // const { data: { success, msg } } = await axios.post(
    //     apiUrl.value, formData.value
    // )
    const success = true
    const msg = 'test'

    if (success){
        // emits('closeDialog')
        Swal.fire({
            title: `系統訊息`,
            text: msg,
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 2000,
        }).then(() =>{
            router.push({
                name: "register",
                query: {
                    server: server.value,
                    phone: phone.value,
                },
            })
        })
        
    }else{
        Swal.fire({
            title: '系統訊息',
            text: msg,
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 2000
        })
        code.value = ''
    }
}
</script>
<style>

</style>