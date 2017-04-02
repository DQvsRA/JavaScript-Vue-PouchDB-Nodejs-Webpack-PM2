/**
 * Created by Vladimir Minkin on 2/19/17.
 */

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import UserVO from '../vos/UserVO'
import UserActions from '../consts/actions/UserActions'
import UserMutations from '../consts/mutations/UserMutations'

import GetUserCommand from "../../commands/user/GetUserCommand"
import LoginUserCommand from "../../commands/user/LoginUserCommand"
import SignUpUserCommand from "../../commands/user/SignupUserCommand"

const userStore = new Vuex.Store({
state: new UserVO(),
actions: {
    [UserActions.INITIALIZE](store) {
        const user = store.state;
        return new GetUserCommand()
        .execute()
        .then((result) => (_.isNull(result) ? null : result))
        .then((storedUser) => {
            if(storedUser) {
                user.id = storedUser.id;
                user.email = storedUser.name;
                user.logged = true;
            }
            return user.logged;
        }).catch(err => console.log("ERROR > UserActions.INITIALIZE", err))
    },
    [UserActions.SIGNUP_START](state) {
        "use strict";
    },
    [UserActions.LOGIN_START](state) {
       console.log("LOGIN_START", state.state);
       const user = state.state;
       user.registered
       ?   new LoginUserCommand()
       :   new SignUpUserCommand()
           .execute(user)
           .then((result) => {
               console.log("USER:", result);
               // window.location.href = "./dashboard";
           })
    },
},
mutations: {
    [UserMutations.SET_EMAIL](state, value) {
        console.log("SET_EMAIL", value);
        state.email = value;
    },
    [UserMutations.SET_PASSWORD](state, value) {
        console.log("SET_PASSWORD", value);
        state.password = value;
    }
}});

export default userStore;