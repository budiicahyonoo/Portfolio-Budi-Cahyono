import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Reveal } from "@/components/reveal"

interface BlogPost {
  id: string
  title: string
  description: string
  category: string
  thumbnail_url: string
  view_url: string | null
  read_time: number | null
}

interface BlogSectionProps {
  posts: BlogPost[]
}

export function BlogSection({ posts }: BlogSectionProps) {
  const categories = ["What You Learned", "How You Built Something", "Lessons From Failure"]

  return (
    <section id="blog" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-16">
          <div>
            
            <h2 className="font-display text-4xl sm:text-5xl font-bold mt-4 mb-4 text-white">
              Blog
            </h2>
            <p className="text-lg text-white/85 max-w-2xl mx-auto">
              Sharing knowledge, experiences, and lessons learned
            </p>
          </div>
        </Reveal>

        <Tabs defaultValue="What You Learned" className="w-full">
          {/* Pill tab glassmorphism */}
          <div className="flex justify-center mb-12">
            <TabsList className="glass-pill inline-flex h-auto items-center rounded-full p-1.5">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 data-[state=active]:!bg-blue-600 data-[state=active]:!text-white data-[state=active]:!shadow-md data-[state=active]:!border-white/25 text-white hover:text-white hover:bg-white/20"
                >
                  {category.split(" ").slice(0, 2).join(" ")}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((category) => {
            const categoryPosts = posts.filter((p) => 
              p.category.toUpperCase() === category.toUpperCase()
            )
            return (
              <TabsContent key={category} value={category}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryPosts.map((post, i) => (
                    <div
                      key={post.id}
                      className="stagger-item"
                      style={{ animationDelay: `${i * 90}ms`, height: '100%' }}
                    >
                      <article className="glass glass-glow lift-hover group h-full flex flex-col rounded-2xl overflow-hidden">
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={post.thumbnail_url || "/portfoliostackplus.png"}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/25 to-transparent"></div>
                          {post.read_time && (
                            <div className="absolute top-4 right-4 flex items-center gap-1 glass-pill px-2.5 py-1 rounded-full text-xs font-semibold text-blue-700">
                              <Clock className="h-3 w-3" />
                              <span>{post.read_time} min</span>
                            </div>
                          )}
                        </div>
                        <div className="p-6 flex flex-col flex-1 gap-4">
                          <div>
                            <h3 className="font-display font-semibold text-lg text-slate-900 line-clamp-2">{post.title}</h3>
                            <p className="text-sm text-slate-500 line-clamp-3 mt-1">{post.description}</p>
                          </div>
                          {post.view_url && (
                            <Link
                              href={post.view_url}
                              className="glass-icon glow-btn group/btn mt-auto w-full inline-flex items-center justify-center gap-2 text-sm font-semibold rounded-xl px-3 py-2.5 text-blue-700"
                            >
                              Read More
                              <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                          )}
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </section>
  )
}
