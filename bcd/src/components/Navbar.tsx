"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { getIdentity } from "@/lib/utils";

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) setCurrentUser(JSON.parse(user));
    else setCurrentUser(null);
  }, [pathname]);

  const handleLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      localStorage.removeItem("currentUser");
      setCurrentUser(null);
      router.push("/feed"); // 로그아웃 시 피드로 이동
    }
  };

  // 로고 클릭 시: 로그인 상태면 내 블로그, 아니면 피드
  const logoHref = currentUser ? `/user/${currentUser.id}` : "/feed";

  return (
    <nav className="w-full h-16 bg-white border-b flex items-center justify-between px-8 sticky top-0 z-50">
      <div className="flex items-center gap-10">
        <Link href={logoHref} className="font-black text-2xl tracking-tighter hover:opacity-70 transition-all">
          BCD BLOG
        </Link>
        <Link href="/feed" className={`text-xs font-black tracking-widest hover:text-black transition-colors ${pathname === '/feed' ? 'text-black' : 'text-gray-300'}`}>
          GLOBAL FEED
        </Link>
      </div>

      <div className="flex items-center gap-6">
        {currentUser ? (
          <>
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-full border">
              <div 
                className="w-3 h-3" 
                style={{ 
                  backgroundColor: getIdentity(currentUser.id).primaryColor,
                  borderRadius: getIdentity(currentUser.id).shapeType === 'circle' ? '50%' : '0',
                  clipPath: getIdentity(currentUser.id).shapeType === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'
                }} 
              />
              <span className="font-bold text-sm">{currentUser.id}</span>
            </div>
            <Link href="/write" className="text-xs font-black bg-black text-white px-5 py-2.5 rounded-xl hover:opacity-80 transition-all">WRITE</Link>
            <button onClick={handleLogout} className="text-xs font-bold text-gray-300 hover:text-red-500 transition-colors">LOGOUT</button>
          </>
        ) : (
          <Link href="/login" className="text-xs font-black bg-blue-500 text-white px-5 py-2.5 rounded-xl hover:bg-blue-600 transition-all uppercase tracking-widest">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}