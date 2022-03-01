import { BlockStyleBuilder } from "./BlockStyleBuilder";
import WikiGallery from "../kernel/models/chapters/wiki-gallery";
import { TitleStyleBuilder } from "./TitleStyleBuilder";
import { ImageStyleBuilder } from "./ImageStyleBuilder";

export class GalleryBuilder<ParentBuilder>{

    private titleStyle?:TitleStyleBuilder<GalleryBuilder<ParentBuilder>>
    private imagesStyle:ImageStyleBuilder<GalleryBuilder<ParentBuilder>>
    private galeryBoxStyle?:BlockStyleBuilder<GalleryBuilder<ParentBuilder>>

    private parentBuilder:ParentBuilder;

    constructor(parentBuilder:ParentBuilder){
        this.parentBuilder=parentBuilder;
        this.imagesStyle = new ImageStyleBuilder(this);
        this.imagesStyle.editImageMaxHeight(600);//default
        this.imagesStyle.editImageMaxWidthContainer(600);//default
    }
    /**
     * Used to edit the style of the title
     * @returns the title builder
     */
    editTitleStyle(){
        let builder = this.titleStyle;

        if(!builder){
            builder = new TitleStyleBuilder(this);
            this.titleStyle = builder;
        }
        return builder;
    }

    /**
     * Used to edit the style of the chapter box
     * @returns the box builder
     */
    editGalleryBox(){
        let builder = this.galeryBoxStyle;

        if(!builder){
            builder = new BlockStyleBuilder(this);
            this.galeryBoxStyle = builder;
        }
        return builder;
    }

    /**
     * Used to edit the style of the elements of the gallery
     * @returns the gallery elements style builder
     */
    editImagesStyle(){
        let builder = this.imagesStyle;

        if(!builder){
            builder = new ImageStyleBuilder(this);
            this.imagesStyle = builder;
        }
        return builder;
    }

    /**
     * return to last builder
     * @returns the parentBuilder
     */
    endEditGalleryStyle(){
        return this.parentBuilder;
    }

    createModel(){

        return new WikiGallery({
            galeryBoxStyle:this.galeryBoxStyle?.createModel(),
            imagesStyle:this.imagesStyle?.createModel(),
            titleStyle:this.titleStyle?.createModel()
        });
    }
}
