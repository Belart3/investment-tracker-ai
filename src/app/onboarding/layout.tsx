import { Suspense } from 'react'
import OnboardingHeader from '@/components/ui/onboarding/OnboardingHeader'

// Wraps every page under /onboarding. Fonts, globals.css, <html> and <body>
// already come from the root layout (src/app/layout.tsx), so they're not repeated here.
export default function OnboardingLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className='min-h-screen flex flex-col bg-[var(--bg-canvas)]'>
            {/* The header reads ?step from the URL, which Next.js needs wrapped in <Suspense> */}
            <Suspense>
                <OnboardingHeader />
            </Suspense>
            <main className='flex-1 flex justify-center px-6 pb-16'>
                {children}
            </main>
        </div>
    )
}
