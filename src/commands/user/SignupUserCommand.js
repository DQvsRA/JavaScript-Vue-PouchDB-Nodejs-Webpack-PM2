/**
 * Created by Vladimir Minkin on 2/19/17.
 */

import { USERS_DB }    from "../../model/dbs"
import LoginUserCommand from "./LoginUserCommand"

export default class SignupUserCommand {
    execute(user){
        console.log(user.password);
        return USERS_DB.signup(user.email, user.password)
        .then( result => {
            user.id = result.id;
            user.name = user.email;
            user.registered = true;
        })
        .then(() => new LoginUserCommand().execute(user))
        .then(() => USERS_DB.putUser( user.name, { metadata: user } ))
        .catch(err => {
            console.log("ERROR > SignUpUserCommand", err);
            Promise.resolve(null)
        })
    }
}