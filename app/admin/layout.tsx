import { Toaster } from "sonner";

export const metadata = {
  title: 'Admin - Roblox Games Showcase',
  description: 'Admin panel for managing Roblox games showcase',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Toaster />
      {children}
    </>
  )
} 