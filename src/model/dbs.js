/**
 * Created by Vladimir Minkin on 2/19/17.
 */

import Collections from "./consts/Collections"
import ServerDefinition from "./consts/ServerDefinition"

import PouchDB from "pouchdb";

PouchDB.plugin(require("pouchdb-authentication"));

const USERS = new PouchDB(ServerDefinition.ADDRESS + Collections.USERS);
new PouchDB('local_users').sync(USERS, { live: true, retry: true });

export { USERS };


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