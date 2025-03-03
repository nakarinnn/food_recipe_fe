import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setUser } from '../features/user/userSlice';

interface LoginPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onRegister: () => void; // ฟังก์ชันไปหน้า Register
}

const LoginPopup: React.FC<LoginPopupProps> = ({ isOpen, onClose, onRegister }) => {
    const dispatch = useDispatch(); // Get the dispatch function

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = () => {
        setEmail('')
        setPassword('')
        setError('')
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/api/user/login", {
                email,
                password,
            },
                { withCredentials: true }
            );

            // Dispatch the setUser action to update Redux state
            dispatch(
                setUser({
                    id: response.data.user.id,
                    name: response.data.user.name,
                    email: response.data.user.email,
                    avatar_url: response.data.user.avatar_url,
                    isLoggedIn: true // Corrected this line
                })
            );

            setEmail("")
            setPassword("")
            setError("")

            onClose();
        } catch (err: any) {
            setError(err.response.data.message);
        }
    };

    return (
        // Conditionally render the popup content
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-md">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                    <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        onClick={onClose}
                    >
                        ✖
                    </button>
                    <h2 className="text-xl font-semibold text-center mb-4">Login</h2>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Error Message */}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                            Login
                        </button>
                    </form>

                    {/* ✅ เพิ่มข้อความ "ยังไม่มีบัญชี?" */}
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            ยังไม่มีบัญชี?
                            <button
                                onClick={() => {
                                    onRegister();
                                    onClose();
                                    handleRegister();
                                }}
                                className="text-blue-600 hover:underline ml-1"
                            >
                                ลงทะเบียน
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        )
    );
};

export default LoginPopup;
