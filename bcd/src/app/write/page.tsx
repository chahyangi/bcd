"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userJson = localStorage.getItem("currentUser");
    if (userJson) {
      const user = JSON.parse(userJson);
      setCurrentUserId(user.id);
    } else {
      alert("로그인이 필요합니다.");
      router.push("/login");
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUserId) {
      alert("로그인 정보가 없습니다.");
      return;
    }

    const existingPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    
    // 🔥 고유 ID 생성 (중복 방지 및 문자열 통일)
    const newPostId = Date.now().toString();

    const newPost = {
      postId: newPostId,
      title: title,
      content: content,
      authorId: currentUserId,
      date: new Date().toLocaleDateString(),
    };

    const updatedPosts = [newPost, ...existingPosts];
    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    alert("글이 저장되었습니다!");
    router.push(`/user/${currentUserId}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-10">
      <div className="flex justify-between items-center mb-8">
        <Link href="/">
          <h1 className="text-xl font-bold text-gray-400 hover:text-black transition-all">← BCD 피드로</h1>
        </Link>
      </div>

      <h1 className="text-3xl font-black mb-8 text-gray-900 underline decoration-blue-500 decoration-4 underline-offset-8">
        새 글 작성하기
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            className="w-full p-4 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-black transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="당신의 이야기를 들려주세요..."
            rows={10}
            className="w-full p-4 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-black transition-all resize-none"
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 py-4 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200"
          >
            취소
          </button>
          <button
            type="submit"
            className="flex-[2] py-4 bg-black text-white font-bold rounded-xl hover:opacity-80"
          >
            출판하기
          </button>
        </div>
      </form>
    </div>
  );
}