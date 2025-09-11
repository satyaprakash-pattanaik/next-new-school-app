import Announcements from "@/components/Announcements"
import BigCalendar from "@/components/BigCalender"

const parentPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row flex-1par">
      {/* Left */}
      <div className="w-full lg:w-2/3">
      <div className="h-full bg-white p-4 rounded-md">
        <h2 className="text-xl font-semibold">Schedule(Satya)</h2>
        <BigCalendar/>
      </div>
      </div>
      {/* Right */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        
        <Announcements/>
      </div>
    </div>
  )
}

export default parentPage