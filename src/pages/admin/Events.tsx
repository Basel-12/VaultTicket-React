import { AppSidebar } from '@/components/app-sidebar'
import { DataTable } from "@/components/data-table"
import EventTable from '@/components/EventTable'
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { set } from 'zod'

export default function Events() {


    const [data,setData] = useState([]);

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const res = await axios.get('/api/Events')
                setData(res.data)
            }catch(err){
                    toast.error('error fetching data');
            }
        }

        fetchData()

    },[])


  return (
    <>
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <EventTable />
            </div>
          </div>
        </div>
      </SidebarInset>
        </SidebarProvider>
    </>
  )
}
