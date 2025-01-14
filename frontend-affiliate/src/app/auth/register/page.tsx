import { GalleryVerticalEnd } from "lucide-react"
import { RegisterForm } from "@/components/registerform"
import { Toaster } from "@/components/ui/sonner"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-3 p-6 md:p-10 ">
      <div className="flex w-full max-w-sm flex-col gap-2">
      <a className="flex items-center gap-2 self-center font-bold text-chart-2">
          <div className="flex aspect-square size-9 items-center justify-center font-bold rounded-lg bg-chart-2 text-sidebar-primary-foreground">
            BAX
          </div>Digital Indonesia
        </a>
        <Toaster position="top-right" />
        <RegisterForm />
      </div>
    </div>
  )
} 