'use client'

import Link from 'next/link'
import { Bell, Bookmark, ChevronDown, LayoutGrid, LogOut, Plus, Settings, User, FileText, Building2, Tag, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'

export type NavbarAuthTone = 'surface' | 'contrast'

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

export function NavbarAuthControls({ tone = 'surface' }: { tone?: NavbarAuthTone }) {
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const isContrast = tone === 'contrast'
  const createBtn = isContrast
    ? 'hidden h-10 gap-1 rounded-full border border-white/10 bg-[#5C766D] px-4 text-white shadow-[0_10px_28px_rgba(0,0,0,0.35)] hover:bg-[#4d635c] sm:flex'
    : 'hidden h-10 gap-1 rounded-full bg-[#5C766D] px-4 text-white shadow-[0_12px_28px_rgba(92,118,109,0.28)] hover:bg-[#4d635c] sm:flex'
  const ghostMuted = isContrast
    ? 'rounded-full text-white/85 hover:bg-white/10 hover:text-white'
    : 'rounded-full text-[#5C4F4A] hover:bg-[rgba(92,118,109,0.08)] hover:text-[#3d3a38]'
  const menuSurface = 'w-56 border-[rgba(92,79,74,0.12)] bg-[rgba(255,252,249,0.98)]'
  const notifSurface = 'w-80 border-[rgba(92,79,74,0.12)] bg-[rgba(255,252,249,0.98)]'

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" className={createBtn}>
            <Plus className="h-4 w-4" />
            Create
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className={menuSurface}>
          {SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => {
            const Icon = taskIcons[task.key] || LayoutGrid
            return (
              <DropdownMenuItem key={task.key} asChild>
                <Link href={`/create/${task.key}`}>
                  <Icon className="mr-2 h-4 w-4" />
                  Create {task.label}
                </Link>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className={`relative ${ghostMuted}`}>
            <Bell className="h-5 w-5" />
            <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-[#C9996B] p-0 text-[10px] font-semibold text-[#1f1814]">
              3
            </Badge>
            <span className="sr-only">Notifications</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className={notifSurface}>
          <div className="flex items-center justify-between border-b border-[rgba(92,79,74,0.1)] p-3">
            <span className="text-sm font-semibold text-[#111827]">Notifications</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-xs text-[#6B7280]"
              onClick={() =>
                toast({
                  title: 'Notifications cleared',
                  description: 'You are all caught up.',
                })
              }
            >
              Mark all read
            </Button>
          </div>
          <div className="max-h-80 overflow-y-auto">
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
              <span className="text-sm">Your image post is live</span>
              <span className="text-xs text-[#6B7280]">2 minutes ago</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
              <span className="text-sm">New profile view spike</span>
              <span className="text-xs text-[#6B7280]">1 hour ago</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
              <span className="text-sm">Weekly gallery digest ready</span>
              <span className="text-xs text-[#6B7280]">3 hours ago</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className={ghostMuted}>
            <Avatar className={`h-9 w-9 border ${isContrast ? 'border-white/20' : 'border-[rgba(92,79,74,0.12)]'}`}>
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className={menuSurface}>
          <div className="flex items-center gap-3 p-3">
            <Avatar className="h-10 w-10 border border-[rgba(92,79,74,0.12)]">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user?.name}</span>
              <span className="text-xs text-[#6B7280]">{user?.email}</span>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard/saved">
              <Bookmark className="mr-2 h-4 w-4" />
              Saved Items
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout} className="text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
