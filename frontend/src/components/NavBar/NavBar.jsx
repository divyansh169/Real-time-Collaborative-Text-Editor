import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Popover from '@mui/material/Popover';

export default function NavBar({ title, signedin, setsignedin, usernames }) {
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <div className="sticky top-0 bg-white p-4 flex justify-between items-center shadow-sm">
            <h1 className="text-lg text-gray-700">{title}</h1>

            <div className="flex items-center gap-2">
                {usernames && (
                    <>
                        <button 
                            aria-describedby={id} 
                            onClick={handleClick} 
                            className="bg-blue-500 text-white px-3 py-1 rounded-full"
                        >
                           Active Users : {usernames.length}
                        </button>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        >
                            <div className='p-2'>
                                {usernames.map((user, index) => (
                                    <p key={index} className='text-sm text-gray-700'>{user}</p>
                                ))}
                            </div>
                        </Popover>
                    </>
                )}

                {/* Username displayed in a styled box */}
                <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg shadow-md">
                    {username}
                </div>

                {/* Sign out button */}
                <button
                    onClick={() => {
                        setsignedin(false);
                        localStorage.removeItem('username');
                        localStorage.removeItem('jwtKey');
                        navigate('/');
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded-full"
                >
                    Sign out
                </button>
            </div>
        </div>
    );
}
