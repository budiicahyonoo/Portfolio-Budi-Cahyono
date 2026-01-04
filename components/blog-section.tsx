import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-primary">Blog</span> & Insights
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sharing knowledge, experiences, and lessons learned
          </p>
        </div>

        <Tabs defaultValue="What You Learned" className="w-full">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-3 mb-12">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="text-xs sm:text-sm">
                {category.split(" ").slice(0, 2).join(" ")}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => {
            const categoryPosts = posts.filter((p) => p.category === category)
            return (
              <TabsContent key={category} value={category}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryPosts.map((post) => (
                    <Card key={post.id} className="group overflow-hidden hover:border-primary transition-colors">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.thumbnail_url || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
                        {post.read_time && (
                          <div className="absolute top-4 right-4 flex items-center gap-1 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs">
                            <Clock className="h-3 w-3" />
                            <span>{post.read_time} min</span>
                          </div>
                        )}
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                        <CardDescription className="line-clamp-3">{post.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {post.view_url && (
                          <Button asChild variant="outline" className="w-full group/btn bg-transparent">
                            <Link href={post.view_url}>
                              Read More
                              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                          </Button>
                        )}
                      </CardContent>
                    </Card>
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
