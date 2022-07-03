import React from 'react'
import { AiFillStar } from 'react-icons/ai'

export default function FCStarsToReturn({ numbersOfStars }) {
  
  // let stars = "";
  // // const numOfStars
  // if (numbersOfStars !== undefined) {
  //   stars = "";
  //   for (let index = 0; index < { numbersOfStars }; index++) {
  //     stars += <p>h</p> 
  //   }
  // }else{
  //   <div></div>
  //  }
  

  // return (
  //   <div>
  //     {numbersOfStars !== undefined ?
  //       <>
  //         {stars}
  //       </>
  //       : ""}
  //   </div>
  // )




  switch (numbersOfStars) {
    case 1:
      return (
        <AiFillStar />
      )
    case 2:
      return (
        <>
        <AiFillStar />
        <AiFillStar />
        </>
      )
    case 3:
      return (
        <>
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
        </>
      )
    case 4:
      return (
        <>
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
        </>
      )
    case 5:
      return (
        <>
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
        </>
      )

    default:
      return (
        ""
      )
  }
}