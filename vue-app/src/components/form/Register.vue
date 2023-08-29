<template>
    <form id="form_area">
        <div class="inp_group mt-3">
            <input v-model = 'account' required>
            <span class="">遊戲帳號</span>
            <i></i>
        </div>
        <div class="inp_group mt-2">
            <input v-model='password' type="password" required>
            <span class="">密碼</span>
            <i></i>
        </div>
        <div class="inp_group mt-2">
            <input v-model = 'checkPassword' type="password" required>
            <span class="">確認密碼</span>
            <i></i>
        </div>
        <div class="inp_group mt-2">
            <input v-model = 'birthday' required>
            <span class="">生日(西元年/月/日)</span>
            <i></i>
        </div>
        <div class="inp_group mt-2">
            <input v-model = 'code' required>
            <span>驗證碼</span>
            <i style="width: 58%;"></i>
            <IdentifyCode
                ref="identify"
                class="code-box"
                :contentWidth="110"
                :contentHeight="40"
                @updateIdentifyCode="setIdentifyCode"
                >
            </IdentifyCode>
        </div>
        <div 
            class="bg-white rounded flex justify-center items-center btn py-1 mt-6"
            @click = "submit"
            >提交註冊</div>
        <div
            class="bg-white rounded flex justify-center items-center btn py-1 mt-3"
            @click = "router.push({ path: `/phonevalidation/${server}` })"
            >取消註冊</div>
    </form>
</template>
<script setup>
import IdentifyCode from '../tools/IdentifyCode.vue';
import { onMounted, ref } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from "vue-router";

const server = ref()
const phone = ref()
const account = ref()
const password = ref()
const checkPassword = ref()
const birthday = ref()
const apiUrl = ref()
const apiParam = ref()
const apiUrlPrefix = '/api/bonus-register/'
const router = useRouter()

onMounted(() => {
    server.value = router.currentRoute._value.params.server
    phone.value = router.currentRoute._value.params.phone
})

const submit = async() => {
    let swalData = []
    swalData['title'] = '系統訊息';

    if (password.value == checkPassword.value){
        const formData = ref({
            account: account.value,
            password: password.value,
            phone: phone.value,
            birthday: birthday.value
        })
        apiParam.value = '?action=register'
        apiUrl.value = apiUrlPrefix + "register.php" + apiParam.value

        const { data: { success, msg } } = await axios.post(
            apiUrl.value, formData.value
        )

        if (success){
            swalData['text'] = msg;
            swalData['icon'] = 'success';
            swal(swalData)
        }else{
            swalData['text'] = msg;
            swalData['icon'] = 'error';
            swal(swalData)
            code.value = ''
        }
    }else{
        swalData['text'] = '密碼不相符，請重新確認';
        swalData['icon'] = 'error';
        swal(swalData)
    }
}

const swal = (data) => {
    Swal.fire({
        title: data['title'],
        text: data['msg'],
        icon: data['icon'],
        showConfirmButton: false,
        showCancelButton: false,
        timer: 2000
    })
}

const identify = ref(null);
const validateIdentifyCode = (rule, value, callback) => {
    if (value !== curIdentifyCode.value) {
        callback(new Error("驗證碼错误!"));
        state.loginForm.identifyCode = "";
        identify.value.refreshCode();
    } else {
        callback();
    }
};
let curIdentifyCode = ref("");

const setIdentifyCode = (val) => {
  curIdentifyCode.value = val;
};
</script>