import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";


export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-slate-200 bg-slate-50">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="grid gap-12 md:grid-cols-3 lg:gap-16">
                    {/* Left: Logo & Description */}
                    <div>
                        <h3 className="text-lg font-semibold text-slate-950">EventHub</h3>
                        <p className="mt-4 text-sm leading-6 text-slate-600">
                            Host, discover, and manage unforgettable events. EventHub empowers organizers and connects communities through seamless event experiences.
                        </p>

                        {/* Social Media Icons */}
                        <div className="mt-6 flex gap-4">
                            <a
                                href="https://github.com"
                                className="rounded-full bg-white p-3 text-slate-600 shadow-sm transition hover:bg-blue-50 hover:text-blue-600"
                                aria-label="GitHub"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaGithub className="h-4 w-4" />
                            </a>
                            <a
                                href="https://x.com"
                                className="rounded-full bg-white p-3 text-slate-600 shadow-sm transition hover:bg-blue-50 hover:text-blue-600"
                                aria-label="Twitter"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaSquareXTwitter className="h-4 w-4" />
                            </a>
                            <a
                                href="https://www.linkedin.com"
                                className="rounded-full bg-white p-3 text-slate-600 shadow-sm transition hover:bg-blue-50 hover:text-blue-600"
                                aria-label="LinkedIn"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaLinkedin className="h-4 w-4" />
                            </a>
                            <a
                                href="https://www.facebook.com"
                                className="rounded-full bg-white p-3 text-slate-600 shadow-sm transition hover:bg-blue-50 hover:text-blue-600"
                                aria-label="Facebook"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaFacebook className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    {/* Middle: Links */}
                    <div>
                        <div className="grid gap-8 sm:grid-cols-2">
                            {/* Quick Links */}
                            <div>
                                <h4 className="text-sm font-semibold text-slate-900">Quick Links</h4>
                                <ul className="mt-4 space-y-3">
                                    <li>
                                        <Link href="/" className="text-sm text-slate-600 transition hover:text-blue-600">
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/explore" className="text-sm text-slate-600 transition hover:text-blue-600">
                                            Explore Events
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/about" className="text-sm text-slate-600 transition hover:text-blue-600">
                                            About
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact" className="text-sm text-slate-600 transition hover:text-blue-600">
                                            Contact
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Resources */}
                            <div>
                                <h4 className="text-sm font-semibold text-slate-900">Resources</h4>
                                <ul className="mt-4 space-y-3">
                                    <li>
                                        <Link href="/about" className="text-sm text-slate-600 transition hover:text-blue-600">
                                            FAQ
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/about" className="text-sm text-slate-600 transition hover:text-blue-600">
                                            Privacy Policy
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/about" className="text-sm text-slate-600 transition hover:text-blue-600">
                                            Terms & Conditions
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact" className="text-sm text-slate-600 transition hover:text-blue-600">
                                            Support
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right: Contact Info */}
                    <div>
                        <h4 className="text-sm font-semibold text-slate-900">Contact Us</h4>
                        <div className="mt-6 space-y-4">
                            <a href="mailto:hello@eventhub.app" className="flex items-start gap-3 text-sm text-slate-600 transition hover:text-blue-600">
                                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0" />
                                <span>hello@eventhub.app</span>
                            </a>
                            <a href="tel:+1234567890" className="flex items-start gap-3 text-sm text-slate-600 transition hover:text-blue-600">
                                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0" />
                                <span>+1 (234) 567-890</span>
                            </a>
                            <div className="flex items-start gap-3 text-sm text-slate-600">
                                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                                <span>123 Event Street, City, State 12345</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom: Copyright */}
                <div className="mt-12 border-t border-slate-200 pt-8">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <p className="text-sm text-slate-600">
                            &copy; {currentYear} EventHub. All rights reserved.
                        </p>
                        <p className="text-sm text-slate-600">
                            Designed with <span className="text-red-500">❤️</span> using Next.js & TypeScript
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
