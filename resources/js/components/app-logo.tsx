import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-gradient-to-br from-[#f7a928] to-[#e59a1f] text-white shadow-lg shadow-[#f7a928]/30">
                <AppLogoIcon className="size-5 fill-current text-white" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    Hanan's Pizza
                </span>
                <span className="truncate text-[0.6rem] uppercase tracking-widest text-muted-foreground">
                    Fast & Fresh
                </span>
            </div>
        </>
    );
}
