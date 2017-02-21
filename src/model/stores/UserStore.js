/**
 * Created by Vladimir Minkin on 2/19/17.
 */

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import UserVO from '../vos/UserVO'
import UserActions from '../consts/actions/UserActions'
import UserMutations from '../consts/mutations/UserMutations'

import GetUserBeforeCreateCommand from "../../commands/user/GetUserBeforeCreateCommand"
// import LoginUserCommand from "./user/LoginUserCommand"
// import SignUpUserCommand from "./user/SignupUserCommand"

const userStore = new Vuex.Store({
    state: new UserVO(),
    actions: {
        [UserActions.INITIALIZE](store) {
            const user = store.state;
            return new GetUserBeforeCreateCommand()
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
        [UserActions.LOGIN_START](state) {
            console.log("LOGIN_START", state);
            // const user = this.$data.user;
////                user.registered
////                    ?   new LoginUserCommand()
////                    :   new SignUpUserCommand()
////                        .execute(user)
////                        .then((result) => {
////                            console.log("USER:", result)
////                        })
        },
    },
    mutations: {
        [UserMutations.SET_EMAIL](state, value) {
            console.log("SET_EMAIL", state, value);
        },
        [UserMutations.SET_PASSWORD](state, value) {
            console.log("SET_PASSWORD", state, value);
        }
    }
});
export default userStore;