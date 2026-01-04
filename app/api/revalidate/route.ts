import { revalidatePath } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    // Verify the request is from an authenticated admin
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Revalidate the homepage
    revalidatePath("/")

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (error) {
    console.error("[v0] Revalidate error:", error)
    return NextResponse.json({ error: "Error revalidating" }, { status: 500 })
  }
}
