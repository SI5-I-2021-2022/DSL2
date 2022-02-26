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

    capitalizedText(caps?:TextTransform){
        if(!caps) caps = TextTransform.CAPITALIZE;

        this.caps = caps;
        return this;
    }

    putInBold(bold?:FontWeight){
        if(!bold) bold = FontWeight.BOLD;

        this.bold = bold;
        return this;
    }

    italicize(italic?:FontStyle){
        if(!italic) italic = FontStyle.ITALIC;

        this.italic = italic;
        return this;
    }

    setPolice(police:string){
        this.police = police;
        return this;
    }

    setFontSize(size:number,unit?:UnitySize){
        if(!unit) unit = UnitySize.POINT;

        this.fontSize = size + unit;
        return this;
    }

    setFontColor(color:string | Color){
        this.fontColor = color;
        return this;
    }

    underlined(underline?:TextDecoration){
        if(!underline) underline = TextDecoration.UNDERLINE;

        this.underline = underline;
        return this;
    }

    centerText(){
        this.textAlign = TextAlignment.CENTER;
        return this;
    }

    setTextAlign(align:TextAlignment){
        this.textAlign = align;
        return this;
    }

    endTextEdit():parentType{
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