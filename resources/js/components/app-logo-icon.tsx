import type { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="22" fill="currentColor" opacity="0.1" />
            <path
                d="M24 4C13 4 4 13 4 24s9 20 20 20 20-9 20-20S35 4 24 4zm0 36c-8.8 0-16-7.2-16-16S15.2 8 24 8s16 7.2 16 16-7.2 16-16 16z"
                fill="currentColor"
                opacity="0.3"
            />
            <path
                d="M24 8c-2 0-4 0.5-5.5 1.5C19 10 20 12 20 14c0 3-2 5-4 6 1 2 3 3.5 5 4 0 2-1 4-3 5.5 2 1 4.5 1.5 7 1.5 2 0 4-0.5 5.5-1.5 2-1.5 3-3.5 3-5.5-2-0.5-4-2-5-4 2-0.5 3.5-2 4-4 0-2-1-3.5-2.5-4.5C27 8.5 25.5 8 24 8z"
                fill="currentColor"
            />
            <circle cx="28" cy="16" r="2" fill="currentColor" opacity="0.5" />
            <circle cx="20" cy="22" r="1.5" fill="currentColor" opacity="0.5" />
            <circle cx="30" cy="26" r="1.5" fill="currentColor" opacity="0.5" />
        </svg>
    );
}
