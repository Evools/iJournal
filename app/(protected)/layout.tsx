import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    LogOut,
    LayoutDashboard,
    Users,
    BookOpen,
    Settings
} from "lucide-react"; // Стандартные иконки (обычно идут с shadcn)
import Link from "next/link";

export default async function ProtectedLayout({
                                                  children,
                                              }: {
    children: React.ReactNode;
}) {
    const session = await auth();

    // Если сессии нет, жестко перенаправляем на логин
    if (!session) {
        redirect("/login");
    }

    return (
        <div className="flex min-h-screen">
            {/* Боковая панель (Sidebar) */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col">
                <div className="p-6 border-b border-slate-800">
                    <h1 className="text-xl font-bold tracking-tight">Лицей №98</h1>
                    <p className="text-xs text-slate-400 mt-1">Панель управления</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition-colors">
                        <LayoutDashboard size={20} />
                        <span>Главная</span>
                    </Link>
                    <Link href="/dashboard/groups" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition-colors">
                        <Users size={20} />
                        <span>Мои группы</span>
                    </Link>
                    <Link href="/dashboard/journals" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition-colors">
                        <BookOpen size={20} />
                        <span>Журналы</span>
                    </Link>
                </nav>

                {/* Инфо о пользователе снизу */}
                <div className="p-4 border-t border-slate-800 space-y-4">
                    <div className="px-3">
                        <p className="text-sm font-medium truncate">{session.user?.name}</p>
                        <p className="text-xs text-slate-500 truncate">{session.user?.email}</p>
                    </div>

                    <form
                        action={async () => {
                            "use server";
                            await signOut({ redirectTo: "/login" });
                        }}
                    >
                        <Button variant="destructive" className="w-full justify-start gap-3 bg-red-900/20 hover:bg-red-900/40 text-red-400 border-red-900/50">
                            <LogOut size={18} />
                            Выйти
                        </Button>
                    </form>
                </div>
            </aside>

            {/* Основной контент */}
            <main className="flex-1 bg-slate-50 flex flex-col">
                <header className="h-16 border-b bg-white flex items-center justify-between px-8">
                    <div className="text-sm text-slate-500">
                        {new Date().toLocaleDateString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 px-2 py-1 rounded text-slate-600">
              {session.user?.role}
            </span>
                    </div>
                </header>

                <div className="p-8 overflow-y-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}