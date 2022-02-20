import TableOfContent from './table-of-content-component'
import WikiSubject from '../model/kernel/models/subject'

import Summary from './summary-component'
import ChapterComponent from './chapter-component'
import { SubjectContent } from '../model/kernel/models/content'

export default function SubjectComponent({subject, content}:{subject:WikiSubject, content:SubjectContent}) {
  return (
    <div className='subject'>
      <h1>{content.subject}</h1>
      {content.summary?<Summary summary={{}} content={content.summary}/>:undefined}
      {content.tableOfContent?<TableOfContent toc={{numerated:true}} content={content.tableOfContent} />:undefined }
      {content.chapters?.map((chapter) =>{return <ChapterComponent chapterStyle={subject.chapter} content={chapter}/>})}
    </div>
  )
}