import { getMeal } from '@/lib/meal'
import React from 'react'

import Image from "next/image"
import classes from "./page.module.css"
import { notFound } from 'next/navigation'

export async function generateMetadata({params}) {
  const meal = getMeal(params.mealSlug);

  if(!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  }
};


const MealDetail = ({params}) => {
  const meal = getMeal(params.mealSlug)


  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, '<br />')

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill/>
        </div>
        <div className={classes.headerText}>
          <h2>Title</h2>
          <p className={classes.creator}>by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a></p>
          <p className={classes.summary}>SUMMARY</p>
        </div>
      </header>
      <main>
        <p className={classes.instructions} dangerouslySetInnerHTML={{__html: meal.instructions,}}></p>
      </main>
    </>
  )
}

export default MealDetail
