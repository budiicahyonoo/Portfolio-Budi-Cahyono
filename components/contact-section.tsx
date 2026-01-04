import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, Linkedin, Github, Calendar } from "lucide-react"

interface Contact {
  id: string
  platform: string
  url: string
}

interface ContactSectionProps {
  contacts: Contact[]
}

export function ContactSection({ contacts }: ContactSectionProps) {
  const getIcon = (platform: string) => {
    switch (platform) {
      case "Email":
        return <Mail className="h-8 w-8" />
      case "LinkedIn":
        return <Linkedin className="h-8 w-8" />
      case "GitHub":
        return <Github className="h-8 w-8" />
      case "Calendly":
        return <Calendar className="h-8 w-8" />
      default:
        return null
    }
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Let&apos;s <span className="text-primary">Connect</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Reach out through any of these channels
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {contacts.map((contact) => (
            <Card key={contact.id} className="p-6 hover:border-primary transition-colors group">
              <Link href={contact.url} target="_blank" className="flex flex-col items-center gap-4 text-center">
                <div className="p-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {getIcon(contact.platform)}
                </div>
                <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {contact.platform}
                </span>
              </Link>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <h3 className="text-2xl font-bold mb-4">Ready to start a project?</h3>
            <p className="text-muted-foreground mb-6">
              I&apos;m always open to discussing new opportunities and innovative AI solutions
            </p>
            <Button asChild size="lg">
              <Link href={contacts.find((c) => c.platform === "Email")?.url || "mailto:contact@example.com"}>
                <Mail className="mr-2 h-4 w-4" />
                Send Me a Message
              </Link>
            </Button>
          </Card>
        </div>
      </div>
    </section>
  )
}
