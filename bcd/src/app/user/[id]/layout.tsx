"use client"; // useRouter를 쓰기 위해 클라이언트 컴포넌트로 변경 (이미 layout에서 async/await를 쓰고 있었다면 구조 조정이 필요할 수 있음)

import { getIdentity } from "@/lib/utils";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { primaryColor, shapeType } = getIdentity(id);

  const handleLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      localStorage.removeItem("currentUser"); // 로그인 정보 삭제
      router.push("/login"); // 로그인 페이지로 이동
    }
  };

  return (
    <div style={{ backgroundColor: `${primaryColor}10`, minHeight: '100vh' }}>
      <header className="p-5 bg-white shadow-sm flex justify-between items-center">
        <Link href="/">
          <h2 className="font-bold hover:opacity-70 transition-all" style={{ color: primaryColor }}>
            {id.toUpperCase()}
          </h2>
        </Link>
        
        <div className="flex items-center gap-4">
          {/* 로그아웃 버튼 */}
          <button 
            onClick={handleLogout}
            className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors"
          >
            LOGOUT
          </button>
          
          {/* 유저 고유 도형 */}
          <div 
            className="w-8 h-8" 
            style={{ 
              backgroundColor: primaryColor, 
              borderRadius: shapeType === 'circle' ? '50%' : '0' 
            }}
          />
        </div>
      </header>
      {children}
    </div>
  );
}