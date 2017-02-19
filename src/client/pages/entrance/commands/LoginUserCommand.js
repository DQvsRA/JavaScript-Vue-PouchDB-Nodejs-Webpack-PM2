/**
 * Created by Vladimir Minkin on 2/19/17.
 */

import { USERS }    from "../../../../model/dbs"
import LocalObjects from "../../../../model/consts/LocalObjects"

export default class LoginUserCommand {
    execute(user){
        return USERS.login(user.email, user.password)
        .then(() => user.logged = true )
        .then(() => USERS.put({ _id: LocalObjects.USER, data: user }))
        .catch(err => {
            console.log("ERROR > LoginUserCommand", err);
            Promise.resolve(null)
        })
    }
}