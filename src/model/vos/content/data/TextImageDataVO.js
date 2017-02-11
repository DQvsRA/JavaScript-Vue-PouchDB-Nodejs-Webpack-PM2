export default class TextImageDataVO
{
    constructor()
    {
        this.file    = null;
        this.height  = 0; // Set after html rendering complete
        // Parameters requered to render image
        this.width   = 0;
        this.padding = 0;
        this.linehgt = 0; // Line height
        this.scale   = 0;
        this.center  = false;
        this.font    = "";
        this.weight  = 0;
    }
}
