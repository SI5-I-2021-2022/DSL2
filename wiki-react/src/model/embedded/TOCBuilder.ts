import WikiTableOfContent from "../kernel/models/wiki-table-of-content";
import { BlockStyleBuilder } from "./BlockStyleBuilder";
import { TextStyleBuilder } from "./TextStyleBuilder";
import { WikiElementStyleBuilder } from "./WikiElementStyleBuilder";

export class TOCBuilder{
    private title?:TextStyleBuilder<TOCBuilder>
    private content?:WikiElementStyleBuilder
    private block?:BlockStyleBuilder<TOCBuilder>
    private numerated?:boolean


    editTitle(){
        let builder = this.title;

        if(!builder){
            builder = new TextStyleBuilder(this);
            this.title = builder;
        }
        return builder;
    }

    isNumerated(numerated:boolean){
        this.numerated = numerated;
        return this;
    }

    editBlock(){
        let builder = this.block;

        if(!builder){
            builder = new BlockStyleBuilder(this);
            this.block = builder;
        }
        return builder;
    }

    editContent(){
        let builder = this.content;

        if(!builder){
            builder = new WikiElementStyleBuilder();
            this.content = builder;
        }
        return builder;
    }

    createModel(){
        const title = this.title?.createModel();
        const block = this.block?.createModel();
        const content = this.content?.createModel();

        return new WikiTableOfContent({content:content, title:title, block:block, numerated:this.numerated});
    }
}