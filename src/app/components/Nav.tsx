import Image from "next/image";
import NavButton from "./NavButton";

export default function Nav() {
    return (
        <footer className="bg-black mt-12 rounded-t-xl border-white text-center text-gray-600 dark:text-gray-400">
            <div className="grid grid-cols-5 justify-between py-5 px-3">
                <NavButton src="/next.svg" alt="home" width={100} height={100} text="홈" />
                <NavButton src="/next.svg" alt="map" width={100} height={100} text="지도" />
                <div className="flex items-center justify-center -mt-9">
                    <div className="flex items-center justify-center bg-blue-500 rounded-xl w-15 h-15 p-2"><svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"

                    >
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                        <line x1="7" y1="7" x2="7" y2="7" />
                        <line x1="17" y1="7" x2="17" y2="7" />
                        <line x1="7" y1="17" x2="7" y2="17" />
                        <line x1="17" y1="17" x2="17" y2="17" />
                    </svg></div>
                </div>
                <NavButton src="/next.svg" alt="mycar" width={100} height={100} text="내 차" />
                <NavButton src="/next.svg" alt="mydata" width={100} height={100} text="내 정보" />
            </div>
        </footer >
    );
}