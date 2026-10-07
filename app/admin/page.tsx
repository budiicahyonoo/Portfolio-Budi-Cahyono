"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Briefcase, FolderGit2, FileText, Home as HomeIcon, Wrench, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { HomeTab } from "@/components/admin/home-tab";
import { SkillsTab } from "@/components/admin/skills-tab";
import { ProjectsTab } from "@/components/admin/projects-tab";
import { ExperienceTab } from "@/components/admin/experience-tab";
import { BlogTab } from "@/components/admin/blog-tab";
import { ContactTab } from "@/components/admin/contact-tab";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"home" | "skills" | "projects" | "experience" | "blog" | "contact">("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: "home", label: "Home", icon: <HomeIcon className="w-4 h-4" /> },
    { id: "skills", label: "Skills", icon: <Wrench className="w-4 h-4" /> },
    { id: "projects", label: "Projects", icon: <FolderGit2 className="w-4 h-4" /> },
    { id: "experience", label: "Experience", icon: <Briefcase className="w-4 h-4" /> },
    { id: "blog", label: "Blog", icon: <FileText className="w-4 h-4" /> },
    { id: "contact", label: "Contact", icon: <Mail className="w-4 h-4" /> },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50/50">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* KIRI - Logo */}
            <div className="flex-1 flex justify-start items-center gap-3">
              <Link href="/admin" className="flex items-center">
                <Image 
                  src="/logo.png" 
                  alt="Logo StackPlus" 
                  width={120} 
                  height={35} 
                  className="h-7 w-auto object-contain" 
                />
              </Link>
              <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full hidden sm:inline-block">
                CMS
              </span>
            </div>

            {/* TENGAH - Pill Menu */}
            <div className="hidden md:flex flex-1 justify-center">
              <div className="flex items-center bg-slate-100 border border-slate-200/60 rounded-full p-1.5 shadow-sm">
                {tabs.map((tab) => (
                  <button
                    key={tab.id} 
                    onClick={() => setActiveTab(tab.id as any)}
                    className={cn(
                      "flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300", 
                      activeTab === tab.id 
                        ? "bg-blue-600 text-white shadow-md" 
                        : "text-slate-500 hover:text-slate-900"
                    )}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* KANAN - Action Buttons */}
            <div className="flex-1 flex justify-end items-center gap-4">
              <Button asChild variant="outline" size="sm" className="hidden sm:flex border-slate-200 hover:bg-slate-50 text-slate-700">
                <Link href="/">Lihat Live Web</Link>
              </Button>
              <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
            
          </div>
        </div>

        {/* Menu Mobile Admin */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 px-4 pt-2 animate-in slide-in-from-top-2">
             <div className="flex flex-col gap-2 bg-slate-50 rounded-2xl p-4 border border-slate-200">
                {tabs.map((tab) => (
                  <button
                    key={tab.id} 
                    onClick={() => { setActiveTab(tab.id as any); setIsMobileMenuOpen(false); }}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all", 
                      activeTab === tab.id 
                        ? "bg-blue-600 text-white" 
                        : "text-slate-500 hover:bg-slate-100"
                    )}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
             </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 mt-4">
        {activeTab === "home" && <HomeTab />}
        {activeTab === "skills" && <SkillsTab />}
        {activeTab === "projects" && <ProjectsTab />}
        {activeTab === "experience" && <ExperienceTab />}
        {activeTab === "blog" && <BlogTab />}
        {activeTab === "contact" && <ContactTab />}
      </main>
    </div>
  );
}