"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  
  const [post, setPost] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);   // 관리자 여부
  const [isAuthor, setIsAuthor] = useState(false); // 본인 글 여부

  useEffect(() => {
    if (!params?.postId) return;

    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    const userJson = localStorage.getItem("currentUser");
    
    // 1. 현재 게시글 찾기
    const foundPost = savedPosts.find(
      (p: any) => String(p.postId).trim() === String(params.postId).trim()
    );

    if (foundPost) {
      setPost(foundPost);
      
      // 2. 권한 체크
      if (userJson) {
        const currentUser = JSON.parse(userJson);
        
        // 관리자 권한 확인 (red-triangle)
        if (currentUser.id === "red-triangle") {
          setIsAdmin(true);
        }
        
        // 작성자 본인 확인
        if (currentUser.id === foundPost.authorId) {
          setIsAuthor(true);
        }
      }
    }
    setIsLoaded(true);
  }, [params]);

  // 삭제 로직 (관리자 또는 작성자 본인)
  const handleDelete = () => {
    const confirmMsg = isAdmin && !isAuthor 
      ? "관리자 권한으로 이 글을 삭제하시겠습니까?" 
      : "기록을 영구히 삭제하시겠습니까?";

    if (confirm(confirmMsg)) {
      const allPosts = JSON.parse(localStorage.getItem("posts") || "[]");
      const filtered = allPosts.filter((p: any) => String(p.postId) !== String(params.postId));
      
      localStorage.setItem("posts", JSON.stringify(filtered));
      alert("삭제되었습니다.");
      
      // 삭제 후 피드로 이동
      router.push("/feed");
      router.refresh();
    }
  };

  if (!isLoaded) return <div className="p-20 text-center font-black animate-pulse text-gray-300">LOADING...</div>;
  if (!post) return <div className="p-20 text-center"><p className="font-bold">글을 찾을 수 없습니다.</p></div>;

  return (
    <div className="p-10 max-w-3xl mx-auto min-h-screen">
      {/* 권한 알림 및 삭제 버튼 (작성자 또는 관리자에게만 노출) */}
      {(isAuthor || isAdmin) && (
        <div className={`mb-10 p-5 rounded-2xl flex justify-between items-center border-2 ${isAdmin && !isAuthor ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'}`}>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-50">
              {isAdmin && !isAuthor ? "Admin Management Mode" : "My Post Management"}
            </span>
            <span className="text-xs font-bold text-gray-500">이 게시물을 삭제할 수 있는 권한이 있습니다.</span>
          </div>
          <button 
            onClick={handleDelete} 
            className="px-5 py-2.5 bg-red-500 text-white text-xs font-black rounded-xl hover:bg-red-600 transition-all shadow-lg shadow-red-100"
          >
            DELETE
          </button>
        </div>
      )}

      <header className="mb-16">
        <span className="text-xs font-black text-gray-300 uppercase tracking-widest block mb-4 italic">Author: {post.authorId}</span>
        <h1 className="text-6xl font-black text-gray-900 leading-tight tracking-tighter">{post.title}</h1>
      </header>
      
      <div className="min-h-[300px] text-xl leading-relaxed text-gray-700 whitespace-pre-wrap font-medium">
        {post.content}
      </div>

      <footer className="mt-32 pt-10 border-t flex justify-between items-center">
        <Link href={`/user/${post.authorId}`} className="font-black text-gray-400 hover:text-black transition-colors underline underline-offset-8 decoration-2">
          ← AUTHOR'S BLOG
        </Link>
        <div className="text-[10px] font-black text-gray-200 tracking-[0.3em]">{post.date}</div>
      </footer>
    </div>
  );
}