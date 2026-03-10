import { auth } from "@/auth";
import { db } from "@/lib/db";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Users, GraduationCap, BookCheck, Clock } from "lucide-react";

export default async function DashboardPage() {
    const session = await auth();

    const stats = [
        {
            title: "Мои группы",
            value: "2",
            description: "Активные учебные группы",
            icon: Users,
            color: "text-blue-600",
        },
        {
            title: "Всего студентов",
            value: "31",
            description: "Закреплено за вами",
            icon: GraduationCap,
            color: "text-green-600",
        },
        {
            title: "Журналы",
            value: "12",
            description: "Заполнено на этой неделе",
            icon: BookCheck,
            color: "text-purple-600",
        },
        {
            title: "Часы ПО",
            value: "40ч",
            description: "Пройдено в этом месяце",
            icon: Clock,
            color: "text-orange-600",
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                    Добро пожаловать, {session?.user?.name?.split(' ')[0]}!
                </h2>
                <p className="text-slate-500">
                    Обзор вашей активности в Лицее №98 на сегодня.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (
                    <Card key={item.title} className="shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-slate-600">
                                {item.title}
                            </CardTitle>
                            <item.icon className={`h-4 w-4 ${item.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{item.value}</div>
                            <p className="text-xs text-slate-400 mt-1">
                                {item.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 shadow-sm">
                    <CardHeader>
                        <CardTitle>Текущие группы</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {["BP-1", "SIT-1"].map((group) => (
                                <div key={group} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                                            {group[0]}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold leading-none">{group}</p>
                                            <p className="text-xs text-slate-500 mt-1">Веб-разработка / Дизайн</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-medium text-slate-400">Студентов</p>
                                        <p className="text-sm font-bold">~15</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Быстрые действия */}
                <Card className="col-span-3 shadow-sm">
                    <CardHeader>
                        <CardTitle>Быстрые действия</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-2">
                        <button className="w-full flex items-center justify-between p-3 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                            Заполнить журнал
                        </button>
                        <button className="w-full flex items-center justify-between p-3 text-sm border border-slate-200 rounded-md hover:bg-slate-50 transition-colors">
                            Сформировать отчет (ВКЭ)
                        </button>
                        <button className="w-full flex items-center justify-between p-3 text-sm border border-slate-200 rounded-md hover:bg-slate-50 transition-colors">
                            Управление практикой
                        </button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}