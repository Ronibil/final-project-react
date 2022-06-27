import React from 'react'
import { AiFillStar } from 'react-icons/ai'

export default function FCStarsToReturn({ numbersOfStars }) {
  // const starsNumber = (numbersOfStars) => {
  //   let stars = "";
  //   for (let index = 0; index < { numbersOfStars }; index++) {
  //     stars += "h" 
  //   }
  //   return stars;
  // }

  // return (
  //   <>
  //   {starsNumber()}<b>:דירוג</b>
  //   </>
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