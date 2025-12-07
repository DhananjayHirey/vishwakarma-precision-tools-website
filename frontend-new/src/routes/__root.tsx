import { Header } from '@/components/Header'
import { Toaster } from '@/components/ui/sonner'
import { createRootRoute    , Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const RootLayout = () => (
    <div className='min-h-screen'>
        <Header />
        <Toaster richColors position='top-right' closeButton expand/>
        
        <Outlet />
        <TanStackRouterDevtools />
    </div>
)

export const Route = createRootRoute({ component: RootLayout })