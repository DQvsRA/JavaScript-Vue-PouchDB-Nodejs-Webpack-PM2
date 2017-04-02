/**
 * Created by Vladimir Minkin on 2/19/17.
 */

import { USERS }    from "../../model/dbs"
import LocalObjects from "../../model/consts/LocalObjects"

export default class GetUserCommand {
    execute(){
        return Promise.all([
            USERS.getSession(),
            USERS.get(LocalObjects.USER),
        ])
        .then(values => {
            console.log("> GetUserCommand values:", values);
            const localUser = values[1];
            const sessionResponse = values[0];
            const userContext = sessionResponse.userCtx;
            if (!localUser && _.isNull(userContext.name)) {
                return Promise.resolve(null);
            } else {
                return USERS.getUser(localUser.data.name);
            }
        })
        .catch(err => {
            console.log("> GetUserCommand", err);
            Promise.resolve(null)
        })
    }
}
