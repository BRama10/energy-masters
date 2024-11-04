// app/page.tsx
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Plus, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center py-8">
        <h1 className="text-2xl font-bold text-center mb-2">
          Energy Masters Audit Tool
        </h1>
        <p className="text-muted-foreground text-center">
          Complete energy audits efficiently and track improvements
        </p>
      </div>

      <div className="grid gap-4">
        <Card 
          className="cursor-pointer hover:bg-accent/50 transition-colors"
          onClick={() => router.push('/audit/new')}
        >
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-2 bg-primary/10 rounded-full">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold">Start New Audit</h2>
              <p className="text-sm text-muted-foreground">
                Begin a new energy audit assessment
              </p>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:bg-accent/50 transition-colors"
          onClick={() => router.push('/audit/drafts')}
        >
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-2 bg-primary/10 rounded-full">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold">View Drafts</h2>
              <p className="text-sm text-muted-foreground">
                Continue working on saved audits
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
