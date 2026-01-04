import { Navigation } from "@/components/shared/navigation";
import { GroupLabel } from "@/components/shared/group-label";

export default function InformaticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {children}
      <GroupLabel group={3} />
    </div>
  );
}

