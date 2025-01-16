import React from 'react'
import Card from './Card';
import { useState } from 'react';

const Cards = (props) => {
    let courses = props.courses;
    let category = props.category;
    //starting m koi bhi course liked nhi hai.
    const [likedCourses, setLikedCourses] = useState([]);
    
    function getCourses() {
        if(category === "All") {
            let allCourses = [];
            //sare course ki value nikal di then sare course ko array m store kra diya.
            Object.values(courses).forEach(array => {
                array.forEach(courseData => {
                    allCourses.push(courseData);
                })
            })
            return allCourses;
        }
        else {
            //main sirf specific categiry ka data array krunga  
            return courses[category];      
        }

    }

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-4">
      {
        getCourses().map( (course) => (
            <Card key={course.id} 
            course = {course} 
            likedCourses={likedCourses}
            setLikedCourses={setLikedCourses}/>
        ))
      }
    </div>
  )
}

export default Cards
