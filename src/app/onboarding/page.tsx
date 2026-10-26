import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import OnboardingFlow from '@/components/ui/onboarding/OnboardingFlow'

export default async function OnboardingPage() {
    // Logged-out visitors go to sign in before seeing any of the form
    const user = await getCurrentUser()
    if (!user) {
        redirect('/signin?next=/onboarding')
    }

    // The flow reads ?step from the URL, so (like the header) it sits inside <Suspense>
    return (
        <Suspense>
            <OnboardingFlow />
        </Suspense>
    )
}
