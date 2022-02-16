import BlockStyle from "./blockStyle";
import WikiElement from "./elements/wikiElement";
import Linkable from "./linkable";

export default class Section extends Linkable{
    elements:WikiElement[];
    block:BlockStyle | undefined

    constructor(id:string,elements:WikiElement[]){
        super(id);
        this.elements = elements;
    }
}