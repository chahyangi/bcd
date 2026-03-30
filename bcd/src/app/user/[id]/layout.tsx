"use client";

import { getIdentity } from "@/lib/utils";
import { useParams } from "next/navigation";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const id = (params?.id as string) || "";
  const { primaryColor } = getIdentity(id);

  if (!id) return null;

  return (
    // 배경색만 살짝 깔아주는 용도로 사용
    <div style={{ backgroundColor: `${primaryColor}05`, minHeight: 'calc(100vh - 64px)' }}>
      {children}
    </div>
  );
}