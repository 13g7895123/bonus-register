<template>
    <!-- login box -->
    <div id='bg' class="w-screen h-screen">
        <div id="login-box" class="rounded-lg">
            <div id="mask"></div>
            <h2 class="text-white mt-12">註冊帳號</h2>
            <Register />
        </div>
    </div>
</template>
<script setup>
import Register from '../form/Register.vue';
</script>