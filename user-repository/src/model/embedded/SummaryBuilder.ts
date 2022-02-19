import WikiSummary from "../kernel/models/wiki-summary";
import { BlockStyleBuilder } from "./BlockStyleBuilder";
import { WikiElementStyleBuilder } from "./WikiElementStyleBuilder";

export class SummaryBuilder {
    private content?:WikiElementStyleBuilder
    private block?:BlockStyleBuilder<SummaryBuilder>

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
        const content = this.content?.createModel();
        const block = this.block?.createModel();

        return new WikiSummary({content:content, block:block});
    }
}