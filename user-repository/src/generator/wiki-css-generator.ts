
import WikiTextStyle from "../model/kernel/models/style/wiki-text-style";
import Wiki from "../model/kernel/models/wiki";
import WikiSubject from "../model/kernel/models/wiki-subject"
import createFile from "./utils/file-utils";
import WikiElementStyle from "../model/kernel/models/elements/wiki-element-style";
import WikiText from "../model/kernel/models/elements/wiki-text";
import WikiBlockStyle from "../model/kernel/models/style/wiki-block-style";
import WikiTableOfContent from "../model/kernel/models/wiki-table-of-content";
import WikiSummary from "../model/kernel/models/wiki-summary";
import WikiChapter from "../model/kernel/models/chapters/wiki-chapter";
import WikiClassicChapter from "../model/kernel/models/chapters/wiki-classic-chapter";
import WikiRelatedSubject from "../model/kernel/models/wiki-related-subject";
import WikiGallery from "../model/kernel/models/chapters/wiki-gallery";
import WikiInfoBox from "../model/kernel/models/wiki-info-box";
import WikiNavBar from "../model/kernel/models/wiki-nav-bar";
import WikiImageStyle from "../model/kernel/models/elements/wiki-image";
import WikiButtonStyle from "../model/kernel/models/elements/wiki-button";
import WikiTableStyle from "../model/kernel/models/elements/wiki-table";
import WikiReferences from "../model/kernel/models/wiki-references";
import { DisplaySize } from "../model/kernel/models/display-size";
import { WikiTitleStyle } from "../model/kernel/models/style/wiki-title-style";
import { AlignContent } from "../model/kernel/models/enum/align-content.enum";

export class WikiCssGenerator{
    generate:string[]=[]
    tab = 0;
    prefix:string[] = []
    hoverPrefix:string = "";

    generateCss(wiki:Wiki){
        this.wikiGen(wiki)
        return this.generate.join("")
    }

    generateCssFile(wiki:Wiki){
        this.wikiGen(wiki)
        createFile("../wiki-react/src/generate.css",this.generate.join(""))
    }

    wikiGen(wiki:Wiki){
        if(this.hoverPrefix === "") this.prefix.push(".wiki")

        if(wiki.blockStyle){
            this.generate.push(`${this.prefix.join(" ")+this.hoverPrefix} {\n${this.blockStyleGen(wiki.blockStyle).join("")}}\n`)
        }
        if(wiki.contentStyle){
            this.wikiElementGen(wiki.contentStyle)
        }
        if(wiki.subject){
            this.subjectGen(wiki.subject);
        }
        if (wiki.navBar) {
            this.navBarGen(wiki.navBar);
        }
        
        if(wiki.hoverStyle){
            this.hoverPrefix = ":hover";
            this.wikiGen(wiki.hoverStyle);
            this.hoverPrefix = "";
        }
        if((!wiki.blockStyle) && (!wiki.contentStyle) && (!wiki.subject) && (!wiki.navBar)){
            console.warn('You created a wiki without any content')
        }
        
        this.prefix.pop();

        for(const displaySize of wiki.displaySize){
            this.generate.push(this.displaySizeStary(displaySize));
            this.wikiGen(displaySize.element);
            this.generate.push("}");
        }

    }

    displaySizeStary<T>(displaySize:DisplaySize<T>){
        const result:string[] = ["@media screen"]
        if(displaySize.maxHeight!==-1){
            result.push(`and (max-height: ${displaySize.maxHeight}px)`)
        }
        if(displaySize.maxWidth!==-1){
            result.push(`and (max-width: ${displaySize.maxWidth}px)`)
        }
        if(displaySize.minWidth!==-1){
            result.push(`and (min-width: ${displaySize.minWidth}px)`)
        }
        if(displaySize.minHeight!==-1){
            result.push(`and (min-height: ${displaySize.minHeight}px)`)
        }
        result.push("{\n")
        return result.join(" ")
    }

    navBarGen(navBar:WikiNavBar){
        this.prefix.push(".navBar")

        if(navBar.blockStyle){
            this.generate.push(`${this.prefix.join(" ")+this.hoverPrefix} {\n${this.blockStyleGen(navBar.blockStyle).join("")}}\n`)
        }
        if(navBar.contentStyle){
            this.wikiElementGen(navBar.contentStyle)
        }

        if((!navBar.blockStyle) && (!navBar.contentStyle)){
            console.warn('You created a nav bar without any content')
        }

        this.prefix.pop();
    }

    subjectGen(subject:WikiSubject){
        this.prefix.push(".subject")

        if(subject.blockStyle){
            this.generate.push(`${this.prefix.join(" ")+this.hoverPrefix} {\n${this.blockStyleGen(subject.blockStyle).join("")}}\n`)
        }
        if(subject.titleStyle){
            this.titleGen(subject.titleStyle);
        }
        if(subject.contentStyle){
            this.wikiElementGen(subject.contentStyle)
        }
        if(subject.chapter){
            this.chapterGen(subject.chapter);
        }
        if(subject.tableOfContent){
            this.tableOfContentGen(subject.tableOfContent);
        }
        if (subject.infoBox) {
            this.infoBoxGen(subject.infoBox);
        }
        if(subject.summary){
            this.summaryGen(subject.summary);
        }
        if (subject.references) {
            this.referenceGen(subject.references);
        }
        if (subject.relatedSubject) {
            this.relatedSubjectGen(subject.relatedSubject);
        }

        if ((!subject.blockStyle) && (!subject.titleStyle) && (!subject.contentStyle) && (!subject.chapter) && (!subject.tableOfContent) && (!subject.infoBox) && (!subject.summary) && (!subject.references) && (!subject.relatedSubject)){
            console.warn('You created a subject without any content')
        }

        this.prefix.pop()
    }

    chapterGen(chapter:WikiChapter){
        this.prefix.push(".chapter")  

        if(chapter.blockStyle){
            this.generate.push(`${this.prefix.join(" ")+this.hoverPrefix} {\n${this.blockStyleGen(chapter.blockStyle).join("")}}\n`)
        }
        if(chapter.titleStyle){
            this.titleGen(chapter.titleStyle);
        }
        if(chapter.contentStyle){
            this.wikiElementGen(chapter.contentStyle);
        }
        if(chapter.classicChapter){
            this.classicChapterGen(chapter.classicChapter);
        }
        if (chapter.gallery) {
            this.galleryGen(chapter.gallery);
        }
        if(chapter.subChapter){
            this.chapterGen(chapter.subChapter);
        }

        if((!chapter.blockStyle) && (!chapter.titleStyle) && (!chapter.contentStyle) && (!chapter.classicChapter) && (!chapter.gallery) && (!chapter.subChapter)){
            console.warn('You created a chapter without any content')
        }

        this.prefix.pop();
    }



    galleryGen(gallery:WikiGallery){
        this.prefix.push(".gallery");


        if(gallery.galeryBoxStyle){
            this.generate.push(`${this.prefix.join(" ")+this.hoverPrefix} {\n${this.blockStyleGen(gallery.galeryBoxStyle).join("")}}\n`)
        }
        if(gallery.titleStyle){
            this.titleGen(gallery.titleStyle);
        }

        if(gallery.imagesStyle){
            this.prefix.push(".gallery-container")
            this.imageStyleGen(gallery.imagesStyle);
            this.prefix.pop();

        }
        const defaultStyleGallery=[`\??display: flex;\n`,`\??flex-wrap: wrap;\n`]
        this.generate.push(`${this.prefix.join(" ")} {\n${defaultStyleGallery.join("")}}\n`)
        this.prefix.pop();
    }

    relatedSubjectGen(relatedSubject:WikiRelatedSubject){
        this.prefix.push(".relatedSubject");    

        if(relatedSubject.blockStyle){
            this.generate.push(`${this.prefix.join(" ")+this.hoverPrefix} {\n${this.blockStyleGen(relatedSubject.blockStyle).join("")}}\n`)
        }
        if(relatedSubject.titleStyle){
            this.titleGen(relatedSubject.titleStyle);
        }
        if(relatedSubject.contentStyle){
            this.wikiElementGen(relatedSubject.contentStyle);
        }

        if((!relatedSubject.blockStyle) && (!relatedSubject.titleStyle) && (!(relatedSubject.contentStyle))){
            console.warn('You created a related subject without any content')
        }

        this.prefix.pop();
    }

    referenceGen(reference:WikiReferences){
        this.prefix.push(".references");       

        if(reference.blockStyle){
            this.generate.push(`${this.prefix.join(" ")+this.hoverPrefix} {\n${this.blockStyleGen(reference.blockStyle).join("")}}\n`)
        }
        if(reference.titleStyle){
            this.titleGen(reference.titleStyle);
        }
        if(reference.contentStyle){
            this.wikiElementGen(reference.contentStyle);
        }

        if((!reference.blockStyle) && (!reference.titleStyle) && (!(reference.contentStyle))){
            console.warn('You created a reference without any content')
        }

        this.prefix.pop();
    }

    classicChapterGen(classicChap:WikiClassicChapter){
        this.prefix.push(".classicChapter");

        if(classicChap.blockStyle){
            this.generate.push(`${this.prefix.join(" ")+this.hoverPrefix} {\n${this.blockStyleGen(classicChap.blockStyle).join("")}}\n`)
        }
        if(classicChap.titleStyle){
            this.titleGen(classicChap.titleStyle);
        }
        if(classicChap.contentStyle){
            this.wikiElementGen(classicChap.contentStyle);
        }

        if((!classicChap.blockStyle) && (!classicChap.titleStyle) && (!(classicChap.contentStyle))){
            console.warn('You created a classic chapter without any content')
        }

        this.prefix.pop();
    }

    tableOfContentGen(toc:WikiTableOfContent){
        this.prefix.push(".tableOfContent");    

        if(toc.blockStyle){
            this.generate.push(`${this.prefix.join(" ")+this.hoverPrefix} {\n${this.blockStyleGen(toc.blockStyle).join("")}}\n`)
        }
        if(toc.titleStyle){
            this.titleGen(toc.titleStyle);
        }
        if(toc.contentStyle){
            this.wikiElementGen(toc.contentStyle)
        }

        if((!toc.blockStyle) && (!toc.titleStyle) && (!(toc.contentStyle))){
            console.warn('You created a table of content without any content')
        }

        this.prefix.pop();
    }

    infoBoxGen(infoBox:WikiInfoBox){
        this.prefix.push(".infoBox");

        if(infoBox.blockStyle){
            this.generate.push(`${this.prefix.join(" ")+this.hoverPrefix} {\n${this.blockStyleGen(infoBox.blockStyle).join("")}}\n`)
        }
        if(infoBox.contentStyle){
            this.wikiElementGen(infoBox.contentStyle)
        }

        if((!infoBox.blockStyle) && (!(infoBox.contentStyle))){
            console.warn('You created an info box without any content')
        }

        this.prefix.pop();
    }

    summaryGen(summary:WikiSummary){
        this.prefix.push(".summary");       

        if(summary.blockStyle){
            this.generate.push(`${this.prefix.join(" ")+this.hoverPrefix} {\n${this.blockStyleGen(summary.blockStyle).join("")}}\n`)
        }
        if(summary.contentStyle){
            this.wikiElementGen(summary.contentStyle)
        }

        if((!summary.blockStyle) && (!(summary.contentStyle))){
            console.warn('You created a summary without any content')
        }

        this.prefix.pop();
    }

    wikiElementGen(element:WikiElementStyle){  

        if(element.text){
            this.textGen(element.text)
        }
        if (element.image) {
            this.imageStyleGen(element.image)
         }
        if (element.table) {
            this.tableStyleGen(element.table)
        }
        if (element.button) {
            this.buttonStyleGen(element.button)
        }

        if((!element.text) && (!element.image) && (!element.table) && (!element.button)){
            console.warn('You created an element without any content')
        }

    }

    textGen(text:WikiText){
        this.prefix.push(".text")

        if(text.basic){
            const basicTextStyle = this.textStyleGen(text.basic)
            if(basicTextStyle.length>0){
                this.generate.push(`${this.prefix.join(" ")+this.hoverPrefix} {\n${basicTextStyle.join("")}}\n`)
            }
        }
        if(text.bold){
            const boldTextStyle = this.textStyleGen(text.bold)
            if(boldTextStyle.length>0){
                this.generate.push(`${this.prefix.join(" ")} b${this.hoverPrefix}{\n${boldTextStyle.join("")}}\n`)
            }
        }
        if(text.italic){
            const italicTextStyle = this.textStyleGen(text.italic)
            if(italicTextStyle.length>0){
                this.generate.push(`${this.prefix.join(" ")} i${this.hoverPrefix}{\n${italicTextStyle.join("")}}\n`)
            }
        }
        if(text.link){
            const linkTextStyle = this.textStyleGen(text.link)
            if(linkTextStyle.length>0){
                this.generate.push(`${this.prefix.join(" ")} a${this.hoverPrefix}{\n${linkTextStyle.join("")}}\n`)
            }
        }

        if((!text.basic) && (!text.bold) && (!text.italic) && (!text.link)){
            console.warn('You created a text without any content')
        }

        this.prefix.pop()
    }

    textStyleGen(text:WikiTextStyle){
        let result:string[] = []

        if(text.bold){
            result.push(`\tfont-weight: ${text.bold};\n`)
        }
        if(text.italic){
            result.push(`\tfont-style: ${text.italic};\n`)
        }
        if(text.caps){
            result.push(`\ttext-transform: ${text.caps};\n`)
        }
        if(text.font_color){
            result.push(`\tcolor: ${text.font_color};\n`)
        }
        if(text.font_size){
            result.push(`\tfont-size: ${text.font_size};\n`)
        }
        if(text.underline){
            result.push(`\ttext-decoration: ${text.underline};\n`)
        }
        if(text.text_alignment){
            result.push(`\ttext-align: ${text.text_alignment};\n`)
        }
        if(text.police){
            result.push(`\tfont-family: ${text.police};\n`);
        }

        if (result.length == 0){
            console.warn('You created a textStyle without setting any attributes')
        }

        return result
    }

    imageStyleGen(image:WikiImageStyle) {
        this.prefix.push(".image")
        let isUse = false;

        if(image.blockStyle){
            const imageStyle = this.blockStyleGen(image.blockStyle)
            this.generate.push(`${this.prefix.join(" ")+this.hoverPrefix}{\n${imageStyle.join("")}}\n`)
            isUse=true;
        }
        if(image.resumeStyle){
            const resumeStyle = this.textStyleGen(image.resumeStyle)
            this.generate.push(`${this.prefix.join(" ")+this.hoverPrefix}{\n${resumeStyle.join("")}}\n`)
            isUse=true;

        }
        if(image.blockResumeStyle){
            const blockResumeStyle = this.blockStyleGen(image.blockResumeStyle)
            this.generate.push(`${this.prefix.join(" ")+" .image-resume"+this.hoverPrefix}{\n${blockResumeStyle.join("")}}\n`)
            isUse=true;

        }
        if(image.blockImageStyle){
            const blockImageStyle = this.blockStyleGen(image.blockImageStyle)
            this.generate.push(`${this.prefix.join(" ")+" img"+this.hoverPrefix}{\n${blockImageStyle.join("")}}\n`)
            isUse=true;
        }
        if(!isUse){
            console.warn('You created a image without any content')
        }
        this.prefix.pop();
    }

    tableStyleGen(table:WikiTableStyle) {//TODO
        this.prefix.push("table")
        this.generate.push(`${this.prefix.join(" ")+this.hoverPrefix}{\n\tborder-collapse: ${table.borderCollapse?"collapse":"separate"};\n}\n`)
        if(table.tableBoxStyle){
            const tableBlockStyle = this.blockStyleGen(table.tableBoxStyle)
            this.generate.push(`${this.prefix.join(" ")+this.hoverPrefix}{\n${tableBlockStyle.join("")}}\n`)
        }        
        if(table.cellBlock){
            this.prefix.push("td")
            const cellStyle = this.blockStyleGen(table.cellBlock)
            this.generate.push(`${this.prefix.join(" ")+this.hoverPrefix}{\n${cellStyle.join("")}}\n`)
            this.prefix.pop()
        } 
        if(table.elementCellStyle){
            this.prefix.push("td")
            this.wikiElementGen(table.elementCellStyle)
            this.prefix.pop()
        } 
        if(table.boxColumnHeader){
            this.prefix.push(".table-header-column")
            const cellStyle = this.blockStyleGen(table.boxColumnHeader)
            this.generate.push(`${this.prefix.join(" ")+this.hoverPrefix}{\n${cellStyle.join("")}}\n`)
            this.prefix.pop()
        } 
        if(table.elementCellColumnHeader){
            this.prefix.push(".table-header-column")
            this.wikiElementGen(table.elementCellColumnHeader)
            this.prefix.pop()
        } 
        if(table.boxRowHeader){
            this.prefix.push("tr.table-header-row>td")
            const cellStyle = this.blockStyleGen(table.boxRowHeader)
            this.generate.push(`${this.prefix.join(" ")+this.hoverPrefix}{\n${cellStyle.join("")}}\n`)
            this.prefix.pop()
        } 
        if(table.elementCellRowHeader){
            this.prefix.push("tr.table-header-row>td")
            this.wikiElementGen(table.elementCellRowHeader)
            this.prefix.pop()
        } 
        this.prefix.pop()
        return;
    }

    buttonStyleGen(button:WikiButtonStyle) {
        this.prefix.push(".button")

        if(button.block){
            const blockStyle = this.blockStyleGen(button.block)
            this.generate.push(`${this.prefix.join(" ")+this.hoverPrefix}{\n${blockStyle.join("")}}\n`)
        }
        if(button.text){
            const textStyle = this.textStyleGen(button.text)
            this.generate.push(`${this.prefix.join(" ")+this.hoverPrefix}{\n${textStyle.join("")}}\n`)
        }
        if((!button.block) && (!button.text)){
            console.warn('You created a button without any content')
        }
        this.prefix.pop();
    }

    blockStyleGen(block:WikiBlockStyle){
        //Add class ?
        let result:string[] = []

        if(block.background){
            result.push(`\tbackground-color: ${block.background};\n`)
        }
        if(block.border){
            result.push(`\tborder: ${block.border};\n`)
        }
        if(block.borderTop){
            result.push(`\tborder-top: ${block.borderTop};\n`)
        }
        if(block.borderBot){
            result.push(`\tborder-bottom: ${block.borderBot};\n`)
        }
        if(block.borderLeft){
            result.push(`\tborder-left: ${block.borderLeft};\n`)
        }
        if(block.borderRight){
            result.push(`\tborder-right: ${block.borderRight};\n`)
        }
        if(block.margin){
            result.push(`\tmargin: ${block.margin};\n`)
        }
        if(block.padding){
            result.push(`\tpadding: ${block.padding};\n`)
        }
        if(block.alignment){
            result.push(`\talign-content: ${block.alignment};\n`)
            result.push(`\ttext-align: ${block.alignment};\n`)
            if(block.alignment=="center"){
                result.push(`\tmargin-left: auto;\n`);
                result.push(`\tmargin-right: auto;\n`)
            }
            if(block.alignment==AlignContent.NORMAL){
                result.push(`\tmargin-right: auto;\n`)
            }
            if(block.alignment==AlignContent.END){
                result.push(`\tmargin-left: auto;\n`);
            }
        }
        if(block.display) {
            result.push(`\tdisplay: ${block.display};\n`)
        }
        if(block.float) {
            result.push(`\tfloat: ${block.float};\n`)
        }
        if(block.width) {
            result.push(`\twidth: ${block.width};\n`)
        }
        if(block.height) {
            result.push(`\theight: ${block.height};\n`)
        }
        if(block.shadowColor) {
            result.push(`\tbox-shadow: 2px 2px ${block.shadowColor};\n`)
        }
        if (block.columnNumber) {
            result.push(`\tcolumn-count: ${block.columnNumber};\n`)
        }
        if (block.borderRadius) {
            result.push(`\tborder-radius: ${block.borderRadius};\n`)
        }
        if(block.maxHeight){
            result.push(`\tmax-height: ${block.maxHeight};\n`)
        }
        if(block.maxWidth){
            result.push(`\tmax-width: ${block.maxWidth};\n`)
        }

        if (result.length == 0){
            console.warn('You created a blockStyle without setting any attributes')
        }

        return result;
    }

    titleGen(title:WikiTitleStyle){
        if(!title.wikiTextStyle&&!title.wikiBlockStyle){return}
        this.prefix.push(".title");
        this.generate.push(`${this.prefix.join(" ")+this.hoverPrefix} {\n`);
        if(title.wikiTextStyle){
            this.generate.push(`${this.textStyleGen(title.wikiTextStyle).join("")}`);
        }
        if(title.wikiBlockStyle){
            this.generate.push(`${this.blockStyleGen(title.wikiBlockStyle).join("")}`);
        }
        this.generate.push("}\n");
        this.prefix.pop();
    }

}
