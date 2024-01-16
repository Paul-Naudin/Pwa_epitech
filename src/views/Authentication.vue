<template>
    <div>
        <LoginRegisterForm />
    </div>
</template>

<script>
import LoginRegisterForm from '../components/authentification/LoginRegisterForm.vue';

export default {
    name: 'Authentification',
    components: {
        LoginRegisterForm,
    },
}
</script>