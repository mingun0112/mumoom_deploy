'use client'

import {useActionState, useEffect} from "react";
import {router} from "next/client";

export async function joinProcess(prevState: string, queryData: FormData) {
    const username = queryData.get('username');
    const password = queryData.get('password');

    console.log('회원가입 시도:', username, password);
    const res = await fetch(`/api/join`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
    });
    if (res.ok){
        return 'success';
    }
    return "error";

}

export default function Register() {
    const [message, formAction, isPending] = useActionState(joinProcess, "");
    useEffect(() => {
        if (message === 'success') {
            router.push('/login');
        }
    }, [message, router]);
return (
    <div>
    <div>{isPending ? "Loading..." : message}</div>
    <form action={formAction}>
        <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">아이디</label>
            <input
                id="username"
                name="username"
                type="text"
                // onChange={(e) => setUsername(e.target.value)}
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
                name="password"
                // onChange={(e) => setPassword(e.target.value)}
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
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
            회원가입


        </button>
    </form>
    </div>
)
}

