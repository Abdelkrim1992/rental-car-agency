"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
    LayoutGrid,
    Car,
    Calendar,
    CreditCard,
    BarChart2,
    Link as LinkIcon,
    Settings,
    LogOut,
    User,
    Leaf,
    MessageSquare,
    ChevronRight,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { logoutUser } from "@/store/slices/authSlice"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()
    const dispatch = useAppDispatch()
    const router = useRouter()
    const { user } = useAppSelector((s) => s.auth)

    const handleLogout = async () => {
        await dispatch(logoutUser())
        router.push("/")
    }

    const isActive = (path: string) => {
        if (path === "/dashboard" && pathname === "/dashboard") return true
        if (path !== "/dashboard" && pathname.startsWith(path)) return true
        return false
    }

    const navMain = [
        {
            title: "Home",
            items: [
                {
                    title: "Overview",
                    url: "/dashboard",
                    icon: LayoutGrid,
                    isActive: isActive("/dashboard"),
                },
            ],
        },
        {
            title: "Management",
            items: [
                {
                    title: "Vehicles",
                    url: "/dashboard/vehicles/all",
                    icon: Car,
                    isActive: pathname.includes("/vehicles"),
                    items: [
                        {
                            title: "All Vehicles",
                            url: "/dashboard/vehicles/all",
                        },
                        {
                            title: "Maintenance",
                            url: "/dashboard/vehicles/maintenance",
                        },
                        {
                            title: "Add Vehicle",
                            url: "/dashboard/vehicles/add",
                        },
                    ],
                },
                {
                    title: "Bookings",
                    url: "/dashboard/bookings",
                    icon: Calendar,
                    isActive: isActive("/dashboard/bookings"),
                },
                {
                    title: "Payments",
                    url: "/dashboard/payments",
                    icon: CreditCard,
                    isActive: pathname.includes("/payments"),
                    items: [
                        {
                            title: "Payment History",
                            url: "/dashboard/payments",
                        }
                    ]
                }
            ],
        },
        {
            title: "Other",
            items: [
                {
                    title: "Messages",
                    url: "/dashboard/messages",
                    icon: MessageSquare,
                    isActive: isActive("/dashboard/messages"),
                },
                {
                    title: "Reports & Insights",
                    url: "/dashboard/reports",
                    icon: BarChart2,
                    isActive: isActive("/dashboard/reports"),
                },
                {
                    title: "Integrations",
                    url: "/dashboard/integrations",
                    icon: LinkIcon,
                    isActive: isActive("/dashboard/integrations"),
                },
                {
                    title: "Settings",
                    url: "/dashboard/settings",
                    icon: Settings,
                    isActive: isActive("/dashboard/settings"),
                },
            ],
        },
    ]

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-green-700 text-sidebar-primary-foreground">
                                    <Leaf className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold text-lg">Renture</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {navMain.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        {item.items ? (
                                            <Collapsible defaultOpen={item.isActive} className="group/collapsible">
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton tooltip={item.title}>
                                                        {item.icon && <item.icon />}
                                                        <span>{item.title}</span>
                                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    <SidebarMenuSub>
                                                        {item.items.map((subItem) => (
                                                            <SidebarMenuSubItem key={subItem.title}>
                                                                <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                                                                    <Link href={subItem.url}>
                                                                        <span>{subItem.title}</span>
                                                                    </Link>
                                                                </SidebarMenuSubButton>
                                                            </SidebarMenuSubItem>
                                                        ))}
                                                    </SidebarMenuSub>
                                                </CollapsibleContent>
                                            </Collapsible>
                                        ) : (
                                            <SidebarMenuButton asChild isActive={item.isActive} tooltip={item.title}>
                                                <Link href={item.url}>
                                                    {item.icon && <item.icon />}
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        )}
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex items-center gap-3 px-3 py-2">
                            <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-slate-100">
                                <User className="size-4 text-slate-600" />
                            </div>
                            <div className="flex flex-col gap-0.5 leading-none overflow-hidden">
                                <span className="font-medium text-sm truncate">{user?.full_name || "Admin"}</span>
                                <span className="text-xs text-slate-500 truncate">{user?.email || "admin@renture.com"}</span>
                            </div>
                        </div>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={handleLogout} className="text-slate-500 hover:text-red-500 hover:bg-red-50">
                            <LogOut className="size-4" />
                            <span>Logout</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
