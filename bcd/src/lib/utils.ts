/**
 * 유저 ID(예: red-triangle)를 받아 해당 유저의 고유 색상과 모양을 반환합니다.
 */
export const getIdentity = (id: string) => {
  // 1. 기본값 설정 (ID가 없거나 형식이 잘못된 경우 대비)
  if (!id || !id.includes("-")) {
    return {
      primaryColor: "#333333",
      shapeType: "square",
    };
  }

  // 2. ID 분리 (red-circle -> ['red', 'circle'])
  const [colorPart, shapePart] = id.split("-");

  // 3. 색상 매칭 데이터 (로그인 페이지와 동일한 Hex 값)
  const colorMap: { [key: string]: string } = {
    red: "#FF4D4D",
    blue: "#4D94FF",
    green: "#2ECC71",
  };

  // 4. 모양 매칭 데이터
  const shapes = ["circle", "square", "triangle"];
  const shapeType = shapes.includes(shapePart) ? shapePart : "square";

  return {
    // 매칭되는 색이 없으면 검정색(#333) 반환
    primaryColor: colorMap[colorPart] || "#333333",
    shapeType: shapeType,
  };
};