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

const userStore = new Vuex.Store(
{
    state: new UserVO(),
    actions: {
        [UserActions.INITIALIZE](store) { console.log("> UserActions.INITIALIZE", store.state);
            const user = store.state;
            return new GetUserCommand()
                .execute()
                .then((result) => (_.isNull(result) ? null : result))
                .then((storedUser) => { console.log("> UserActions.INITIALIZE > storedUser: ", storedUser);
                    if(storedUser) {
                        user.id = storedUser.id;
                        user.email = storedUser.name;
                        user.logged = true;
                    }
                    return user.logged;
                })
                .catch(err => console.log("> UserActions.INITIALIZE > ERROR: ", err))
        },
        [UserActions.LOGIN_START](state) { console.log("> UserActions.LOGIN_START", state.state);
            const user = state.state;
            user.registered
                ?   new LoginUserCommand()
                :   new SignUpUserCommand()
                    .execute(user)
                    .then((result) => { console.log("> UserActions.LOGIN_START > USER:", result);
                        window.location.href = "./dashboard";
                    })
        },
        [UserActions.SIGNUP_START](state) { "use strict"; },
    },
    mutations: {
        [UserMutations.SET_EMAIL](state, value) { console.log("> UserMutations.SET_EMAIL", value);
            state.email = value;
        },
        [UserMutations.SET_PASSWORD](state, value) { console.log("> UserMutations.SET_PASSWORD", value);
            state.password = value;
        }
    }
});

export default userStore;