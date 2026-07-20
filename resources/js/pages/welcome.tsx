import { Head } from '@inertiajs/react';
import React from 'react';

// Import Components
import Footer from '../components/landing/Footer';
import HeroSection from '../components/landing/HeroSection';
import MenuSection from '../components/landing/MenuSection';
import Navbar from '../components/landing/Navbar';
import PlatformSection from '../components/landing/PlatformSection';
import PromoSection from '../components/landing/PromoSection';
import ReviewSection from '../components/landing/ReviewSection';

export default function Welcome({ menuItems = [], promos = [] }: { menuItems?: any[]; promos?: any[] }) {
    return (
        <div className="font-['Poppins',sans-serif] text-[#1B1B1B] leading-relaxed scroll-smooth" style={{ scrollPaddingTop: '80px' }}>
            <Head title="Hanan's Pizza" />
            <Navbar />
            <HeroSection featuredItems={menuItems} />
            <MenuSection menuItems={menuItems} />
            <PlatformSection />
            <PromoSection promos={promos} />
            <ReviewSection />
            <Footer />
        </div>
    );
}
