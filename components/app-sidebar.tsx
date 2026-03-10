import {
    LayoutDashboard,
    Users,
    BookOpen,
    LogOut,
    GraduationCap, ClipboardList
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
} from "@/components/ui/sidebar";
import {auth, signOut} from "@/auth";
import Link from "next/link";
import {LogoutButton} from "@/components/logout-button";

export async function AppSidebar() {
    const session = await auth();

    const navItems = [
        {title: "Обзор", url: "/dashboard", icon: LayoutDashboard},
        {title: "База студентов", url: "/dashboard/students", icon: Users},
        {title: "Учебные группы", url: "/dashboard/groups", icon: GraduationCap},
        {title: "Архив дел", url: "/dashboard/archive", icon: BookOpen},
        {title: "Документация", url: "/dashboard/docs", icon: ClipboardList},
    ];

    return (
        <Sidebar collapsible="icon" variant="sidebar">
            <SidebarHeader className="h-16 border-b flex items-center justify-center overflow-hidden bg-white/50">
                <div
                    className="flex items-center w-full px-4 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center transition-all duration-500 ease-in-out">
                    <div
                        className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold shadow-md transition-all duration-500 ease-in-out group-data-[collapsible=icon]:scale-90">
                        98
                    </div>

                    <div className="flex flex-col ml-3 truncate transition-all duration-500 ease-in-out
                        group-data-[collapsible=icon]:ml-0
                        group-data-[collapsible=icon]:max-w-0
                        group-data-[collapsible=icon]:opacity-0
                        group-data-[collapsible=icon]:invisible">
                    <span className="font-bold text-sm leading-tight truncate">
                        Лицей №98
                    </span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-tighter truncate">
                            Личные дела
                        </span>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Навигация</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild tooltip={item.title}>
                                        <Link href={item.url}>
                                            <item.icon className="size-4"/>
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t p-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex flex-col gap-2">
                            <div className="px-2 group-data-[collapsible=icon]:hidden">
                                <p className="text-sm font-semibold truncate text-foreground">
                                    {session?.user?.name}
                                </p>
                                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider truncate">
                                    {session?.user?.role}
                                </p>
                            </div>

                            <LogoutButton
                                onLogout={async () => {
                                    "use server";
                                    await signOut({ redirectTo: "/login" });
                                }}
                            />
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}