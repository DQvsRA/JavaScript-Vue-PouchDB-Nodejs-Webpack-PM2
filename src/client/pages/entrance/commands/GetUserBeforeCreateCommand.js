/**
 * Created by Vladimir Minkin on 2/19/17.
 */

import { USERS }    from "../../../../model/dbs"
import LocalObjects from "../../../../model/consts/LocalObjects"

export default class GetUserBeforeCreateCommand {
    execute(){
        return Promise.all([
            USERS.get(LocalObjects.USER),
            USERS.getSession(),
        ])
        .then(values => {
            console.log("GetUserBeforeCreateCommand", values);
            const localUser = values[0];
            const sessionResponse = values[1];
            const userContext = sessionResponse.userCtx;
            if (!localUser && _.isNull(userContext.name)) {
                return Promise.resolve(null);
            } else {
                return USERS.getUser(localUser.data.name);
                return USERS.remove(localUser);
            }
        }).catch(err => Promise.resolve(null))
    }
}
