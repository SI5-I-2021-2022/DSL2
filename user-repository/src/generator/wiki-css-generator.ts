
import WikiTextStyle from "../model/kernel/models/style/wiki-text-style";
import Wiki from "../model/kernel/models/wiki";
import WikiSubject from "../model/kernel/models/wiki-subject"
import createFile from "./utlis/file-utils";
import WikiElementStyle from "../model/kernel/models/elements/wiki-element";
import WikiText from "../model/kernel/models/elements/wiki-text";
import WikiBlockStyle from "../model/kernel/models/style/wiki-block-style";
import WikiTableOfContent from "../model/kernel/models/wiki-table-of-content";
import WikiSummary from "../model/kernel/models/wiki-summary";
import WikiChapter from "../model/kernel/models/chapters/wiki-chapter";
import WikiClassicChapter from "../model/kernel/models/chapters/wiki-classic-chapter";
import WikiBibliography from "../model/kernel/models/chapters/wiki-bibliography";
import WikiReferences from "../model/kernel/models/chapters/wiki-references";
import WikiRelatedSubject from "../model/kernel/models/chapters/wiki-related-subject";
import WikiGallery from "../model/kernel/models/chapters/wiki-gallery";
import WikiInfoBox from "../model/kernel/models/wiki-info-box";
import WikiNavBar from "../model/kernel/models/wiki-nav-bar";

export class WikiCssGenerator{
    generate:string[]=[]
    tab = 0;
    prefix:string[] = []


    generateCss(wiki:Wiki){
        this.wikiGen(wiki)
        return this.generate.join("")
    }

    generateCssFile(wiki:Wiki){
        this.wikiGen(wiki)
        createFile("../wiki-react/src/generate.css",this.generate.join(""))
    }

    wikiGen(wiki:Wiki){
        this.prefix.push(".wiki")

        if(wiki.blockStyle){
            this.generate.push(`${this.prefix.join(" ")} {\n${this.blockStyleGen(wiki.blockStyle).join("")}}\n`)
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
        this.prefix.pop();
    }

    navBarGen(navBar:WikiNavBar){
        this.prefix.push(".navBar")

        if(navBar.blockStyle){
            this.generate.push(`${this.prefix.join(" ")} {\n${this.blockStyleGen(navBar.blockStyle).join("")}}\n`)
        }
        if(navBar.contentStyle){
            this.wikiElementGen(navBar.contentStyle)
        }
        this.prefix.pop();
    }

    subjectGen(subject:WikiSubject){
        this.prefix.push(".subject")

        if(subject.blockStyle){
            this.generate.push(`${this.prefix.join(" ")} {\n${this.blockStyleGen(subject.blockStyle).join("")}}\n`)
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

        this.prefix.pop()
    }

    chapterGen(chapter:WikiChapter){
        this.prefix.push(".chapter")

        if(chapter.blockStyle){
            this.generate.push(`${this.prefix.join(" ")} {\n${this.blockStyleGen(chapter.blockStyle).join("")}}\n`)
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
        if (chapter.bibliography) {
            this.bibliographyGen(chapter.bibliography);
        }
        if (chapter.references) {
            this.referenceGen(chapter.references);
        }
        if (chapter.relatedSubject) {
            this.relatedSubjectGen(chapter.relatedSubject);
        }
        if (chapter.gallery) {
            this.galleryGen(chapter.gallery);
        }
        if(chapter.subChapter){
            this.subChapterGen(chapter.subChapter);
        }
        this.prefix.pop();
    }

    subChapterGen(subChapter:WikiChapter){
        this.prefix.push(".subChapter")

        if(subChapter.blockStyle){
            this.generate.push(`${this.prefix.join(" ")} {\n${this.blockStyleGen(subChapter.blockStyle).join("")}}\n`)
        }
        if(subChapter.titleStyle){
            this.titleGen(subChapter.titleStyle);
        }
        if(subChapter.contentStyle){
            this.wikiElementGen(subChapter.contentStyle);
        }
        if (subChapter.bibliography) {
            this.bibliographyGen(subChapter.bibliography);
        }
        if (subChapter.references) {
            this.referenceGen(subChapter.references);
        }
        if (subChapter.relatedSubject) {
            this.relatedSubjectGen(subChapter.relatedSubject);
        }
        if (subChapter.gallery) {
            this.galleryGen(subChapter.gallery);
        }
        if(subChapter.classicChapter){
            this.classicChapterGen(subChapter.classicChapter);
        }
        this.prefix.pop();
    }

    galleryGen(gallery:WikiGallery){
        this.prefix.push(".gallery");

        if(gallery.blockStyle){
            this.generate.push(`${this.prefix.join(" ")} {\n${this.blockStyleGen(gallery.blockStyle).join("")}}\n`)
        }
        if(gallery.titleStyle){
            this.titleGen(gallery.titleStyle);
        }
        if(gallery.contentStyle){
            this.wikiElementGen(gallery.contentStyle);
        }
        this.prefix.pop();
    }
    
    relatedSubjectGen(relatedSubject:WikiRelatedSubject){
        this.prefix.push(".relatedSubject");

        if(relatedSubject.blockStyle){
            this.generate.push(`${this.prefix.join(" ")} {\n${this.blockStyleGen(relatedSubject.blockStyle).join("")}}\n`)
        }
        if(relatedSubject.titleStyle){
            this.titleGen(relatedSubject.titleStyle);
        }
        if(relatedSubject.contentStyle){
            this.wikiElementGen(relatedSubject.contentStyle);
        }
        this.prefix.pop();
    }

    referenceGen(reference:WikiReferences){
        this.prefix.push(".reference");

        if(reference.blockStyle){
            this.generate.push(`${this.prefix.join(" ")} {\n${this.blockStyleGen(reference.blockStyle).join("")}}\n`)
        }
        if(reference.titleStyle){
            this.titleGen(reference.titleStyle);
        }
        if(reference.contentStyle){
            this.wikiElementGen(reference.contentStyle);
        }
        this.prefix.pop();
    }

    bibliographyGen(bibliographyGen:WikiBibliography){
        this.prefix.push(".bibliography");

        if(bibliographyGen.blockStyle){
            this.generate.push(`${this.prefix.join(" ")} {\n${this.blockStyleGen(bibliographyGen.blockStyle).join("")}}\n`)
        }
        if(bibliographyGen.titleStyle){
            this.titleGen(bibliographyGen.titleStyle);
        }
        if(bibliographyGen.contentStyle){
            this.wikiElementGen(bibliographyGen.contentStyle);
        }
        this.prefix.pop();
    }

    classicChapterGen(classicChap:WikiClassicChapter){
        this.prefix.push(".classicChapter");

        if(classicChap.blockStyle){
            this.generate.push(`${this.prefix.join(" ")} {\n${this.blockStyleGen(classicChap.blockStyle).join("")}}\n`)
        }
        if(classicChap.titleStyle){
            this.titleGen(classicChap.titleStyle);
        }
        if(classicChap.contentStyle){
            this.wikiElementGen(classicChap.contentStyle);
        }
        this.prefix.pop();
    }
    
    tableOfContentGen(toc:WikiTableOfContent){
        this.prefix.push(".tableOfContent");

        if(toc.blockStyle){
            this.generate.push(`${this.prefix.join(" ")} {\n${this.blockStyleGen(toc.blockStyle).join("")}}\n`)
        }
        if(toc.titleStyle){
            this.titleGen(toc.titleStyle);
        }
        if(toc.contentStyle){
            this.wikiElementGen(toc.contentStyle)
        }
        this.prefix.pop();
    }

    infoBoxGen(infoBox:WikiInfoBox){
        this.prefix.push(".infoBox");

        if(infoBox.blockStyle){
            this.generate.push(`${this.prefix.join(" ")} {\n${this.blockStyleGen(infoBox.blockStyle).join("")}}\n`)
        }
        if(infoBox.contentStyle){
            this.wikiElementGen(infoBox.contentStyle)
        }
        this.prefix.pop();
    }

    summaryGen(summary:WikiSummary){
        this.prefix.push(".summary");

        if(summary.blockStyle){
            this.generate.push(`${this.prefix.join(" ")} {\n${this.blockStyleGen(summary.blockStyle).join("")}}\n`)
        }
        if(summary.contentStyle){
            this.wikiElementGen(summary.contentStyle)
        }
        this.prefix.pop();
    }

    wikiElementGen(element:WikiElementStyle){
        if(element.text){
            this.textGen(element.text)
        }
    }

    textGen(text:WikiText){
        this.prefix.push(".text")

        if(text.basic){
            const basicTextStyle = this.textStyleGen(text.basic)
            if(basicTextStyle.length>0){
                this.generate.push(`${this.prefix.join(" ")} {\n${basicTextStyle.join("")}}\n`)
            }
        }
        if(text.bold){
            const boldTextStyle = this.textStyleGen(text.bold)
            if(boldTextStyle.length>0){
                this.generate.push(`${this.prefix.join(" ")} .bold{\n${boldTextStyle.join("")}}\n`)
            }
        }
        if(text.italic){
            const italicTextStyle = this.textStyleGen(text.italic)
            if(italicTextStyle.length>0){
                this.generate.push(`${this.prefix.join(" ")} .italic{\n${italicTextStyle.join("")}}\n`)
            }
        }
        if(text.link){
            const linkTextStyle = this.textStyleGen(text.link)
            if(linkTextStyle.length>0){
                this.generate.push(`${this.prefix.join(" ")} a {\n${linkTextStyle.join("")}}\n`)
            }
        }
        this.prefix.pop()
    }

    textStyleGen(text:WikiTextStyle){
        let result:string[] = []

        if(text.bold){
            result.push("\tfont-weight: bold;\n") // Bold seulement ou semi bold ect ??
        }
        if(text.italic){
            result.push("\tfont-style: italic;\n") //Idem ? 
        }
        if(text.caps){
            result.push("\ttext-transform: uppercase;\n") //TODO Trois mode plutot qu'un en réalité
        }
        if(text.font_color){
            result.push(`\tcolor: ${text.font_color};\n`)// Enum de color ? 
        }
        if(text.font_size){
            result.push(`\tfont-size: ${text.font_size};\n`) //TODO fixer l'unité avec un complément pour l'unité
        }
        if(text.underline){
            result.push(`\ttext-decoration: underline;\n`) //TODO verif que l'on veux pas permetre plus d'attribue comme dotted, une color ou autre
        }
        if(text.text_alignment){
            result.push(`\ttext-align: ${text.text_alignment};\n`)
        }
        if(text.police){
            result.push(`\tfont-family: ${text.police};\n`);
        }
        return result
    }

    blockStyleGen(block:WikiBlockStyle){
        //Add class ? 
        let result:string[] = []

        if(block.background){
            result.push(`\tbackground-color: ${block.background};\n`)// Enum de color ? 
        }
        if(block.border){
            result.push(`\tborder: ${block.border};\n`)//TODO meilleur composition de border ?
        }
        if(block.margin){
            result.push(`\tmargin: ${block.margin};\n`)// TODO margin localisée avec multi constructeur
        }
        if(block.padding){
            result.push(`\tpadding: ${block.padding};\n`)// TODO padding localisé avec multi constructeur
        }
        if(block.alignment){
            result.push(`\talign-content: ${block.alignment};\n`)// TODO padding localisé avec multi constructeur
        }

        return result;
    }

    titleGen(title:WikiTextStyle){
        this.prefix.push(".title");
        this.generate.push(`${this.prefix.join(" ")} {\n${this.textStyleGen(title).join("")}}\n`)
        this.prefix.pop();
    }

}