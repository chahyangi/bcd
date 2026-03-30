


// src/app/user/[id]/page.tsx
import Link from 'next/link';

export default async function UserPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  // 임시 데이터 (나중에 DB나 서버에서 가져올 부분)
  const userPosts = [
    { postId: '1', title: `${id}님의 첫 번째 기록`, date: '2026.03.30' },
    { postId: '2', title: 'BCD 프로젝트 개발 일지', date: '2026.03.31' },
    { postId: '3', title: '도형 ID 시스템 설계기', date: '2026.04.01' },
  ];

  return (
    
    
    
    
    
    <div className="p-10 max-w-2xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-black mb-2">{id}님의 블로그</h1>
        <p className="text-gray-500 font-medium">총 {userPosts.length}개의 기록이 있습니다.</p>
      </header>

      <div className="space-y-6">
        {userPosts.map((post) => (
          <Link 
            key={post.postId} 
            href={`/user/${id}/post/${post.postId}`}
            className="block p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group"
          >
            <span className="text-xs font-bold text-blue-500 mb-2 block uppercase tracking-tighter">
              Post #{post.postId}
            </span>
            <h2 className="text-xl font-bold group-hover:text-blue-600 transition-colors">
              {post.title}
            </h2>
            <p className="text-gray-400 text-sm mt-3">{post.date}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}