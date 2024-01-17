<template>
    <v-main fill-height class="d-flex justify-center align-center">
        <v-container>
            <v-row justify="center">
                <v-col cols="12" sm="8" md="6" lg="4">
                    <LoginRegisterForm />
                </v-col>
            </v-row>
        </v-container>
    </v-main>
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