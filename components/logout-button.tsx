"use client";

import { LogOut } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface LogoutButtonProps {
    onLogout: () => Promise<void>;
}

export function LogoutButton({ onLogout }: LogoutButtonProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="flex w-full items-center gap-3 px-2 py-2 text-sm text-red-500 hover:bg-red-50 rounded-md transition-colors outline-none group-data-[collapsible=icon]:justify-center">
                    <LogOut size={18} className="shrink-0" />
                    <span className="group-data-[collapsible=icon]:hidden font-medium">
            Выйти
          </span>
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Вы уверены, что хотите выйти?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Ваша текущая сессия будет завершена. Для продолжения работы потребуется повторная авторизация.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => onLogout()}
                        className="bg-red-500 hover:bg-red-600"
                    >
                        Выйти
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}