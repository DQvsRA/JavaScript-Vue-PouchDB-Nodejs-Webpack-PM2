<template>
    <Login v-if="ready" v-cloak
           @emailChanged = "emailChanged"
           @passwordChanged = "passwordChanged"
           @loginClicked = "loginClicked"
           :email = "email"
           :password = "password"
    />
</template>

<style>
    body {
        background-color: #EAEAEA;
    }
    [v-cloak] { display: none; }
</style>
<script>
    import UserStore        from "../../../model/stores/UserStore"
    import UserActions      from "../../../model/consts/actions/UserActions"
    import UserMutations    from "../../../model/consts/mutations/UserMutations"

    import {
        mapState,
        mapActions,
        mapMutations
    } from 'vuex';

    export default {
        name: "Entrance",
        components: {
            Login : require('./components/Login.vue')
        },
        store: UserStore,
        computed: {
            ...mapState([
                'logged',
                'email',
                'password'
            ])
        },
        methods: {
            ...mapActions({
                loginClicked    : UserActions.LOGIN_START,
                initialize      : UserActions.INITIALIZE,
            }),
            ...mapMutations({
                emailChanged    : UserMutations.SET_EMAIL,
                passwordChanged : UserMutations.SET_PASSWORD
            })
        },
        created() {
            this.initialize().then(() => this.ready = true);
        },
        data() {
            return {
                ready: false
            }
        }
    };
</script>