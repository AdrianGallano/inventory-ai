'use client'
import { SidebarTrigger } from "./ui/sidebar";


export default function Header() {
    return (
        <div className="flex items-center justify-between py-2 pr-8 pl-4 border-b border-gray-400 max-w-full w-full">
            <div className="flex gap-6 items-center">
                <SidebarTrigger />
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Inventory AI
                </h3>
            </div>
            <div>{/* MENU */}

            </div>
        </div>
    );
}