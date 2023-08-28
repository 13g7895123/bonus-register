<template>
    <form id="form_area">
        <div class="inp_group mt-12">
            <input v-model = 'account' required>
            <span class="">遊戲帳號</span>
            <i></i>
        </div>
        <div class="inp_group mt-2">
            <input v-model = 'password' required>
            <span class="">密碼</span>
            <i></i>
        </div>
        <div class="inp_group mt-2">
            <input v-model = 'checkPassword' required>
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
            class="bg-white rounded flex justify-center items-center btn py-1 mt-5"
            @click = "submit"
            >提交註冊</div>
        <div
            class="bg-white rounded flex justify-center items-center btn py-1 mt-3"
            @click = "router.push('/phonevalidation')"
            >取消註冊</div>
    </form>
</template>
<script setup>
// import IdentifyCode from '../tools/IdentifyCode.vue';
import { onMounted, ref } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from "vue-router";

const account = ref()
const password = ref()
const checkPassword = ref()
const birthday = ref()
const apiUrl = ref()
const apiParam = ref()
const apiUrlPrefix = '/api/bonus-register/'
const router = useRouter()

// const props = defineProps({
//     phone: String
// })

onMounted(() => {
    console.log(router);
    console.log(router.currentRoute._value.query.phone);
    console.log(router.query);
    console.log(router.query.phone);
})

const submit = async() => {

    if (password.value == checkPassword.value){
        const formData = ref({
            account: account.value,
            password: password.value,
            birthday: birthday.value
        })
        apiParam.value = '?action=register'
        apiUrl.value = apiUrlPrefix + "register.php" + apiParam.value

        const { data: { success, msg } } = await axios.post(
            apiUrl.value, formData.value
        )

        if (success){
            // emits('closeDialog')
            Swal.fire({
                title: `系統訊息`,
                text: msg,
                icon: 'success',
                showConfirmButton: false,
                showCancelButton: false,
                timer: 2000,
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
    }else{
        Swal.fire({
                title: '系統訊息',
                text: '密碼不相符，請重新確認',
                icon: 'error',
                showConfirmButton: false,
                showCancelButton: false,
                timer: 2000
            })
    }
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