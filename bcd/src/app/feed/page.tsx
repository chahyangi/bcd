"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getIdentity } from "@/lib/utils";

export default function FeedPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 로컬스토리지에서 글 목록만 가져옴 (로그인 여부 상관없음)
    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    setPosts(savedPosts.sort((a: any, b: any) => Number(b.postId) - Number(a.postId)));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-10 min-h-screen">
      <header className="mb-16">
        <h1 className="text-6xl font-black tracking-tighter uppercase mb-2">Global Feed</h1>
        <p className="text-gray-400 font-bold italic">Discovery all identities through their stories.</p>
      </header>

      <div className="grid gap-8">
        {posts.length > 0 ? (
          posts.map((post: any) => {
            const { primaryColor, shapeType } = getIdentity(post.authorId);
            return (
              <Link key={post.postId} href={`/user/${post.authorId}/post/${post.postId}`}>
                <div className="p-10 bg-white border rounded-[2.5rem] hover:shadow-2xl transition-all group relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-6">
                    <div 
                      className="w-4 h-4" 
                      style={{ 
                        backgroundColor: primaryColor, 
                        borderRadius: shapeType === 'circle' ? '50%' : '0',
                        clipPath: shapeType === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'
                      }} 
                    />
                    <span className="text-sm font-black text-gray-400 uppercase tracking-widest">{post.authorId}</span>
                  </div>
                  <h2 className="text-3xl font-black mb-4 group-hover:text-gray-600 transition-colors leading-tight">{post.title}</h2>
                  <p className="text-gray-500 leading-relaxed line-clamp-2 font-medium">{post.content}</p>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="py-40 text-center border-2 border-dashed rounded-[3rem] bg-gray-50/50">
            <p className="text-gray-300 font-black text-xl italic uppercase tracking-widest">No Stories Yet</p>
          </div>
        )}
      </div>
    </div>
  );
}