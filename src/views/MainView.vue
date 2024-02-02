<template>
    <TopAppBar :drawer="drawer" @drawer-toggle="updateDrawer" />
    <v-main class="d-flex align-start justify-center">
        <LeftDrawer :drawer="drawer" @drawer-toggle="updateDrawer" />
        <v-row no-gutters>
            <v-col cols="12">
                <Tournament v-if="selectedTournament" />
            </v-col>
        </v-row>
    </v-main>
</template>

<script>
import LeftDrawer from './LeftDrawer.vue'
import TopAppBar from './TopAppBar.vue'
import Tournament from './Tournament.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'MainView',
    components: {
        LeftDrawer,
        TopAppBar,
        Tournament,
    },
    computed: {
        ...mapGetters('tournaments', [
            'selectedTournament',
        ]),
        ...mapGetters('user', {
            tournamentIds: 'tournaments',
        }),
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
    async mounted() {
        await this.$store.dispatch('user/fetchUser');
        await this.$store.dispatch('tournaments/fetchTournaments');
        await this.$store.dispatch('tournaments/loadSelectedTournament');

    },
}
</script>
