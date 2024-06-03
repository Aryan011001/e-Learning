import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/Lecture.js";
import {promisify} from 'util';
import {User} from "../models/User.js";

import fs from "fs";

import {rm} from "fs";

export const createCourse = TryCatch(async (req, res) => {
    const { title, description, price, duration, category, createdBy } = req.body;
    const image = req.file;

    await Courses.create({
        title,
        description,
        image: image?.path,
        price,
        duration,
        category,
        createdBy
    });

    res.status(201).json({
        message: "Course created successfully",
    });
})

export const addLectures = TryCatch(async (req, res) => {
    const course = await Courses.findById(req.params.id);

    if (!course) return res.status(404).json({
        message: "Course not found"
    });

    const { title, description } = req.body;

    const file = req.file;
    const lecture = await Lecture.create({
        title,
        description,
        video: file?.path,
        course: course._id
    });

    res.status(201).json({
        message: "Lecture added successfully",
        lecture
    });
});

export const deleteLecture=TryCatch(async(req,res)=>{
    const lecture = await Lecture.findById(req.params.id);
    rm(lecture.video, ()=>{
        console.log("Lecture deleted successfully");
    })
    await lecture.deleteOne();
    res.json({
        message: "Lecture deleted successfully",
    });
});

const unlinkAsync=promisify(fs.unlink);

export const deleteCourse=TryCatch(async(req,res)=>{
    const course = await Courses.findById(req.params.id);
    const lectures=await Lecture.find({course:course._id});


    await Promise.all(
        lectures.map(async(lecture)=>{
            await unlinkAsync(lecture.video);
            console.log("Lecture deleted successfully");
        })
    );
    rm(course.image, ()=>{
        console.log("Course deleted successfully");
    });

    await Lecture.find({course:req.params._id}).deleteMany();

    await course.deleteOne();

    await User.updateMany({}, {$pull: {subscription: req.params.id}});

    res.json({
        message: "Course deleted successfully",
    });
});

export const getAllstats=TryCatch(async(req,res)=>{
    const totalCourse=(await Courses.find()).length;
    const totalLectures=(await Lecture.find()).length;
    const totalUsers=(await User.find()).length;

    const stats={
        totalCourse,
        totalLectures,
        totalUsers
    };

    res.json({
        stats,
    });
});