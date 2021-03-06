import {ImageContent} from "../model/kernel/models/content"

export default function ImageComponent({content}:{content:ImageContent}) {
  return (
    <div className="image">
      <img src={content.url} alt={content.description}/>
      <p className="image-resume">{content.description}</p>
    </div>
  )
}
