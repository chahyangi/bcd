// src/lib/utils.ts

export const getIdentity = (id: string) => {
  // 1. ID 문자열을 숫자로 변환 (간단한 해시)
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }

  // 2. RGB 색상 생성 (0~255)
  const r = (hash & 0xFF0000) >> 16;
  const g = (hash & 0x00FF00) >> 8;
  const b = hash & 0x0000FF;

  // 3. 도형 타입 결정 (나머지 연산 이용)
  const shapes = ['circle', 'square', 'triangle'];
  const shapeType = shapes[Math.abs(hash) % shapes.length];

  return {
    primaryColor: `rgb(${Math.abs(r)}, ${Math.abs(g)}, ${Math.abs(b)})`,
    shapeType,
    hash
  };
};