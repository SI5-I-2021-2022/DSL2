import React from 'react'
import { ChapterContent, ClassiqueChapterContent, WikiElementContent} from '../model/kernel/models/content'
import ChapterComponent from './chapter-component'
import WikiElementComponent from './wiki-element-component'

export default function ClassicChapterComponent({content}:{content:ClassiqueChapterContent}) {
  return (
    <div className='classiChapter'>
        <h2 className='title'>{content.title}</h2>

        {content.chapterElementContent.map((elt,index)=>{
            console.log(elt)

            if(elt instanceof ChapterContent){
                return <ChapterComponent key={index} content={elt}/>
            }
            else if(elt instanceof WikiElementContent){
                return <WikiElementComponent key={index} content={elt}/>
            }
            return null;
        })}
    </div>
  )
}
