/**
 * Created by Vladimir Minkin on 2/11/17.
 */
import _ from 'lodash';

export default class UserVO
{
    constructor(source, email, role)
    {
        let isSourceNULL = _.isNull(source);
        let isSourceString = _.isString(source);
        let isSourceUndefined = _.isUndefined(source);
        if(isSourceString || isSourceNULL || isSourceUndefined)
        {
            _.defaults(this, {
                    _id         : source || ""
                ,   email       : email || ""
                ,   name        : ""
                ,   surname     : ""
                ,   birthday    : ""
                ,   role        : role || ""
                ,   status      : ""
                ,   logged      : false
                ,   registered  : false
                ,   created     : 0
                ,   modified    : 0
            });
        }
        else if(_.isObject(source))
        {
            _.extend(this, source);
        }
    }
}