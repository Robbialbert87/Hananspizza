import { Link } from '@inertiajs/react';
import {
    LayoutDashboard,
    Pizza,
    ShoppingBag,
    Settings,
    Globe,
    BarChart3,
    Tag,
    Users,
    ClipboardList,
    FolderTree,
    Store,
    Image,
    ChevronRight,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    useSidebar,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutDashboard,
    },
];

const managementNavItems: NavItem[] = [
    {
        title: 'Kelola Menu',
        href: '/admin/menu',
        icon: Pizza,
    },
    {
        title: 'Categories',
        href: '/admin/categories',
        icon: FolderTree,
    },
    {
        title: 'Outlets',
        href: '/admin/outlets',
        icon: Store,
    },
    {
        title: 'Orders',
        href: '/admin/orders',
        icon: ClipboardList,
    },
    {
        title: 'Promotions',
        href: '/admin/promos',
        icon: Tag,
    },
    {
        title: 'Customers',
        href: '/admin/customers',
        icon: Users,
    },
    {
        title: 'Hero Banner',
        href: '/admin/hero-banners',
        icon: Image,
    },
];

const settingsNavItems: NavItem[] = [
    {
        title: 'Settings',
        href: '/settings/profile',
        icon: Settings,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'View Website',
        href: '/',
        icon: Globe,
    },
];

export function AppSidebar() {
    const { setOpenMobile, isMobile } = useSidebar();

    const closeMobile = () => {
        if (isMobile) {
            setOpenMobile(false);
        }
    };

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch onClick={closeMobile}>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} label="Main" />
                <NavMain items={managementNavItems} label="Management" />
                <NavMain items={settingsNavItems} label="Settings" />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
