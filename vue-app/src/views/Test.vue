<template>
    <div>
        <canvas ref="domRef" width="152" height="40" class="cursor-pointer" @click="getImgCode"></canvas>
    </div>
</template>
<script setup>
import Swal from 'sweetalert2'

const test = () => {
    Swal.fire({
        title: `測試成功`,
        icon: 'success',
        showConfirmButton: false,
        showCancelButton: false,
        timer: 2000,
    })
}

</script>
