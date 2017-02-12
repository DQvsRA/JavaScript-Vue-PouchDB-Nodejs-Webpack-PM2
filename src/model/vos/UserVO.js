/**
 * Created by Vladimir Minkin on 2/11/17.
 */
export default class UserVO
{
    constructor(source, email, password, role)
    {
        let isSourceNULL = _.isNull(source);
        let isSourceString = _.isString(source);
        let isSourceUndefined = _.isUndefined(source);
        if(isSourceString || isSourceNULL || isSourceUndefined)
        {
            _.defaults(this, {
                    id          : source || ""
                ,   email       : email || ""
                ,   password    : password || ""
                ,   role        : role || ""
                ,   name        : ""
                ,   surname     : ""
                ,   birthday    : ""
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