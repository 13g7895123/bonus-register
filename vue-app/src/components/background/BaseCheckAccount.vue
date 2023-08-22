<template>
    <!-- login box -->
    <div id='bg' class="w-screen h-screen">
        <div id="login-box" class="rounded-lg">
            <div id="mask"></div>
            <h2 class="text-white mt-12">查詢帳號</h2>
            <CheckAccount />
        </div>
    </div>
</template>
<script setup>
import CheckAccount from '../form/CheckAccount.vue';
</script>