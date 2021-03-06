import WikiChapter from "./chapters/wiki-chapter";
import WikiElementStyle from "./elements/wiki-element-style";
import WikiInfoBox from "./wiki-info-box";
import WikiBlockStyle from "./style/wiki-block-style";
import WikiSummary from "./wiki-summary";
import WikiTableOfContent from "./wiki-table-of-content";
import WikiTextStyle from "./style/wiki-text-style";
import WikiRelatedSubject from "./wiki-related-subject";
import WikiReferences from "./wiki-references";
import { WikiTitleStyle } from "./style/wiki-title-style";

export default class WikiSubject{

    summary?:WikiSummary
    tableOfContent?:WikiTableOfContent
    infoBox?:WikiInfoBox
    chapter?:WikiChapter

    titleStyle?:WikiTitleStyle
    contentStyle?:WikiElementStyle
    blockStyle?:WikiBlockStyle
    relatedSubject?:WikiRelatedSubject;
    references?:WikiReferences;
    
    constructor({title, summary, tableOfContent, infoBox, chapter, content, block, relatedSubject,references}
        :{title?:WikiTitleStyle, summary?:WikiSummary, tableOfContent?:WikiTableOfContent, infoBox?:WikiInfoBox, chapter?:WikiChapter
        content?:WikiElementStyle, block?:WikiBlockStyle, relatedSubject?:WikiRelatedSubject, references?:WikiReferences}){
        this.titleStyle = title;
        this.summary = summary;
        this.tableOfContent =tableOfContent;
        this.infoBox = infoBox;
        this.chapter = chapter;
        this.contentStyle =content;
        this.blockStyle = block;
        this.relatedSubject = relatedSubject;
        this.references = references;
    }
}