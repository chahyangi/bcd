"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from 'next/link';

export default function UserPage() {
  const params = useParams();
  const id = params.id as string;
  const [userPosts, setUserPosts] = useState<any[]>([]);

  useEffect(() => {
    // 1. 로컬 스토리지에서 모든 글 가져오기
    const allPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    
    // 2. 현재 접속한 블로그 주인(id)의 글만 필터링
    const filteredPosts = allPosts.filter((post: any) => post.authorId === id);
    
    setUserPosts(filteredPosts);
  }, [id]);

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-black mb-2">{id}님의 블로그</h1>
        <p className="text-gray-500 font-medium">
          총 {userPosts.length}개의 기록이 있습니다.
        </p>
      </header>

      <div className="space-y-6">
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <Link 
              key={post.postId} 
              href={`/user/${id}/post/${post.postId}`}
              className="block p-6 bg-white border-2 border-transparent hover:border-black rounded-3xl shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold mb-2 group-hover:underline">{post.title}</h2>
                  <p className="text-gray-400 text-sm">{post.date}</p>
                </div>
                <span className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400">아직 작성된 글이 없습니다.</p>
            <Link href="/write" className="text-blue-500 font-bold mt-2 inline-block hover:underline">
              첫 글 쓰러 가기
            </Link>
          </div>
        )}
      </div>

      {/* 홈으로 돌아가기 버튼 (BCD 피드) */}
      <div className="mt-12 text-center">
        <Link href="/" className="text-sm font-bold text-gray-300 hover:text-black transition-all">
          ← 전체 피드 보기
        </Link>
      </div>
    </div>
  );
}