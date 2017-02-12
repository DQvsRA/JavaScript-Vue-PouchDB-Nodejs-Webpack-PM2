<template>
    <Login
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
</style>

<script>
    import PouchDB from "pouchdb";
    import ServerDefinition from "../../../model/consts/ServerDefinition"
    import Collections from "../../../model/consts/Collections"
    import UserVO from "../../../model/vos/UserVO"

    PouchDB.plugin(require('pouchdb-authentication'));

    const db = new PouchDB(ServerDefinition.ADDRESS + Collections.USERS);

    export default {
        name: "Entrance",
        components: {
            Login : require('./components/login/Login.vue')
        },
        methods: {
            loginClicked() {
                console.log("loginClicked");
            },
            emailChanged(value){ this.email = value; },
            passwordChanged(value){ this.password = value; }
        },
        beforeCreate() {
            let that = this;
            db.getSession()
            .then(function(response)
            {
                let userContext = response.userCtx;
                if (_.isNull(userContext.name)) {
                    that.logged = false;
                    that.email = "new user";
                } else {
                    that.logged = true;
                }
            }).catch(function (err) {

            });
        },
        data: () => new UserVO()
    };
</script>