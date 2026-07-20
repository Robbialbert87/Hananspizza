import type { ComponentPropsWithoutRef } from 'react';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { toUrl } from '@/lib/utils';
import type { NavItem } from '@/types';

export function NavFooter({
    items,
    className,
    ...props
}: ComponentPropsWithoutRef<typeof SidebarGroup> & {
    items: NavItem[];
}) {
    const { setOpenMobile, isMobile } = useSidebar();

    const handleClick = () => {
        if (isMobile) {
            setOpenMobile(false);
        }
    };
    return (
        <SidebarGroup
            {...props}
            className={`group-data-[collapsible=icon]:p-0 border-t border-slate-200 dark:border-slate-700 pt-3 ${className || ''}`}
        >
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                className="text-slate-500 dark:text-slate-400 transition-all duration-200 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/20"
                            >
                                <a
                                    href={toUrl(item.href)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={handleClick}
                                >
                                    {item.icon && (
                                        <item.icon className="h-5 w-5 transition-transform duration-200 group-hover/menu-item:scale-110" />
                                    )}
                                    <span className="transition-transform duration-200 group-hover/menu-item:translate-x-0.5">
                                        {item.title}
                                    </span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
