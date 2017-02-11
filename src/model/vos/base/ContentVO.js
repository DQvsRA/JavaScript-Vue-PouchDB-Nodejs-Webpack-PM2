export default class ContentVO
{
    constructor(source, type, data)
    {
        let isSourceNULL = _.isNull(source);
        if(_.isString(source) || isSourceNULL)
        {
            let MID = Meteor.Collection.ObjectID;
            if(!isSourceNULL) source = new MID(source);

            _.defaults(this, {
                _id         : new MID()
            ,   type        : type
            ,   data        : data
            ,   source      : source
            ,   created     : 0
            ,   modified    : 0
            ,   position    : 0
            ,   showtime    : 0
            ,   transition  : 0
            });
        }
        else if(_.isObject(source))
        {
            _.extend(this, source);
        }
    }
}
