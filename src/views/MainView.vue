<template>
    <TopAppBar :drawer="drawer" @drawer-toggle="updateDrawer" />
    <v-main>
        <LeftDrawer :drawer="drawer" @drawer-toggle="updateDrawer"/>
        <h1>MainView</h1>
    </v-main>
</template>

<script>
import LeftDrawer from './LeftDrawer.vue'
import TopAppBar from './TopAppBar.vue'

export default {
    name: 'MainView',
    components: {
        LeftDrawer,
        TopAppBar,
    },
    data() {
        return {
            drawer: false,
        }
    },
    methods: {
        updateDrawer(value) {
            this.drawer = value;
        },
    },
}
</script>
