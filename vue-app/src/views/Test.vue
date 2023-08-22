<template>
    <!-- <canvas height="600" width="600"></canvas> -->
    <IdentifyCode
          ref="identify"
          class="code-box"
          :contentWidth="120"
          :contentHeight="30"
          @updateIdentifyCode="setIdentifyCode"
        ></IdentifyCode>
</template>
<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2'
import IdentifyCode from '../components/tools/IdentifyCode.vue';

const identify = ref(null);
const validateIdentifyCode = (rule, value, callback) => {
    if (value !== curIdentifyCode.value) {
        callback(new Error("验证码错误!"));
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
<style scoped>
.code-box {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}
</style>