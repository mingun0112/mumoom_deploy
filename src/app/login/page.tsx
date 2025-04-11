'use client';

import { useState } from 'react';

export default function LoginPage() {
    return (
        <div className="relative min-h-screen font-[family-name:var(--font-geist-sans)]">
            {/* <form onSubmit={handleSubmit}> */}
            <form>
                <div>
                    <label>
                        아이디
                        <input
                            type="text"
                            // value={username}
                            // onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="아이디를 입력하세요"
                            style={{ width: '100%', padding: '8px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        비밀번호
                        <input
                            type="password"
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="비밀번호를 입력하세요"
                            style={{ width: '100%', padding: '8px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </label>
                </div>
                <button
                    type="submit"
                    style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    로그인
                </button>
            </form>
        </div>
    )
}