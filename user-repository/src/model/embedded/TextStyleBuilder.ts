import { Color } from "../kernel/models/enum/color.enum";
import { UnitySize } from "../kernel/models/enum/unity-font-size.enum";
import { FontStyle } from "../kernel/models/enum/font-style.enum";
import { FontWeight } from "../kernel/models/enum/font-weight.enum";
import { TextAlignment } from "../kernel/models/enum/text-align.enum";
import { TextTransform } from "../kernel/models/enum/text-transform.enum";
import WikiTextStyle from "../kernel/models/style/wiki-text-style";
import { TextDecoration } from "../kernel/models/enum/text-decoration.enum";

export class TextStyleBuilder<parentType> {

    private caps?:TextTransform;
    private textAlign?:TextAlignment;
    private bold?:FontWeight;
    private italic?:FontStyle;
    private underline?:TextDecoration;
    private fontColor?:string | Color;
    private fontSize?:string;
    private police?:string;

    private parentBuilder:parentType;

    constructor (parentBuilder:parentType){
        this.parentBuilder = parentBuilder;
    }

    capitalized(caps:TextTransform){
        this.caps = caps;
        return this;
    }

    putInBold(bold:FontWeight){
        this.bold = bold;
        return this;
    }

    italicize(italic:FontStyle){
        this.italic = italic;
        return this;
    }

    setPolice(police:string){
        this.police = police;
        return this;
    }

    setFontSize(size:number,unit:UnitySize){
        this.fontSize = size + unit;
        return this;
    }

    setFontColor(color:string | Color){
        this.fontColor = color;
        return this;
    }

    underlined(underline:TextDecoration){
        this.underline = underline;
        return this;
    }

    setTextAlign(align:TextAlignment){
        this.textAlign = align;
        return this;
    }

    endTextStyle():parentType{
        return this.parentBuilder;
    }

    createModel(){
        return new WikiTextStyle({
            caps:this.caps, 
            text_alignment:this.textAlign, 
            bold:this.bold, 
            italic:this.italic,
            font_color:this.fontColor, 
            font_size:this.fontSize, 
            underline:this.underline, 
            police:this.police
        });
    }

}