<template>
    <Base>
        <!-- <template v-slot="form"> -->
            <PhoneValidation />
        <!-- </template> -->
    </Base>
</template>
<script setup>
import Base from '../components/background/Base.vue';
import PhoneValidation from '../components/form/PhoneValidation.vue';
// import { useRouter } from 'vue-router'
// import { computed, onMounted } from 'vue'
// // import PhoneValidation from './PhoneValidation.vue';
// import PhoneValidation from '../components/form/PhoneValidation.vue';


// const router = useRouter()
// const path = computed(() => router.currentRoute.value.name)

// onMounted(() => {
//     console.log(path);
// })

</script>