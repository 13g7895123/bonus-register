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
        <div 
            class="bg-white rounded flex justify-center items-center btn py-1 mt-5"
            @click = "router.push('/phonevalidation')"
            >送出</div>
        <div
            class="bg-white rounded flex justify-center items-center btn py-1 mt-3"
            @click = "router.push('/forgetPassword')"
            >返回</div>
    </form>
</template>
<script setup>
import IdentifyCode from '../tools/IdentifyCode.vue';
import { onMounted, ref } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from "vue-router";

const phone = ref()
const code = ref()
const apiUrl = ref()
const apiParam = ref()
const apiUrlPrefix = 'http://170.187.229.132:9090/api/bonus-register/'
const router = useRouter()

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