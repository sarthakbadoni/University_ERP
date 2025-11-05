import React from "react";
import { Menu, LogOut, Shield } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function AdminHeader({ onLogout, onMenuClick }) {
  return (
    <header className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-lg">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="md:hidden text-white hover:bg-slate-700"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-red-500" />
          <div>
            <h1 className="text-white text-lg">Admin Panel</h1>
            <p className="text-slate-400 text-xs hidden sm:block">
              System Management
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-white">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-red-600 text-white text-xs">
              AD
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline text-sm">Administrator</span>
        </div>
        <Button
          onClick={onLogout}
          variant="ghost"
          className="text-red-400 hover:text-red-300 hover:bg-slate-700"
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
}
