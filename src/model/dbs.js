/**
 * Created by Vladimir Minkin on 2/19/17.
 */

import Collections from "./consts/Collections"
import ServerDefinition from "./consts/ServerDefinition"
import LocalObjects from "./consts/LocalObjects"

import PouchDB from "pouchdb";

PouchDB.plugin(require("pouchdb-authentication"));

const USERS = new PouchDB(ServerDefinition.ADDRESS + Collections.USERS);
const UCDS = new PouchDB(ServerDefinition.ADDRESS + Collections.UCDS);

new PouchDB(LocalObjects.USER).sync(USERS, { live: true, retry: true });

export { USERS, UCDS };


// import Pouchy from "pouchy";
//
// Pouchy.PouchDB.plugin(require("pouchdb-authentication"));
//
// const USERS = new Pouchy({
//     name: Collections.USERS,
//     replicate: 'sync',
//     url: ServerDefinition.ADDRESS + Collections.USERS
// });
//
// export { USERS };