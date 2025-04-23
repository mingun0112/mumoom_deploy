'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [jwtToken, setJwtToken] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch(`/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ username, password }),
        });

        if (res.ok) {
            // const data = await res.json();
            const token = res.headers.get('Authorization')!.split(' ')[1];
            // const token = res.headers.get('Authorization')!;
            setSuccessMsg('로그인 성공! 대시보드로 이동합니다.');


            // const token = data.token; // 서버에서 token을 JSON 응답으로 받는다고 가정
            setJwtToken(token); // 토큰 상태 업데이트
            localStorage.setItem("token", token);

            // 콘솔에 JWT 토큰 출력
            console.log('JWT Token:', token);
            setTimeout(() => router.push('/dashboard'), 1500);
        } else {
            const data = await res.json();
            setErrorMsg(data.error || '로그인 실패');
        }
    };

    return (
        <div className="relative min-h-screen font-[family-name:var(--font-geist-sans)]">
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-md px-6 py-8 bg-white bg-opacity-80 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center mb-6">로그인</h1>
                <form onSubmit={handleLogin}>
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
                    <div className="mb-6">
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
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        로그인
                    </button>
                </form>

                {errorMsg && <p className="text-red-500 text-center mt-4">{errorMsg}</p>}
                {successMsg && <p className="text-green-500 text-center mt-4">{successMsg}</p>}
            </div>
        </div>
    );
}
