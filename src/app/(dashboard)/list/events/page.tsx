import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import Image from "next/image"
import FormModal from "@/components/FormModal"
import { Class, Event, Prisma } from "@prisma/client"
import prisma from "@/lib/prisma"
import { ITEM_PER_PAGE } from "@/lib/settings"
import { currentUserId, role } from "@/lib/utils"
import { id } from "zod/locales"

type EventList = Event & {class: Class}

const columns = [
  {
    header: "Title",accessor:"title"
  },
  
  {
    header:"Class",accessor:"class"
  },
  {
    header: "Date",accessor:"date",className:"hidden md:table-cell"
  },
  {
    header: "Start Time",accessor:"startTime",className:"hidden md:table-cell"
  },
  {
    header: "End Time",accessor:"endTime",className:"hidden md:table-cell"
  },
  ...(role==="admin" ?[{
      header:"Actions",accessor:"actions"
    }]:[])
]

 const renderRow = (item:EventList) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-satyaPurpleLight">
      <td className="flex items-center gap-4 p-4">{item.title}</td>
      <td >{item.class?.name}</td>
      <td className=" hidden md:table-cell">{new Intl.DateTimeFormat("en-us").format(item.startTime)}</td>
      <td className=" hidden md:table-cell">{item.startTime.toLocaleTimeString("en-us",{
        hour:"2-digit",
        minute:"2-digit",
        hour12: false
      })}</td>
      <td className=" hidden md:table-cell">{item.endTime.toLocaleTimeString("en-us",{
        hour:"2-digit",
        minute:"2-digit",
        hour12: false
      })}</td>

      <td>
        <div className="flex items-center gap-2">
          {/* <Link href={`/list/teachers/${item.id}`}>
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-satyaSky">
            <Image src="/edit.png" alt="" width={16} height={16}/>
          </button>
          </Link> */}
          {role==="admin"&&(
             <>
            <FormModal table="event" type="update" data={item}/>
            <FormModal table="event" type="delete" id={item.id}/>
            </>
          )}
        </div>
      </td>
    </tr>
  )

const EventsListPage = async ({
  searchParams,
}:{
  searchParams:{[key: string]:string | undefined}
}) => {

 const {page,...queryParams} = searchParams;

 const p = page? parseInt(page) : 1;

 const query: Prisma.EventWhereInput= {}

 if(queryParams){
  for(const[key,value] of Object.entries(queryParams)){
    if(value !== undefined) {
      switch(key){
      case "search" : 
        query.title={contains:value,mode:"insensitive"}
        break;
      default:
        break;
    }
    }
  }
 }

 //  ROle Condititions
 
//  switch(role){
//    case "admin":
//      break;
//    case "teacher":
//      query.OR=[
//       {classId:null},
//       {class:{lessons:{some:{teacherId:currentUserId!}}}}
//      ]
//      break;
//    default:
//      break;
 
//  }\

const roleConditions = {
  teacher : {lessons : {some: {teacherId:currentUserId!}}},
  student : {students : {some: {id:currentUserId!}}},
  parent : {students : {some: {parentId:currentUserId!}}},
}

query.OR=[
  {classId : null},
  {
    class : roleConditions[role as keyof typeof roleConditions] || {},
  }
]

 const [data,count]=await prisma.$transaction([
 prisma.event.findMany({
  //  where:{
  //   lessons:{
  //     some:{classId:parseInt(queryParams.classId!)}
  //   }
  //  },
   where:query,
   include:{
      class: true
   },
   take:ITEM_PER_PAGE,
   skip:ITEM_PER_PAGE*(p-1),
 }),
 prisma.event.count({where:query})
])

 

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Events</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch/>
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-satyaYellow">
              <Image src="/filter.png" alt="" width={14} height={14}/>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-satyaYellow">
              <Image src="/sort.png" alt="" width={14} height={14}/>
            </button>
            {role === "admin" &&(
            //   <button className="w-8 h-8 flex items-center justify-center rounded-full bg-satyaYellow">
            //   <Image src="/plus.png" alt="" width={14} height={14}/>
            // </button>
            <FormModal table="event" type="create"/>
          )}
          </div>
        </div>
      </div>
      {/* Lists */}
      <Table columns={columns} renderRow={renderRow} data={data}/>
      {/* Pagination*/}
      <Pagination page={p} count={count}/>
    </div>
  )
}

export default EventsListPage