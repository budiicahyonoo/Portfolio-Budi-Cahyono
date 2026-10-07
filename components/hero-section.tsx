"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Github, Linkedin, Mail, Twitter, AtSign, X, CheckCircle2, Sparkles } from "lucide-react";

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

const socials = [
  { href: "https://github.com/budiicahyonoo", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com/in/budicahyono", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:budicahyono.dev@gmail.com", icon: Mail, label: "Email" },
  { href: "https://x.com/budigubernur15", icon: Twitter, label: "Twitter / X" },
  { href: "https://www.threads.com/@budii.cahyonoo", icon: AtSign, label: "Threads" },
];

export function HeroSection({ data }: HeroSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Fungsi pengiriman form menggunakan Web3Forms API (TIDAK DIUBAH)
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
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Bagian Kiri - Teks & CTA */}
          <Reveal className="order-2 lg:order-1 relative z-10 pb-12 lg:pb-0">
            <div className="space-y-6">
              <div className="space-y-3">
                

                <h1 className="text-hero font-display text-slate-900">
                  I&apos;m <span className="text-blue-600">{data.name}</span>
                </h1>
                <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-500 flex flex-wrap items-center gap-x-2">
                  <span>{data.role}</span>
                  <span className="text-blue-600 animate-pulse">|</span>
                </div>
              </div>

              {data.value_proposition && (
                <p className="text-lg text-slate-500 max-w-lg leading-relaxed">
                  {data.value_proposition}
                </p>
              )}

              {/* Ikon Sosial Media — glass icon tiles */}
              <div className="flex flex-wrap gap-3">
                {socials.map(({ href, icon: Icon, label }) => (
                  <Link
                    key={label}
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    aria-label={label}
                    className="glass-icon glow-btn w-11 h-11 rounded-xl grid place-items-center text-blue-600 hover:text-blue-700"
                  >
                    <Icon size={19} />
                  </Link>
                ))}
              </div>

              {/* Tombol CTA */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  size="lg" 
                  className="glow-btn bg-blue-600 text-white font-semibold px-8 rounded-xl shadow-lg shadow-blue-500/30"
                >
                  Hire me
                </Button>
                <Button asChild size="lg" className="glass-icon glow-btn text-blue-700 font-semibold px-8 rounded-xl">
                  <Link href="/cv_budi cahyono_full stack developer.pdf" target="_blank" rel="noopener noreferrer">
                    Download CV
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>

          {/* Bagian Kanan - Foto Utama dengan glow + shimmer */}
          <Reveal className="order-1 lg:order-2" delay={120}>
            <div className="relative flex justify-center lg:justify-end items-end h-[400px] sm:h-[500px] lg:h-[650px] w-full">
              {/* Halo bercahaya di belakang foto */}
              <div className="hero-glow" />

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
          </Reveal>
          
        </div>
      </div>

      <div className="hero-fade-bottom" />

      {/* MODAL POPUP HIRE ME */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-md animate-in fade-in duration-200">
          <div className="modal-card rounded-2xl w-full max-w-lg p-6 sm:p-8 relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 grid place-items-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-900/5 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {isSuccess ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 grid place-items-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="font-display text-2xl font-bold text-slate-900">Successfully Sent!</h3>
                <p className="text-slate-500">Thank you for reaching out. I will get back to you shortly at budicahyono.dev@gmail.com.</p>
              </div>
            ) : (
              <>
                <h3 className="font-display text-2xl font-bold text-slate-900 mb-1">Let&apos;s Work Together</h3>
                <p className="text-sm text-slate-500 mb-6">Fill out the form below to discuss opportunities.</p>
                
                {/* FORM dengan encType untuk mendukung upload file (TIDAK DIUBAH) */}
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Name / Company</label>
                    <input required type="text" name="name" className="w-full px-3 py-2 rounded-lg border border-blue-100 bg-white/80 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-300 outline-none text-sm transition-all" placeholder="e.g. John Doe from Tech Corp" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Location</label>
                      <input required type="text" name="location" className="w-full px-3 py-2 rounded-lg border border-blue-100 bg-white/80 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-300 outline-none text-sm transition-all" placeholder="City, Country" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Position</label>
                      <input required type="text" name="position" className="w-full px-3 py-2 rounded-lg border border-blue-100 bg-white/80 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-300 outline-none text-sm transition-all" placeholder="e.g. Frontend Engineer" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Write Letter <span className="font-normal text-slate-400">(Optional)</span></label>
                    <textarea name="message" className="w-full px-3 py-2 rounded-lg border border-blue-100 bg-white/80 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-300 outline-none text-sm h-24 resize-none transition-all" placeholder="Share more details about the role or project..." />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Relevant Link <span className="font-normal text-slate-400">(Optional)</span></label>
                    <input type="url" name="link" className="w-full px-3 py-2 rounded-lg border border-blue-100 bg-white/80 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-300 outline-none text-sm transition-all" placeholder="https://..." />
                  </div>

                  <div className="space-y-1 pb-2">
                    <label className="text-xs font-bold text-slate-700">Document <span className="font-normal text-slate-400">(Optional, Max 5MB)</span></label>
                    <input 
                      type="file" 
                      name="attachment" 
                      accept=".pdf,.doc,.docx"
                      className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 transition-all cursor-pointer" 
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="glow-btn w-full bg-blue-600 shadow-lg shadow-blue-500/30 text-white rounded-xl py-6 font-semibold">
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
