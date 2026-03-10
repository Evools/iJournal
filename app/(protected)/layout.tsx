import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip"; // Импортируем провайдер
import { AppSidebar } from "@/components/app-sidebar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
                                                  children,
                                              }: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return (
        <TooltipProvider>
            <SidebarProvider>
                <div className="flex min-h-screen w-full">
                    <AppSidebar />
                    <main className="flex-1 flex flex-col min-w-0 bg-background">
                        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
                            <div className="flex items-center gap-2">
                                <SidebarTrigger />
                                <div className="h-4 w-[1px] bg-border mx-2" />
                                <h1 className="text-sm font-medium text-muted-foreground">
                                    Панель управления
                                </h1>
                            </div>
                            <div className="text-xs text-muted-foreground px-4">
                                {new Date().toLocaleDateString('ru-RU', {
                                    day: 'numeric',
                                    month: 'long'
                                })}
                            </div>
                        </header>

                        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
                            {children}
                        </div>
                    </main>
                </div>
            </SidebarProvider>
        </TooltipProvider>
    );
}