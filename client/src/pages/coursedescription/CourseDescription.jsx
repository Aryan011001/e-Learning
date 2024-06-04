import React, { useEffect, useState } from "react";
import "./courseDescription.css";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext";
import Loading from "../../components/loading/Loading";

const CourseDescription = ({ user }) => {
  const params = useParams();
  // console.log(params);

  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { fetchUser } = UserData();

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  const checkoutHandler = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    const {
      data: { order },
    } = await axios.post(
      `${server}/api/course/checkout/${params.id}`, // server/routes/course.js se ye endpoint mila h, aur controller mein hamko response mein order mil rha hai. toh vahi vala order receive kar rhe hai yahan
      {},
      {
        headers: {
          token,
        },
      }
    );

    const options = {
      key: "rzp_test_R5IuwYLmHMfBGy", // .env
      amount: order.id,
      currency: "INR",
      name: "E learning",
      description: "Learn with us",
      order_id: order.id,

      //callbackURL khud se banaya yahan
      handler: async function (response) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response; //ye 3 aaya hai form server/controllers/course.js se

        try {
          const { data } = await axios.post(
            `${server}/api/verification/${params.id}`, //routes se aaya ye ie server/routes/course.js
            {
              //ye req.body ki value hai 
              //controller/courses.js mein paymentVerification function mein yehi 3 chizen hai in req.body se, fir body bana rhe hai orderID and paymentID se, fir issi ko hash kiya with crypto se
              razorpay_payment_id, 
              razorpay_order_id, 
              razorpay_signature
            },
            { //header diya hai to show we are authenticated
              headers: {
                token,
              },
            }
          );

          await fetchUser();
          await fetchCourses();
          await fetchMyCourse();
          toast.success(data.message);
          setLoading(false);
          navigate(`/payment-success/${razorpay_payment_id}`);
        } catch (error) {
          toast.error(error.response.data.message);
          setLoading(false);
        }
      },
      theme: {
        color: "#8a4baf",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();
  };

  return (
    <>
      {loading ? (<Loading />) : (
        <>
          {course && <div className='course-description'>
            <div className='course-header'>
              <img src={`${server}/${course.image}`} alt="" className="course-image" />
              <div className='course-info'>
                <h2>{course.title}</h2>
                <p>Instructor: {course.createdBy}</p>
                <p>Duration: {course.duration}weeks</p>
              </div>


            </div>
            <p>{course.description}</p>

            <p>Lets's get started with this course at ₹{course.price}</p>
            {user && user.subscription.includes(course._id) ? (
              <button onClick={() => navigate(`/course/study/${course._id}`)} className='common-btn'>Study</button>
            ) : (
              <button onClick={checkoutHandler} className='common-btn'>Buy Now</button>
            )}
          </div>}
        </>
      )}

    </>
  )
}

export default CourseDescription