<template>
    <Login v-if="ready"
        @emailChanged = "emailChanged"
        @passwordChanged = "passwordChanged"
        @loginClicked = "loginClicked"
        :email = "user.email"
        :password = "user.password"
    />
</template>

<style>
    body {
        background-color: #EAEAEA;
    }
    [v-cloak] { display: none; }
</style>
<script>
    import UserVO       from "../../../model/vos/UserVO"

    import GetUserBeforeCreateCommand from "./commands/GetUserBeforeCreateCommand"
    import LoginUserCommand from "./commands/LoginUserCommand"
    import SignUpUserCommand from "./commands/SignupUserCommand"

    export default {
        name: "Entrance",
        components: {
            Login : require('./components/login/Login.vue')
        },
        methods: {
            loginClicked() {
                const user = this.$data.user;
                    user.registered
                ?   new LoginUserCommand()
                :   new SignUpUserCommand()
                .execute(user)
                .then((result) => {
                    console.log("USER:", result)
                })
            },
            emailChanged(value){ this.user.email = value; },
            passwordChanged(value){ this.user.password = value; }
        },
        beforeCreate() {
            const that = this;
            new GetUserBeforeCreateCommand().execute()
            .then((result)=> {
                if(_.isNull(result)) {
                    that.user.logged = false;
                    that.user.email = "admin@site.org" + new Date().getTime();
                    that.user.password = "123";
                } else {
                    that.user.logged = true;
                    that.user.id = result.id;
                    that.user.password = "";
                    that.user.email = result.name;
                }
                this.ready = true;
            }).catch(err => console.log("ERROR > Entrance -> beforeCreate", err))
        },
        data() {
            return {
                user: new UserVO(),
                ready: false
            }
        }
    };
</script>