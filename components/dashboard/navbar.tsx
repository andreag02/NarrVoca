"use client";
import { useState } from "react";
import { useLanguage } from "@/lang/LanguageContext";
import { Settings, Sparkles, Menu, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dashBoardTranslations from "@/lang/Dashboard";
import { VocoraMascot } from "@/components/vocora-mascot";

export function Navbar() {
  const { language, setLanguage } = useLanguage();
  const translated = dashBoardTranslations[language];
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-10 bg-gradient-to-r from-purple-600 to-violet-500 text-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <VocoraMascot width={24} height={24} />
            </div>
            <h1 className="text-2xl font-bold text-white">NarrVoca</h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <Select
            value={language}
            onValueChange={(val) => {
              if (val === "en" || val === "es" || val === "zh") {
                setLanguage(val);
              }
            }}
          >
            <SelectTrigger className="w-[110px] bg-white/20 border-white/30 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="zh">中文</SelectItem>
            </SelectContent>
          </Select>
          <div className="border-l border-white/20 pl-4 ml-2">
            <ThemeToggle />
          </div>

          <div className="border-l border-white/20 pl-4 ml-2">
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="icon"
              className="rounded-full text-red-500 hover:bg-white/20"
              aria-label="Logout"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-4">
          <Select
            value={language}
            onValueChange={(val) => {
              if (val === "en" || val === "es" || val === "zh") {
                setLanguage(val);
              }
            }}
          >
            <SelectTrigger className="w-[90px] bg-white/20 border-white/30 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">EN</SelectItem>
              <SelectItem value="es">ES</SelectItem>
              <SelectItem value="zh">中文</SelectItem>
            </SelectContent>
          </Select>
          <div className="border-l border-white/20 pl-4">
            <ThemeToggle />
          </div>
          <div className="pl-1">
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="icon"
              className="rounded-full text-red-500 hover:bg-white/20"
              aria-label="Logout"
            >
              <LogOut className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Removed as it's no longer needed with direct logout button */}
      {/* 
            {mobileMenuOpen && (
                <div className="md:hidden bg-purple-700 py-3 px-4 flex flex-col gap-3">
                    
                    <Link href="/" className="py-2 flex items-center gap-2 text-white">
                        <LogOut size={16} />
                        <span>{translated.navBar.logout}</span>
                    </Link>
                </div>
            )}
            */}
    </header>
  );
}
