"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function PostDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const postId = params.postId as string;

  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    // 로컬 스토리지에서 전체 글 가져오기
    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    // 현재 URL의 postId와 일치하는 글 찾기
    const foundPost = savedPosts.find((p: any) => p.postId === postId);
    setPost(foundPost);
  }, [postId]);

  if (!post) {
    return <div className="p-10 text-gray-500">글을 찾는 중이거나 삭제된 게시글입니다.</div>;
  }

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <div className="mb-6">
        <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-500 uppercase">
          {id}'s Story
        </span>
      </div>

      <h1 className="text-4xl font-black text-gray-900 mb-6">{post.title}</h1>
      
      <div className="flex justify-between text-sm text-gray-400 mb-8 border-b pb-4">
        <span>작성자: {post.authorId}</span>
        <span>{post.date}</span>
      </div>

      <div className="text-lg leading-relaxed text-gray-800 whitespace-pre-wrap">
        {post.content}
      </div>
    </div>
  );
}