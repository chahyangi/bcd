import { getIdentity } from "@/lib/utils";

export default async function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  // 여기서도 await 필수!
  const { id } = await params;
  const { primaryColor, shapeType } = getIdentity(id);

  return (
    <div style={{ backgroundColor: `${primaryColor}10`, minHeight: '100vh' }}>
      <header className="p-5 bg-white shadow-sm flex justify-between items-center">
        <h2 className="font-bold" style={{ color: primaryColor }}>{id.toUpperCase()}</h2>
        <div 
          className="w-8 h-8" 
          style={{ backgroundColor: primaryColor, borderRadius: shapeType === 'circle' ? '50%' : '0' }}
        />
      </header>
      {children}
    </div>
  );
}