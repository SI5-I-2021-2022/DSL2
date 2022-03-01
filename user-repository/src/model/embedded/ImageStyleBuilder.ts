import WikiImageStyle from "../kernel/models/elements/wiki-image";
import {BlockStyleBuilder} from "./BlockStyleBuilder";
import { TextStyleBuilder } from "./TextStyleBuilder";
import { UnitySize } from "../kernel/models/enum/unity-font-size.enum";

export class ImageStyleBuilder<ParentBuilder> {

    private blockStyle?:BlockStyleBuilder<ImageStyleBuilder<ParentBuilder>>
    private blockResumeStyle?:BlockStyleBuilder<ImageStyleBuilder<ParentBuilder>>
    private blockImageStyle?:BlockStyleBuilder<ImageStyleBuilder<ParentBuilder>>
    private resumeStyle?:TextStyleBuilder<ImageStyleBuilder<ParentBuilder>>
    private parentBuilder:ParentBuilder;

    constructor (parentBuilder:ParentBuilder){
        this.parentBuilder = parentBuilder;
    }

    /**
     * Used to edit the style of the image's container box
     * @returns the image box style builder
     */
    editBoxStyle(){
        if(!this.blockStyle){
            this.blockStyle=new BlockStyleBuilder<ImageStyleBuilder<ParentBuilder>>(this);
        }
        return this.blockStyle;
    }

    /**
     * Used to edit the text of the image's description
     * @returns the description text style builder
     */
    editAbstractTextStyle(){
        if(!this.resumeStyle){
            this.resumeStyle=new TextStyleBuilder<ImageStyleBuilder<ParentBuilder>>(this);
        }
        return this.resumeStyle;
    }

    /**
     * edit the max width of the image and container
     * @param value Size
     * @param unit unit for the size
     * @returns same builder
     */
    editImageMaxWidthContainer(value:number,unit?: UnitySize){
        if(!this.blockImageStyle){
            this.blockImageStyle = new BlockStyleBuilder<ImageStyleBuilder<ParentBuilder>>(this);
        }
        if(!this.blockResumeStyle){
            this.blockResumeStyle = new BlockStyleBuilder<ImageStyleBuilder<ParentBuilder>>(this);
        }
        this.blockImageStyle.setMaxWidth(value,unit)
        this.blockResumeStyle.setMaxWidth(value,unit)
        return this
    }

    editImageMaxHeight(value:number,unit?: UnitySize){
        if(!this.blockImageStyle){
            this.blockImageStyle = new BlockStyleBuilder<ImageStyleBuilder<ParentBuilder>>(this);
        }
        this.blockImageStyle.setMaxHeight(value,unit);

        return this
    }

    /**
     * Used to edit the style of the image's box
     * @returns the image box style builder
     */
    editImageBox(){
        if(!this.blockImageStyle){
            this.blockImageStyle=new BlockStyleBuilder<ImageStyleBuilder<ParentBuilder>>(this);
        }
        return this.blockImageStyle;
    }

    /**
     * Used to edit the style of the resume box
     * @returns the image resume box style builder
     */
    editImageResumeBox(){
        if(!this.blockResumeStyle){
            this.blockResumeStyle=new BlockStyleBuilder<ImageStyleBuilder<ParentBuilder>>(this);
        }
        return this.blockResumeStyle;
    }


    /**
     * Used to stop the image editing and returning to the parent builder
     * @returns the parent builder
     */
    endImageEdit():ParentBuilder{
        return this.parentBuilder;
    }

    createModel(){
        const style = this.blockStyle?.createModel();

        return new WikiImageStyle({
            style:style,
            resumeStyle:this.resumeStyle?.createModel(),
            blockImageStyle:this.blockImageStyle?.createModel(),
            blockResumeStyle:this.blockResumeStyle?.createModel()
        });
    }

}
