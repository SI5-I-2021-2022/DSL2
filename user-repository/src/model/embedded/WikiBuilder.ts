import Wiki from "../kernel/models/wiki";
import { BlockStyleBuilder } from "./BlockStyleBuilder";
import { SubjectBuilder } from "./SubjectBuilder";
import { WikiElementStyleBuilder } from "./WikiElementStyleBuilder";
import {NavBarBuilder} from "./NavBarBuilder";
import { DisplaySize } from "../kernel/models/display-size";

export class WikiBuilder{
    private content?:WikiElementStyleBuilder
    private block?:BlockStyleBuilder<WikiBuilder>
    private subject?:SubjectBuilder
    private navBar?:NavBarBuilder
    private hover?:WikiBuilder
    private isHover!:boolean
    private displaySize:DisplaySize<WikiBuilder>[]=[]
    private root!:WikiBuilder


    private constructor(isHover:boolean,root?:WikiBuilder){
        this.isHover=isHover
        if(root){
            this.root=root;
        }else{
            this.root=this
        }
     }
    static createWiki(){
        const rootBuilder = new WikiBuilder(false)
        return rootBuilder;
    }

    /**
     * Permet d'editer le style du hover
     * @returns Le builder du hover du wiki
     */
    editOnHoverStyle(){
        if(this.isHover) return this;

        if(!this.hover){
            this.hover = new WikiBuilder(true);
        }
        return this.hover;
    }

    /**
     * Permet de designer differement selon la taille de l'ecran
     * @param param0 Les condition de l'affichage en fonction de la taille de l'ecran
     * @returns Le wiki builder 
     */
    editAlternativeDisplayStyle({minWidth,minHeght,maxWidth,maxHeight}:
        {minWidth?:number,minHeght?:number,maxWidth?:number,maxHeight?:number}){
        const displaySize = new DisplaySize(new WikiBuilder(this.isHover,this.root))
        if(minHeght){
            displaySize.minHeight=minHeght
        }
        if(minWidth){
            displaySize.minWidth=minWidth
        }
        if(maxHeight){
            displaySize.maxHeight=maxHeight
        }
        if(maxWidth){
            displaySize.maxWidth=maxWidth
        }

        displaySize.minWidth
        this.root.displaySize.push(displaySize)

        return displaySize.element;
    }

    /**
     * permet de retourné au builder par defaut (sans taille d'ecran particuliere)
     * @returns le builder principale
     */
    returnToNormalDisplayStyle(){
        return this.root;
    }

    /**
     * Permet d'editer le style de la box du wiki
     * @returns Le builder pour editer la box du wiki
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
     * Permet d'editer le style du  sujet
     * @returns Le builder du sujet
     */
    editSubjectStyle(){
        let builder = this.subject;

        if(!builder!){
            builder = new SubjectBuilder();
            this.subject = builder;
        }
        return builder;
    }

    /**
     * Permet d'editer le style des elements de tout le wiki
     * @returns Le builder du style des element
     */
    editContentStyle(){
        let builder = this.content;

        if(!builder){
            builder = new WikiElementStyleBuilder();
            this.content = builder;
        }
        return builder;
    }

    /**
     * Permet d'editer le style de la nav bar
     * @returns Le builder pour editer la nav bar
     */
    editNavBarStyle(){
        if(!this.navBar){
            this.navBar = new NavBarBuilder();
        }
        return this.navBar;
    }



    createModel():Wiki{
        const content = this.content?.createModel();
        const block = this.block?.createModel();
        const subject = this.subject?.createModel();
        const navBar = this.navBar?.createModel();
        const hover = this.hover?.createModel();
        const displaySize = this.displaySize.map((elt)=>{
            const elementSized = new DisplaySize(elt.element.createModel())
            elementSized.maxHeight=elt.maxHeight
            elementSized.maxWidth=elt.maxWidth
            elementSized.minHeight=elt.minHeight
            elementSized.minWidth=elt.minWidth
            return elementSized
        })
        return new Wiki({content:content, block:block, subject:subject, navBar:navBar, hover:hover,displaySize:displaySize});
    }
}
