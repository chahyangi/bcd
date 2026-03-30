"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 로컬 저장소에서 글 불러오기
    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    setPosts(savedPosts);
  }, []);

  return (
    <main className="p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">BCD 피드</h1>
        <Link href="/write">
          <button className="px-6 py-2 bg-black text-white rounded-full font-bold hover:opacity-80">
            + 새 글 쓰기
          </button>
        </Link>
      </div>

      <div className="grid gap-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link key={post.postId} href={`/user/${post.authorId}/post/${post.postId}`}>
              <div className="p-6 border rounded-xl hover:shadow-lg transition-all bg-white">
                <h2 className="text-xl font-bold">{post.title}</h2>
                <p className="text-sm text-gray-400 mt-2">작성자: {post.authorId} | {post.date}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-center py-20 border-2 border-dashed rounded-xl">
            아직 작성된 글이 없습니다. 첫 번째 글을 작성해 보세요!
          </p>
        )}
      </div>
    </main>
  );
}