import WikiElement from "../kernel/models/elements/wikiElement";
import Linkable from "../kernel/models/linkable";
import Section from "../kernel/models/section";
import ChapterBuilder from "./ChapterBuilder";
import { BUTTON, IMAGE, TABLE, TEXT } from "./Const";
import WikiElementBuilder from "./wikiElementBuilder";

class SectionBuilder {
    
    private rootBuilder:ChapterBuilder;
    public name:string;
    private elements:WikiElementBuilder[];

    constructor(rootBuilder:ChapterBuilder, name:string) {
        this.name = name;
        this.rootBuilder = rootBuilder;
        this.elements = []
    }
    
    addText(id:string){
        const builder = new WikiElementBuilder(this,id,TEXT);
        this.elements.push(builder);
        return builder;
    }

    addTable(id:string){
        const builder = new WikiElementBuilder(this,id,TABLE);
        this.elements.push(builder);
        return builder;
    }

    addImage(id:string){
        const builder = new WikiElementBuilder(this,id,IMAGE);
        this.elements.push(builder);
        return builder;
    }

    addButton(id:string){
        const builder = new WikiElementBuilder(this,id,BUTTON);
        this.elements.push(builder);
        return builder;
    }

    root(){
        return this.rootBuilder;
    }
    
    createModel(linkableHM:Map<string,Linkable>):Section {
        const elementsList:WikiElement[] = []
        for(const el of this.elements){
            elementsList.push(el.createModel(linkableHM))
        }
        return new Section(elementsList);
    }
}
export default SectionBuilder