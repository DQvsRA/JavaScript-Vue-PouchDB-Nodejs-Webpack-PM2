<template>
    <Login v-if="logged === false" :email="email"></Login>
</template>

<style>
    body {
        background-color: #EAEAEA;
    }
</style>

<script>
    import PouchDB from "pouchdb";
    import ServerDefinition from "../../model/consts/ServerDefinition"
    import Collections from "../../model/consts/Collections"
    import UserVO from "../../model/vos/UserVO"

    PouchDB.plugin(require('pouchdb-authentication'));

    import Login from './components/Login.vue'

    const path = ServerDefinition.ADDRESS + Collections.USERS;
    const db = new PouchDB(path);

    const user = new UserVO();

    db.getSession().then(function(response){
        "use strict";
        if (!response.userCtx.name) {
            user.logged = false;
        } else {
            user.logged = true;
        }
    }).catch(function (err) {

    });

    export default {
        name: "Entrance",
        data: () => user,
        components: {
            Login
        }
    };
</script>