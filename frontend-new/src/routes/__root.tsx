import { Header } from '@/components/Header'
import { Toaster } from '@/components/ui/sonner'
import { createRootRoute    , Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const RootLayout = () => (
    <>
        <Header />
        <Toaster richColors position='top-right' closeButton />
        
        <Outlet />
        <TanStackRouterDevtools />
    </>
)

export const Route = createRootRoute({ component: RootLayout })