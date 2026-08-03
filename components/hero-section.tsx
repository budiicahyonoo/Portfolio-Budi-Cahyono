"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github, Linkedin, Mail, Twitter, AtSign, X, CheckCircle2 } from "lucide-react";

interface HeroData {
  name: string;
  role: string;
  value_proposition: string;
  photo_url: string | null;
  email: string | null;
}

interface HeroSectionProps {
  data: HeroData;
}

export function HeroSection({ data }: HeroSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Fungsi pengiriman form menggunakan Web3Forms API
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    
    // TODO: GANTI TEKS DI BAWAH INI DENGAN ACCESS KEY DARI EMAILMU
    formData.append("access_key", "8676cb06-6338-4dcf-b3ef-51026274f5dc"); 
    
    // Subjek email yang akan masuk ke inbox-mu
    formData.append("subject", "🔥 New Hire Me Application from Portfolio");
    formData.append("redirect", "false");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        // Tutup popup otomatis setelah 3 detik
        setTimeout(() => {
          setIsModalOpen(false);
          setIsSuccess(false);
        }, 3000);
      } else {
        alert("Gagal mengirim pesan. Silakan coba lagi.");
        console.error("Web3Forms Error:", result);
      }
    } catch (error) {
      alert("Terjadi kesalahan jaringan.");
      console.error("Network Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 bg-background overflow-hidden relative">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Bagian Kiri - Teks & CTA */}
          <div className="space-y-8 order-2 lg:order-1 relative z-10 pb-12 lg:pb-0">
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl text-slate-500 font-medium">
                Hi, There!
              </h2>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-slate-900">
                I&apos;m <span className="text-blue-600">{data.name}</span>
              </h1>
              <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-500 flex flex-wrap items-center gap-x-2">
                <span>{data.role}</span>
                <span className="text-blue-600 animate-pulse">|</span>
              </div>
            </div>

            {data.value_proposition && (
              <p className="text-lg text-slate-500 mb-8 max-w-lg">
                {data.value_proposition}
              </p>
            )}

            {/* Ikon Sosial Media */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Link href="https://github.com/budiicahyonoo" target="_blank" className="bg-blue-600 p-2.5 rounded-xl text-white hover:bg-blue-700 transition-all shadow-sm hover:-translate-y-1">
                <Github size={20} />
              </Link>
              <Link href="https://linkedin.com/in/budicahyono" target="_blank" className="bg-blue-600 p-2.5 rounded-xl text-white hover:bg-blue-700 transition-all shadow-sm hover:-translate-y-1">
                <Linkedin size={20} />
              </Link>
              <Link href="mailto:budicahyono.dev@gmail.com" className="bg-blue-600 p-2.5 rounded-xl text-white hover:bg-blue-700 transition-all shadow-sm hover:-translate-y-1">
                <Mail size={20} />
              </Link>
              <Link href="https://x.com/budigubernur15" target="_blank" className="bg-blue-600 p-2.5 rounded-xl text-white hover:bg-blue-700 transition-all shadow-sm hover:-translate-y-1">
                <Twitter size={20} />
              </Link>
              <Link href="https://www.threads.com/@budii.cahyonoo" target="_blank" className="bg-blue-600 p-2.5 rounded-xl text-white hover:bg-blue-700 transition-all shadow-sm hover:-translate-y-1">
                <AtSign size={20} />
              </Link>
            </div>

            {/* Tombol CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={() => setIsModalOpen(true)}
                size="lg" 
                className="bg-blue-600 text-white hover:bg-blue-700 font-medium px-8 rounded-xl shadow-md"
              >
                Hire me
              </Button>
              <Button asChild size="lg" variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 font-medium px-8 rounded-xl">
                <Link href="/cv.pdf" target="_blank" rel="noopener noreferrer">
                  Download CV
                </Link>
              </Button>
            </div>
          </div>

          {/* Bagian Kanan - Foto Utama */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end items-end h-[400px] sm:h-[500px] lg:h-[650px] w-full">
            <div className="relative w-full h-full lg:scale-[1.05] xl:scale-[1.10] transform origin-bottom">
              <Image
                src={data.photo_url || "/portfoliostackplus.png"}
                alt={data.name}
                fill
                className="object-contain object-bottom drop-shadow-2xl"
                priority
                unoptimized
              />
            </div>
          </div>
          
        </div>
      </div>

      {/* MODAL POPUP HIRE ME */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={24} />
            </button>

            {isSuccess ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-green-500" />
                <h3 className="text-2xl font-bold text-slate-900">Successfully Sent!</h3>
                <p className="text-slate-500">Thank you for reaching out. I will get back to you shortly at budicahyono.dev@gmail.com.</p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">Let&apos;s Work Together</h3>
                <p className="text-sm text-slate-500 mb-6">Fill out the form below to discuss opportunities.</p>
                
                {/* FORM dengan encType untuk mendukung upload file */}
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Name / Company</label>
                    <input required type="text" name="name" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none text-sm" placeholder="e.g. John Doe from Tech Corp" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Location</label>
                      <input required type="text" name="location" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none text-sm" placeholder="City, Country" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Position</label>
                      <input required type="text" name="position" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none text-sm" placeholder="e.g. Frontend Engineer" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Write Letter <span className="font-normal text-slate-400">(Optional)</span></label>
                    <textarea name="message" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none text-sm h-24 resize-none" placeholder="Share more details about the role or project..." />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Relevant Link <span className="font-normal text-slate-400">(Optional)</span></label>
                    <input type="url" name="link" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none text-sm" placeholder="https://..." />
                  </div>

                  <div className="space-y-1 pb-2">
                    <label className="text-xs font-bold text-slate-700">Document <span className="font-normal text-slate-400">(Optional, Max 5MB)</span></label>
                    <input 
                      type="file" 
                      name="attachment" 
                      accept=".pdf,.doc,.docx"
                      className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all cursor-pointer" 
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6">
                    {isSubmitting ? "Sending..." : "Submit Application"}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}