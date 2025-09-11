import Announcements from "@/components/Announcements"
import Attendancechart from "@/components/Attendancechart"
import CountCharts from "@/components/CountCharts"
import EventCalendar from "@/components/EventCalendar"
import FinanaceChart from "@/components/FinanaceChart"
import UserCard from "@/components/UserCard"

const AdminPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/*Left*/}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
      {/*User Cards*/}
      <div className=" flex gap-4 justify-between flex-wrap">
        <UserCard type="student"/>
        <UserCard type="teacher"/>
        <UserCard type="parent"/>
        <UserCard type="staff"/>
      </div>
      {/* MiddleCharts */}
      <div className=" flex gap-4 flex-col lg:flex-row">
        {/* Count charts */}
        <div className="w-full lg:w-1/3 h-[450px]">
        <CountCharts/>
        </div>
        {/* Attendance Charts */}
        <div className="w-full lg:w-2/3 h-[450px]">
        <Attendancechart/>
        </div>
      </div>
      {/* BottomVharts */}
      <div className="w-full h-[500px]">
        <FinanaceChart/>
      </div>
      </div>
      {/*Right*/}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar/>
        <Announcements/>
      </div>
    </div>
  )
}

export default AdminPage