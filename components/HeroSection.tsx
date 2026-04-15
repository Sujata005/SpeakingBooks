import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const HeroSection = () => {
    return (
        <section className="wrapper mb-10 md:mb-16">
            <div className="library-hero-card bg-[#e0f0fe] border border-blue-100 rounded-3xl shadow-sm">
                <div className="library-hero-content">
                    {/* Left Part */}
                    <div className="library-hero-text">
                        <h1 className="library-hero-title text-4xl font-serif font-bold">Your Library</h1>
                        <p className="library-hero-description">
                            Convert your books into interactive AI conversations. <br className="hidden md:block" />
                            Listen, learn, and discuss your favorite reads.
                        </p>
                        <Link href="/books/new" className="mt-6 flex items-center justify-center gap-2 bg-[#0369a1] text-white px-8 py-4 rounded-xl shadow-lg hover:bg-[#075985] transition-all w-fit">
                            <span className="text-3xl font-light mb-1">+</span>
                            <span className="text-lg font-semibold">Add new book</span>
                        </Link>
                    </div>

                    {/* Center Part - Desktop */}
                    <div className="library-hero-illustration-desktop">
                        <Image
                            src="/assets/hero-illustration.png"
                            alt="Vintage books and a globe"
                            width={400}
                            height={400}
                            className="object-contain grayscale brightness-110 opacity-80 mix-blend-multiply"
                        />
                    </div>

                    {/* Center Part - Mobile (Hidden on Desktop) */}
                    <div className="library-hero-illustration">
                        <Image
                            src="/assets/hero-illustration.png"
                            alt="Vintage books and a globe"
                            width={300}
                            height={300}
                            className="object-contain grayscale brightness-125 contrast-125 saturate-0 opacity-70"
                        />
                    </div>

                    {/* Right Part */}
                    <div className="library-steps-card min-w-[260px] max-w-[280px] z-10 bg-white/60 backdrop-blur-md border border-blue-100 rounded-2xl p-6 shadow-soft-xl">
                        <ul className="space-y-6">
                            {/* STEP 1 */}
                            <li className="library-step-item">
                                <div className="w-10 h-10 min-w-10 min-h-10 rounded-full bg-[#3b82f6] text-white flex items-center justify-center font-bold">1</div>
                                <div className="flex flex-col">
                                    <h3 className="library-step-title text-lg font-bold">Upload PDF</h3>
                                    <p className="library-step-description text-slate-500">Add your book file</p>
                                </div>
                            </li>
                            {/* STEP 2 - Using your Gemini Image */}
                            <li className="library-step-item">
                                <div className="w-10 h-10 min-w-10 min-h-10 rounded-full bg-[#3b82f6] text-white flex items-center justify-center font-bold">2</div>
                                <div className="flex flex-col">
                                    <h3 className="library-step-title text-lg font-bold">AI Processing</h3>
                                    <p className="library-step-description text-slate-500">We analyze the content</p>
                                </div>
                            </li>
                            {/* STEP 3 */}
                            <li className="library-step-item">
                                <div className="w-10 h-10 min-w-10 min-h-10 rounded-full bg-[#3b82f6] text-white flex items-center justify-center font-bold">3</div>
                                <div className="flex flex-col">
                                    <h3 className="library-step-title text-lg font-bold">Voice Chat</h3>
                                    <p className="library-step-description text-slate-500">Discuss with AI</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
