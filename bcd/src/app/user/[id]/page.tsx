"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getIdentity } from "@/lib/utils";

export default function UserBlogPage() {
  const params = useParams();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const userId = params?.id as string;

  useEffect(() => {
    if (!userId) return;

    const loadUserData = () => {
      try {
        // 1. 전체 게시글 로드 및 해당 유저 글 필터링
        const allPosts = JSON.parse(localStorage.getItem("posts") || "[]");
        const userPosts = allPosts.filter((p: any) => p.authorId === userId);
        
        // 최신순 정렬
        setPosts(userPosts.sort((a: any, b: any) => Number(b.postId) - Number(a.postId)));

        // 2. 본인 확인 (로그인된 유저와 현재 블로그 주인이 같은지)
        const userJson = localStorage.getItem("currentUser");
        if (userJson) {
          const currentUser = JSON.parse(userJson);
          if (currentUser.id === userId) {
            setIsOwner(true);
          }
        }
      } catch (e) {
        console.error("데이터 로드 에러:", e);
      } finally {
        // 에러가 나더라도 로딩 상태는 해제하여 무한 로딩 방지
        setIsLoaded(true);
      }
    };

    loadUserData();
  }, [userId]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  const { primaryColor } = getIdentity(userId);

  return (
    <div className="max-w-5xl mx-auto p-10 min-h-screen">
      {/* 상단 프로필 영역 */}
      <header className="mb-20 flex flex-col items-center">
        <div 
          className="w-24 h-24 mb-6 shadow-lg"
          style={{ 
            backgroundColor: primaryColor,
            borderRadius: userId.includes("circle") ? "50%" : "0",
            clipPath: userId.includes("triangle") ? "polygon(50% 0%, 0% 100%, 100% 100%)" : "none"
          }}
        />
        <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">{userId}</h1>
        <p className="text-gray-400 font-medium">Record of Identity</p>
        
        {isOwner && (
          <Link href="/write" className="mt-8 px-8 py-3 bg-black text-white rounded-full font-black text-xs hover:scale-105 transition-all">
            NEW POST
          </Link>
        )}
      </header>

      {/* 포스트 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.length > 0 ? (
          posts.map((post: any) => (
            <Link key={post.postId} href={`/user/${userId}/post/${post.postId}`}>
              <div className="group p-10 bg-white border border-gray-100 rounded-[2.5rem] hover:shadow-2xl transition-all h-full flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-black text-gray-300 mb-4 uppercase tracking-widest">{post.date}</div>
                  <h2 className="text-2xl font-black mb-4 group-hover:text-gray-600 transition-colors">{post.title}</h2>
                  <p className="text-gray-500 line-clamp-3 leading-relaxed">{post.content}</p>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-50 flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-300 group-hover:text-black transition-colors uppercase">Read Full Story</span>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-32 text-center border-2 border-dashed rounded-[3rem]">
            <p className="text-gray-300 font-black italic uppercase tracking-widest">No Stories Posted Yet</p>
          </div>
        )}
      </div>
    </div>
  );
}