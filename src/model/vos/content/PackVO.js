import ContentVO    from "../base/ContentVO"
import PackDataVO  from "./data/PackDataVO"
import { PACK }    from "../../consts/types/ContentTypes"

export default class ImageVO extends ContentVO
{
    constructor(input)
    {
        if(_.isUndefined(input)) input = null;
        if(_.isString(input) || _.isNull(input))
        {
            super(input, PACK, new PackDataVO())
        }
        else
        {
            super(input);
        }
    }
}
