import { useState } from 'react'
import "../StyleSheets/TagsInput.css";
import { Button } from "react-bootstrap"
import { useLocation, useNavigate } from "react-router-dom";

export default function FCTagsInput() {
    const { state } = useLocation();
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
    const style = {
      textAlign: "center"
    }
    const demo = () => {
      const LocalUrl = "http://localhost:49812/tagRequest/NewRequest"
      let requestDate = new Date()
      const tagRequestObj = {
        Tags: tags,
        RequestStatus: "onHold",
        StudentId: state.StudentId,
        StudentName: state.StudentName,
        ClassName: state.ClassName,
        RequestDate: requestDate
      }
      console.log(tagRequestObj)
      console.log("start");
      fetch(LocalUrl, {
        method: "POST",
        body: JSON.stringify(tagRequestObj),
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json; charset=UTF-8",
        }),
      })
        .then((res) => {
          console.log("res.ok", res.ok);
          return res.json();
        })
        .then(
          (result) => {
            console.log("FETCH PostRequest= ", result);
          },
          (error) => {
            console.log("err post=", error);
          }
        );
        console.log("end");
    }


    return (
      <div className='center'>
        <h3 className='middle'>דף שליחת בקשות לתגיות</h3>
        <div className="tags-input-container" >
            { tags.map((tag, index) => (
                <div className="tag-item" key={index}>
                    <span className="text">{tag}</span>
                    <span className="close" onClick={() => removeTag(index)}>&times;</span>
                </div>
            )) }
            <input onKeyDown={handleKeyDown} type="text" className="tags-input" placeholder="הקלד תגית חדשה" defaultValue="#" id="tags-input"/>
            <Button variant='secondary' size='sm' onClick={() => addTagBtn()}>הוסף</Button>
        </div>
        <Button variant='success' onClick={() => demo()}>שלח</Button>
      </div>
    )
}
