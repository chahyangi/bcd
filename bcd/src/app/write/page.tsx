"use client"; // 사용자의 입력을 실시간으로 처리하기 위해 클라이언트 컴포넌트로 선언

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const existingPosts = JSON.parse(localStorage.getItem("posts") || "[]");
  
  // 새로운 번호 매기기 (기존 글 개수 + 1)
  const newPostId = (existingPosts.length + 1).toString();

  const newPost = {
    postId: newPostId, // 이제 1, 2, 3... 처럼 예쁘게 나옵니다.
    title: title,
    content: content,
    authorId: "da-hoon",
    date: new Date().toLocaleDateString(),
  };

  const updatedPosts = [newPost, ...existingPosts];
  localStorage.setItem("posts", JSON.stringify(updatedPosts));

  alert("글이 저장되었습니다!");
  router.push("/");
};

  return (
    <div className="max-w-2xl mx-auto p-10">
    
      // ... 기존 코드 상단에 추가
            <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">BCD 블로그 피드</h1>
            <Link href="/write">
                <button className="px-6 py-2 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all">
                + 새 글 쓰기
                </button>
            </Link>
            </div>
      <h1 className="text-3xl font-black mb-8 text-gray-900 underline decoration-blue-500 decoration-4 underline-offset-8">
        새 글 작성하기
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 제목 입력 */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            className="w-full p-4 border-2 border-gray-100 rounded-xl focus:border-blue-500 focus:outline-none transition-all"
            required
          />
        </div>

        {/* 본문 입력 */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">내용 (Markdown 지원 예정)</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="당신의 이야기를 들려주세요..."
            rows={10}
            className="w-full p-4 border-2 border-gray-100 rounded-xl focus:border-blue-500 focus:outline-none transition-all resize-none"
            required
          />
        </div>

        {/* 버튼 섹션 */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 py-4 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-all"
          >
            취소
          </button>
          <button
            type="submit"
            className="flex-[2] py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 hover:shadow-lg transition-all"
          >
            출판하기
          </button>
        </div>
      </form>
    </div>
  );
}