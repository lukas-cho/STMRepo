'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AuthButton from './AuthButton';

export default function Navbar() {
    const pathname = usePathname();

    // Home, Breeds, Favorites, Contact

    const navItems = [
        { label: "Home", href: "/" },
        { label: "Breeds", href: "/breeds" },
        { label: "Breeds Pagination", href: "/breeds-pagination" },
        { label: "Breeds Infinite", href: "/breeds-infinite" },
        { label: "Favorites", href: "/favorites" },
        { label: "Contact", href: "/contact" },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-sm border-b">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="text-xl font-bold tracking-tight text-blue-700">🐶 Dog World</div>
                    <div className="flex space-x-4">
                        {
                            navItems.map((item) => (
                                <Link key={item.label} href={item.href} className="hover:text-yellow-400">
                                    <span
                                        className={`${pathname === item.href ? "font-bold underline text-blue-600" : ""}`}
                                    >
                                        {item.label}
                                    </span>
                                </Link>
                            ))
                        }
                        <AuthButton />
                    </div>
                </div>
            </div>
        </nav>
    )
}