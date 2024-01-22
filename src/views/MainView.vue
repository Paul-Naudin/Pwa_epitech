<template>
    <LeftDrawer />
    <v-main>
        <TopAppBar />
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
    }
}
</script>
