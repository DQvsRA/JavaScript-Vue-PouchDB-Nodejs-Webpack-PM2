/**
 * Created by Vladimir Minkin on 2/19/17.
 */

import { USERS_DB }    from "../../model/dbs"
import LocalObjects from "../../model/consts/LocalObjects"

export default class GetUserCommand {
    execute(){
        return Promise.all([
            USERS_DB.getSession(),
            USERS_DB.get(LocalObjects.USER),
        ])
        .then(values => { console.log("> GetUserCommand values:", values);
            const localUser = values[1];
            const sessionResponse = values[0];
            const userContext = sessionResponse.userCtx;
            if (!localUser && _.isNull(userContext.name)) {
                return Promise.resolve(null);
            } else {
                return USERS_DB.getUser(localUser.data.name);
            }
        })
        .catch(err => { console.log("> GetUserCommand > Error:", err);
            Promise.resolve(null)
        })
    }
}
