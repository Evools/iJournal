"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Loader2, ShieldCheck } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                toast.error("Неверный логин или пароль");
            } else {
                toast.success("Вход выполнен");
                router.push("/dashboard");
                router.refresh();
            }
        } catch (error) {
            toast.error("Ошибка сервера");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex h-screen w-full items-center justify-center bg-[#f8fafc] px-4 overflow-hidden">
            {/* Строгий фон: сетка и легкое виньетирование */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
            </div>

            <Card className="relative z-10 w-full max-w-md border-slate-200 shadow-xl bg-white ring-1 ring-slate-950/5">
                <CardHeader className="space-y-1.5 text-center pt-8 pb-6">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-slate-900 text-white font-bold text-2xl shadow-inner mb-4">
                        98
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 uppercase">
                        Авторизация
                    </CardTitle>
                    <CardDescription className="text-slate-500 font-medium">
                        Профессиональный лицей №98
                    </CardDescription>
                </CardHeader>

                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                <CardContent className="pt-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 ml-1">
                                Электронная почта
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                                <Input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="teacher@lyceum.kg"
                                    className="pl-10 h-12 bg-slate-50 border-slate-200 focus:bg-white focus:ring-1 focus:ring-slate-950 transition-all rounded-md"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 ml-1">
                                Пароль
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                                <Input
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="pl-10 h-12 bg-slate-50 border-slate-200 focus:bg-white focus:ring-1 focus:ring-slate-950 transition-all rounded-md"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 text-sm font-bold uppercase tracking-widest bg-slate-900 hover:bg-slate-800 text-white transition-all rounded-md mt-2 shadow-lg shadow-slate-200"
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                "Войти в систему"
                            )}
                        </Button>
                    </form>
                </CardContent>

                <div className="px-8 pb-8 pt-4 flex items-center justify-center gap-2 border-t border-slate-50 bg-slate-50/50 rounded-b-xl">
                    <ShieldCheck className="h-4 w-4 text-slate-400" />
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em]">
                        Защищенное соединение
                    </span>
                </div>
            </Card>
        </div>
    );
}