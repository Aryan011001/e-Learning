import React, { useState } from 'react'
import './auth.css';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { server } from '../../main';

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [btnLoading, setBtnLoading] = useState(false);
    const navigate = useNavigate();

    const params=useParams();

    const handleSubmit = async (e) => {
        setBtnLoading(true);
        e.preventDefault();
        try {
            const { data } = await axios.post(`${server}/api/user/reset?token=${token}`, { password });
            toast.success(data.message);
            navigate("/login");
            setBtnLoading(false);
        } catch (error) {
            toast.error(error.response.data.message)
            setBtnLoading(false);
        }
    }

    return (
        <div className='auth-form'>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='text'>Enter password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button disabled={btnLoading} className='common-btn'>
                    {btnLoading ? "Please Wait..." : "Forgot Password"} </button>
            </form>
        </div>

    )
}

export default ResetPassword