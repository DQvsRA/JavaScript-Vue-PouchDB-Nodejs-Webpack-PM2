<template>
    <Login v-if="ready" keep-alive
           @emailChanged = "emailChanged"
           @passwordChanged = "passwordChanged"
           @loginClicked = "loginClicked"
           :email = "email"
           :password = "password"
    />
    <Spinner v-else></Spinner>
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
            Login : require('./components/Login.vue'),
            Spinner: require('./../../common/loading/Spinner.vue')
        },
        store: UserStore, // <-------------- STORE MAPPING
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
            this.initialize().then(() =>
                setTimeout(()=>{
                    this.ready = true
                }, 1000)
            );
        },
        data() {
            return {
                ready: false
            }
        }
    };
</script>