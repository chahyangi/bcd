"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// 1. 색상 데이터 (3종)
const COLORS = [
  { id: "red", label: "레드", value: "#FF4D4D" },
  { id: "blue", label: "블루", value: "#4D94FF" },
  { id: "green", label: "그린", value: "#2ECC71" },
];

// 2. 모양 데이터 (순서: 세모 -> 네모 -> 원)
const SHAPES = [
  { id: "triangle", label: "세모", radius: "0", path: "polygon(50% 0%, 0% 100%, 100% 100%)" },
  { id: "square", label: "네모", radius: "8px", path: "none" },
  { id: "circle", label: "원", radius: "50%", path: "none" },
];

export default function LoginPage() {
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedShape, setSelectedShape] = useState(SHAPES[0]);
  const router = useRouter();

  // 이미 로그인된 상태라면 로그인 페이지를 보여주지 않고 피드로 튕겨냄
  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      router.replace("/feed");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const identityId = `${selectedColor.id}-${selectedShape.id}`;
    
    // 데이터 저장 후 본인의 블로그로 이동
    localStorage.setItem("currentUser", JSON.stringify({ 
      id: identityId,
      colorValue: selectedColor.value 
    }));
    
    router.push(`/user/${identityId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-100">
        
        <header className="text-center mb-12">
          <h1 className="text-4xl font-black tracking-tighter mb-2 italic">BCD IDENTITY</h1>
          <p className="text-gray-400 text-sm font-medium">나만의 정체성을 선택하세요.</p>
        </header>

        <form onSubmit={handleLogin} className="space-y-12">
          {/* Step 1. 색상 선택 */}
          <div className="flex justify-center gap-6">
            {COLORS.map((color) => (
              <button
                type="button"
                key={color.id}
                onClick={() => setSelectedColor(color)}
                className={`w-12 h-12 rounded-full transition-all ${
                  selectedColor.id === color.id ? "ring-4 ring-offset-4 ring-black scale-110" : "opacity-30 hover:opacity-100"
                }`}
                style={{ backgroundColor: color.value }}
              />
            ))}
          </div>

          {/* Step 2. 모양 선택 (세모-네모-원) */}
          <div className="flex justify-center gap-6">
            {SHAPES.map((shape) => (
              <button
                type="button"
                key={shape.id}
                onClick={() => setSelectedShape(shape)}
                className={`w-20 h-20 flex items-center justify-center rounded-2xl border-2 transition-all ${
                  selectedShape.id === shape.id ? "border-black bg-gray-50 shadow-inner" : "border-transparent bg-gray-50"
                }`}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    backgroundColor: selectedColor.value,
                    borderRadius: shape.radius,
                    clipPath: shape.path,
                    transition: "all 0.3s ease"
                  }}
                />
              </button>
            ))}
          </div>

          <button 
            type="submit" 
            className="w-full py-5 rounded-2xl bg-black text-white font-black text-lg shadow-xl hover:bg-gray-800 active:scale-95 transition-all"
          >
            START BLOGGING
          </button>
          
          <p className="text-center text-[11px] font-bold text-gray-300 uppercase tracking-widest">
            Identity: <span className="text-black underline">{selectedColor.id}-{selectedShape.id}</span>
          </p>
        </form>
      </div>
    </div>
  );
}