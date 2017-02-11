import ContentVO    from "../base/ContentVO"
import TextDataVO  from "./data/TextDataVO"
import { TEXT }    from "../../consts/types/ContentTypes"

export default class TextVO extends ContentVO
{
    constructor(input)
    {
        if(_.isUndefined(input)) input = null;
        if(_.isString(input) || _.isNull(input))
        {
            super(input, TEXT, new TextDataVO())
        }
        else
        {
            super(input);
        }
    }
}
