/**
 * Created by Vladimir Minkin on 2/19/17.
 */
import UserVO from '../vos/UserVO'

new Vuex.Store({
    state: new UserVO(),
    mutations: {
        increment (state) {
            state.count++
        }
    }
});