import ContentVO    from "../base/ContentVO"
import VideoDataVO  from "./data/VideoDataVO"
import { VIDEO }    from "../../consts/types/ContentTypes"

export default class VideoVO extends ContentVO
{
    constructor(input)
    {
        if(_.isUndefined(input)) input = null;
        if(_.isString(input) || _.isNull(input))
        {
            super(input, VIDEO, new VideoDataVO())
        }
        else
        {
            super(input);
        }
    }
}
