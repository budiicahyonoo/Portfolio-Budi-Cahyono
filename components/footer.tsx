"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Mail, Twitter, AtSign } from "lucide-react"; 
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  // Jika URL saat ini diawali dengan "/admin", Footer tidak akan dirender (disembunyikan)
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="border-t border-slate-200 bg-slate-50/50 pt-16 pb-8 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          
          {/* Kolom 1: Logo & Deskripsi */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image 
                src="/logo.png"
                alt="Logo StackPlus" 
                width={150} 
                height={40} 
                className="h-8 w-auto object-contain" 
              />
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed pr-4">
              Building digital excellence through innovative design and development solutions.
            </p>
          </div>

          {/* Kolom 2: Quick Links */}
          <div>
            <h3 className="font-bold text-blue-600 mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link href="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
              <li><Link href="/projects" className="hover:text-blue-600 transition-colors">Projects</Link></li>
              <li><Link href="/#experience" className="hover:text-blue-600 transition-colors">Experience</Link></li>
              <li><Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Services */}
          <div>
            <h3 className="font-bold text-blue-600 mb-4">Services</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link href="/projects" className="hover:text-blue-600 transition-colors">AI</Link></li>
              <li><Link href="/projects" className="hover:text-blue-600 transition-colors">Web</Link></li>
              <li><Link href="/projects" className="hover:text-blue-600 transition-colors">Apps</Link></li>
            </ul>
          </div>

          {/* Kolom 4: Connect */}
          <div>
            <h3 className="font-bold text-blue-600 mb-4">Connect</h3>
            <div className="flex flex-wrap gap-3">
              <a href="https://github.com/budiicahyonoo" target="_blank" rel="noreferrer" className="bg-blue-600 p-2.5 rounded-xl text-white hover:bg-blue-700 transition-all shadow-sm hover:-translate-y-1">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com/in/budicahyono" target="_blank" rel="noreferrer" className="bg-blue-600 p-2.5 rounded-xl text-white hover:bg-blue-700 transition-all shadow-sm hover:-translate-y-1">
                <Linkedin size={18} />
              </a>
              <a href="mailto:budicahyono.dev@gmail.com" className="bg-blue-600 p-2.5 rounded-xl text-white hover:bg-blue-700 transition-all shadow-sm hover:-translate-y-1">
                <Mail size={18} />
              </a>
              <a href="https://twitter.com/budigubernur15" target="_blank" rel="noreferrer" className="bg-blue-600 p-2.5 rounded-xl text-white hover:bg-blue-700 transition-all shadow-sm hover:-translate-y-1">
                <Twitter size={18} />
              </a>
              <a href="https://threads.net/@budii.cahyonoo" target="_blank" rel="noreferrer" className="bg-blue-600 p-2.5 rounded-xl text-white hover:bg-blue-700 transition-all shadow-sm hover:-translate-y-1">
                <AtSign size={18} />
              </a>
            </div>
            <p className="text-sm text-slate-500 mt-6">
              Find me in <a href="https://stackplustudio.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">stackplustudio.com</a>
            </p>
          </div>

        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Budi Cahyono. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-400">
            <Link href="#" className="hover:text-slate-600">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-600">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}