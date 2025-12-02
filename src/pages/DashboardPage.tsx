// import FooterSimple01 from '@/components/blocks/footer/footer-simple-01';
// import Navbar from '@/components/Navbar';
// import { authService } from '@/services/authService';

// export default function DashboardPage() {
//   return (
//     <div className='relative flex min-h-screen flex-col w-full'>
//       {/* Fixed Background */}
//       <div
//         className='fixed inset-0 w-full h-full -z-10'
//         style={{
//           backgroundImage: 'url(/images/iotBackground_Gradient.png)',
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundRepeat: 'no-repeat',
//         }}
//       />
//       <Navbar />
//       <main className='flex-1 flex items-center justify-center px-4 py-12'>
//         <div className='w-full max-w-md'>
//           <h1>Dashboard</h1>
//           Future dashboard
//           {authService.isAuthenticated() ? (
//             <p>You are logged in</p>
//           ) : (
//             <p>You are not logged in</p>
//           )}
//         </div>
//       </main>
//       <FooterSimple01 />
//     </div>
//   );
// }
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import data from "@/app/dashboard/data.json"

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
