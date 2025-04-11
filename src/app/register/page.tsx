'use client';

import { useState } from "react";


export default function RegisterPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // if (password !== confirmPassword) {
        //     setErrorMsg('비밀번호가 일치하지 않습니다.');
        //     return;
        // }

        const res = await fetch(`/api/joinProc`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include',
        });

        if (res.ok) {
            setSuccessMsg('회원가입 성공! 로그인 페이지로 이동합니다.');
            // setTimeout(() => router.push('/login'), 1500);
        } else {
            const data = await res.json();
            setErrorMsg(data.error || '회원가입 실패');
        }
    };
    const handleClick = () => {
        console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}/joinProc`);
    };

    return (
        <div className="relative min-h-screen font-[family-name:var(--font-geist-sans)]">

            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-md px-6 py-8 bg-white bg-opacity-80 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center mb-6">회원가입</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">아이디</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="아이디를 입력하세요"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">비밀번호</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="비밀번호를 입력하세요"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    {/* <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">비밀번호 확인</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder="비밀번호를 다시 입력하세요"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                        />
                    </div> */}
                    <button
                        onClick={handleClick}
                        type="submit"
                        className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                        회원가입


                    </button>
                </form>

                {errorMsg && <p className="text-red-500 text-center mt-4">{errorMsg}</p>}
                {successMsg && <p className="text-green-500 text-center mt-4">{successMsg}</p>}
            </div>


        </div>
    );
}
