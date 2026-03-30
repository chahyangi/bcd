"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// 1. 확장성을 위해 데이터 배열로 관리
const COLORS = [
  { id: "red", value: "#FF4D4D", label: "R" },
  { id: "green", value: "#4DFF4D", label: "G" },
  { id: "blue", value: "#4D4DFF", label: "B" },
];

const SHAPES = [
  { id: "triangle", label: "삼", path: "polygon(50% 0%, 0% 100%, 100% 100%)" },
  { id: "square", label: "사", path: "none" },
  { id: "circle", label: "원", path: "none" },
];

export default function LoginPage() {
  const [selectedColor, setSelectedColor] = useState<typeof COLORS[0] | null>(null);
  const [selectedShape, setSelectedShape] = useState<typeof SHAPES[0] | null>(null);
  const router = useRouter();

  const handleLogin = () => {
    if (selectedColor && selectedShape) {
      // 2. 선택된 조합으로 고유 ID 생성 (예: red-triangle)
      const userId = `${selectedColor.id}-${selectedShape.id}`;
      
      // 3. 로컬 스토리지에 현재 로그인 정보 저장
      localStorage.setItem("currentUser", JSON.stringify({
        id: userId,
        color: selectedColor.value,
        shape: selectedShape.id
      }));

      // 4. 로그인 후 해당 유저의 블로그 메인으로 이동
      router.push(`/user/${userId}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100">
        <h1 className="text-3xl font-black text-center mb-2 italic tracking-tighter">bcd</h1>
        <p className="text-center text-gray-400 text-sm mb-10 font-medium">나만의 도형 아이덴티티로 로그인하세요</p>

        {/* 색상 선택 (3개) */}
        <div className="mb-8">
          <label className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4 block">Select Color</label>
          <div className="grid grid-cols-3 gap-4">
            {COLORS.map((color) => (
              <button
                key={color.id}
                onClick={() => setSelectedColor(color)}
                className={`h-16 rounded-2xl transition-all duration-300 ${
                  selectedColor?.id === color.id ? "ring-4 ring-black ring-offset-4 scale-90" : "hover:scale-105"
                }`}
                style={{ backgroundColor: color.value }}
              />
            ))}
          </div>
        </div>

        {/* 모양 선택 (3개) */}
        <div className="mb-12">
          <label className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4 block">Select Shape</label>
          <div className="grid grid-cols-3 gap-4">
            {SHAPES.map((shape) => (
              <button
                key={shape.id}
                onClick={() => setSelectedShape(shape)}
                className={`h-16 flex items-center justify-center rounded-2xl border-2 transition-all ${
                  selectedShape?.id === shape.id ? "border-black bg-gray-50" : "border-transparent bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div
                  className="w-8 h-8 transition-all duration-500"
                  style={{
                    backgroundColor: selectedColor ? selectedColor.value : "#D1D5DB",
                    clipPath: shape.path,
                    borderRadius: shape.id === "circle" ? "50%" : "0%",
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* 입장 버튼 */}
        <button
          onClick={handleLogin}
          disabled={!selectedColor || !selectedShape}
          className="w-full py-5 rounded-2xl font-black text-lg shadow-lg transition-all transform active:scale-95 disabled:bg-gray-100 disabled:text-gray-300 disabled:shadow-none"
          style={{ 
            backgroundColor: (selectedColor && selectedShape) ? selectedColor.value : "",
            color: (selectedColor && selectedShape) ? "white" : ""
          }}
        >
          {selectedColor && selectedShape ? "ENTER MY BLOG" : "조합을 선택해주세요"}
        </button>
      </div>
    </div>
  );
}