import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import type { NavItem } from '@/types';

export function NavMain({ items = [], label = 'Main' }: { items: NavItem[]; label?: string }) {
    const { isCurrentUrl } = useCurrentUrl();
    const { setOpenMobile, isMobile } = useSidebar();

    const handleClick = () => {
        if (isMobile) {
            setOpenMobile(false);
        }
    };

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {label}
            </SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const hasChildren = !!(item.children && item.children.length > 0);
                    const isActive = item.href ? isCurrentUrl(item.href) : false;
                    const isChildActive = hasChildren
                        ? item.children!.some((child) => isCurrentUrl(child.href))
                        : false;

                    if (hasChildren) {
                        return (
                            <SidebarMenuItem key={item.title}>
                                <Collapsible
                                    defaultOpen={isChildActive}
                                    className="group/collapsible"
                                >
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton
                                            isActive={isActive || isChildActive}
                                            tooltip={{ children: item.title }}
                                            className="relative overflow-visible transition-all duration-200 hover:bg-amber-50 dark:hover:bg-amber-950/20"
                                        >
                                            {(isActive || isChildActive) && (
                                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-amber-500 rounded-r-full transition-all duration-200 group-data-[collapsible=icon]:hidden" />
                                            )}
                                            {item.icon && (
                                                <item.icon className="transition-all duration-200 group-hover/menu-item:scale-110 group-hover/menu-item:text-amber-500" />
                                            )}
                                            <span className="transition-all duration-200 group-hover/menu-item:translate-x-0.5">
                                                {item.title}
                                            </span>
                                            <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                                        <SidebarMenuSub>
                                            {item.children!.map((child) => (
                                                <SidebarMenuSubItem key={child.title}>
                                                    <SidebarMenuSubButton
                                                        asChild
                                                        isActive={isCurrentUrl(child.href)}
                                                        className="transition-all duration-200 hover:translate-x-0.5"
                                                    >
                                                        <Link
                                                            href={child.href}
                                                            prefetch
                                                            onClick={handleClick}
                                                        >
                                                            {child.icon && <child.icon />}
                                                            <span>{child.title}</span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </Collapsible>
                            </SidebarMenuItem>
                        );
                    }

                    return (
                        <SidebarMenuItem
                            key={item.title}
                            className="data-[mobile=true]:animate-slideInFromLeft data-[mobile=true]:opacity-0"
                        >
                            <SidebarMenuButton
                                asChild
                                isActive={isActive}
                                tooltip={{ children: item.title }}
                                className="relative overflow-visible transition-all duration-200 hover:bg-amber-50 dark:hover:bg-amber-950/20"
                            >
                                <Link href={item.href!} prefetch onClick={handleClick}>
                                    {isActive && (
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-amber-500 rounded-r-full transition-all duration-200 group-data-[collapsible=icon]:hidden" />
                                    )}
                                    {item.icon && (
                                        <item.icon className="transition-all duration-200 group-hover/menu-item:scale-110 group-hover/menu-item:text-amber-500" />
                                    )}
                                    <span className="transition-all duration-200 group-hover/menu-item:translate-x-0.5">
                                        {item.title}
                                    </span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
