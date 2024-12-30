import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import InputField from "../utils/InputField.jsx";

export default function Sign({ username, setUsername, setLoggedin }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [signingIn, setSigningIn] = useState(true);
    const navigate = useNavigate();

    function handleSubmit(e) {
        if (signingIn) {
            fetch('http://localhost:3000/api/auth/login', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({
                    "username": username, "password": password
                }), credentials: 'include',
            }).then(res => {
                if (res.status !== 200) {
                    alert('Username or Password is incorrect');
                    return;
                }
                return res.json();
            }).then(data => {
                localStorage.setItem('username', username);
                localStorage.setItem('jwtKey', data.token);
                setLoggedin(true);
                navigate('/view');
            }).catch(err => {
                console.log(err);
            });
        } else {
            fetch('http://localhost:3000/api/auth/register', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({
                    username, email, password
                })
            }).then(res => {
                if (res.status !== 200) {
                    alert('Username or Password is incorrect');
                    return;
                }
                return res.json();
            }).then(data => {
                localStorage.setItem('username', username);
                localStorage.setItem('jwtKey', data.token);
                setLoggedin(true);
                navigate('/view');
            }).catch(err => {
                console.log(err);
            });
        }
    }

    return (
        <div className='h-screen flex justify-center items-center bg-gray-100'>
            <div className='bg-white w-96 p-6 rounded-lg'>
                <h1 className='text-2xl font-bold mb-4'>{signingIn ? 'Sign In' : 'Sign Up'}</h1>
                <div className='mb-4'>
                    {!signingIn && (
                        <InputField value={email} setValue={setEmail} label='Email' type='email' />
                    )}
                    <InputField value={username} setValue={setUsername} label='Username' type='text' />
                    <InputField value={password} setValue={setPassword} label='Password' type='password' />
                    {!signingIn && (
                        <InputField value={confirmPassword} setValue={setConfirmPassword} label='Confirm Password' type='password' />
                    )}
                </div>
                <div className='flex justify-between'>
                    <button 
                        onClick={() => setSigningIn(!signingIn)}
                        className="text-blue-600"
                    >
                        {signingIn ? 'Create an account' : 'Already have an account'}
                    </button>
                    <button 
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        {signingIn ? 'Sign In' : 'Sign Up'}
                    </button>
                </div>
            </div>
        </div>
    );
}
