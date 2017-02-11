import ContentVO    from "../base/ContentVO"
import ImageDataVO  from "./data/ImageDataVO"
import { IMAGE_TYPE }    from "../../consts/types/ContentTypes"

export default class ImageVO extends ContentVO
{
    constructor(input)
    {
        if(_.isUndefined(input)) input = null;
        if(_.isString(input) || _.isNull(input))
        {
            super(input, IMAGE_TYPE, new ImageDataVO())
        }
        else
        {
            super(input);
        }
    }
}
