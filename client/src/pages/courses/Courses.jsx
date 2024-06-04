import React from 'react'
import './courses.css'
import { CourseData } from '../../context/CourseContext'
import CourseCard from '../../components/coursecard/CourseCard';

const Courses = () => {
    const { courses } = CourseData();
    return (
        <div className='course'>
            <h2>Available Courses</h2>
            <div className='course-container'>
                {
                    courses && courses.length>0 ?courses.map((e)=>(
                        <CourseCard key={e._id} course={e}/>
                    )):<p>No courses found</p>
                }
            </div>
        </div>
    )
}

export default Courses