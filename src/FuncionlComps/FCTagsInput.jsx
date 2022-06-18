import { useState } from 'react'
import "../StyleSheets/TagsInput.css";
import { Button } from "react-bootstrap"


export default function FCTagsInput() {
    const [tags, setTags] = useState([])

    function handleKeyDown(e) {
      if (e.key === 'Enter' && e.target.value.charAt(0) ==='#') {
        const value = e.target.value
        if(value.trim() === '#') return
        setTags([...tags, value])
        e.target.value = '#'
      }
      else {
        return
      }
    }

    function removeTag(index){
        setTags(tags.filter((el, i) => i !== index))
    }

    function addTagBtn() {
      const newTag = document.getElementById("tags-input").value
      if (newTag.trim() === "#" || newTag.charAt(0) !== "#") return 
      setTags([...tags, newTag])
      document.getElementById("tags-input").value = '#'
    }


    return (
        <div className="tags-input-container">
            { tags.map((tag, index) => (
                <div className="tag-item" key={index}>
                    <span className="text">{tag}</span>
                    <span className="close" onClick={() => removeTag(index)}>&times;</span>
                </div>
            )) }
            <input onKeyDown={handleKeyDown} type="text" className="tags-input" placeholder="הקלד תגית חדשה" defaultValue="#" id="tags-input"/>
            <Button variant='secondary' size='sm' onClick={() => addTagBtn()}>הוסף</Button>
        </div>
    )
}
