<template>
    <form id="form_area">
        <div class="inp_group mt-3">
            <input v-model='account' @blur="accountRule" required>
            <span class="column">遊戲帳號</span>
            <span class="notice text-red">{{ accountValidation }}</span>
            <i></i>
        </div>
        <div class="inp_group mt-2">
            <input v-model='password' @blur="passwordRule" @valid="passwordRule" @focus="passwordFocus" type="password" required>
            <span class="column">{{ passwordColumn }}</span>
            <span class="notice text-red">{{ passwordValidation }}</span>
            <i></i>
        </div>
        <div class="inp_group mt-2">
            <input v-model = 'checkPassword' type="password" required style="white-space: normal;">
            <span class="column">確認密碼</span>
            <i></i>
        </div>
        <div class="inp_group mt-2">
            <!-- <input v-model = 'birthday' required> -->
            <VueDatePicker 
                v-model='birthday' 
                :format="dateFormat"
                placeholder="出生年月日"
                hide-input-icon
                auto-apply
                :enable-time-picker="false"
            />
            <i></i>
        </div>
        <div class="inp_group mt-2">
            <input v-model = 'code' required>
            <span class="column">驗證碼</span>
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
import { onMounted, ref, watchEffect } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from "vue-router";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const server = ref()
const phone = ref()
const account = ref()
const password = ref()
const checkPassword = ref()
const birthday = ref()
const code = ref()

const accountValidation = ref()
const passwordValidation = ref()
const accountLength = ref()
const passwordLength = ref()
const passwordColumn = ref('密碼')

const apiUrl = ref()
const apiParam = ref()
const apiUrlPrefix = '/api/bonus-register/'
const router = useRouter()

onMounted(() => {
    server.value = router.currentRoute._value.params.server
    phone.value = router.currentRoute._value.params.phone
})

// 帳號規則
const accountRule = () =>{
    if (account.value != ''){
        accountLength.value = account.value.length
    }else{
        accountLength.value = 0
    }
    if(accountLength.value == 0){
        accountValidation.value = ''
    }else if (accountLength.value < 5 || accountLength.value > 12){
        accountValidation.value = '長度需介於5~12之間'
    }
}

// 密碼規則
const passwordRule = () =>{
    const pwd = String(password.value)
    if (password.value != ''){
        passwordLength.value = pwd.length
    }else{
        passwordLength.value = 0
    }
    if(passwordLength.value == 0){
        passwordValidation.value = ''
    }else if (passwordLength.value < 8 || passwordLength.value > 13){
        passwordValidation.value = '長度需介於8~13之間'
    }
    passwordColumn.value = '密碼'
    console.log(passwordColumn.value);
}

// 密碼 on focus
const passwordFocus = () => {
    passwordColumn.value = '密碼(區分英文大小寫,只能包含英文字母&數字)'
}

// 日期格式
const dateFormat = (birthday) => {
    let day = birthday.getDate()
    let month = birthday.getMonth() + 1;
    const year = birthday.getFullYear();
    month = (month < 10) ? `0${month}` : month
    day = (day < 10) ? `0${day}` : day
    return `${year}/${month}/${day}`
}

// const customPosition = () => ({ top: 0, right: 0 });

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
            swalFunction(swalData)
            inputInit(1)
        }else{
            swalData['text'] = msg;
            swalData['icon'] = 'error';
            swalFunction(swalData)
            inputInit()
        }
    }else{
        swalData['text'] = '密碼不相符，請重新確認';
        swalData['icon'] = 'error';
        swalFunction(swalData)
        inputInit()
    }
}

const swalFunction = (data) => {
    Swal.fire({
        title: data['title'],
        text: data['text'],
        icon: data['icon'],
        showConfirmButton: false,
        showCancelButton: false,
        timer: 2000
    })
}

const inputInit = (type = 0) => {
    if (type === 1){  // 註冊完成，清除所有
        account.value = ''
        password.value = ''
        checkPassword.value = ''
        birthday.value = ''
    }
    code.value = ''
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
<style>
.dp__outer_menu_wrap {
    position: absolute;
}
</style>