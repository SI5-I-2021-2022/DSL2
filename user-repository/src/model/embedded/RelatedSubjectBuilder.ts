import { BlockStyleBuilder } from "./BlockStyleBuilder";
import { TextStyleBuilder } from "./TextStyleBuilder";
import { WikiElementStyleBuilder } from "./WikiElementStyleBuilder";
import WikiRelatedSubject from "../kernel/models/wiki-related-subject";
import { TitleStyleBuilder } from "./TitleStyleBuilder";

export class RelatedSubjectBuilder{

    private title?:TitleStyleBuilder<RelatedSubjectBuilder>
    private content?:WikiElementStyleBuilder
    private block?:BlockStyleBuilder<RelatedSubjectBuilder>

    /**
     * Permet d'editer style du titre
     * @returns Le builder du titre
     */
    editTitleStyle(){
        let builder = this.title;

        if(!builder){
            builder = new TitleStyleBuilder(this);
            this.title = builder;
        }
        return builder;
    }

    /**
     * Permet d'editer le style de la box de related subject
     * @returns le builder de la box
     */
    editContentBoxStyle(){
        let builder = this.block;

        if(!builder){
            builder = new BlockStyleBuilder(this);
            this.block = builder;
        }
        return builder;
    }

    /**
     * Permet d'editer le style du contenu
     * @returns Le builder du contenus
     */
    editContentStyle(){
        let builder = this.content;

        if(!builder){
            builder = new WikiElementStyleBuilder();
            this.content = builder;
        }
        return builder;
    }

    createModel(){
        const title = this.title?.createModel();
        const content = this.content?.createModel();
        const block = this.block?.createModel();

        return new WikiRelatedSubject({title:title,content:content,block:block});
    }
}
