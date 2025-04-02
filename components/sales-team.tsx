import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function SalesTeam() {
  const team = [
    { id: 1, name: "Alex", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "Sam", avatar: "/placeholder.svg?height=40&width=40" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-around">
        {team.map((member) => (
          <div key={member.id} className="flex flex-col items-center">
            <Avatar className="h-12 w-12">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback>{member.name[0]}</AvatarFallback>
            </Avatar>
            <span className="mt-1 text-xs">{member.name}</span>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="text-xs font-medium">Sales Management</div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
            5
          </div>
          <span className="text-xs">Team Members</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Avatar className="h-10 w-10 border-2 border-blue-500">
          <AvatarFallback>329</AvatarFallback>
        </Avatar>
        <div className="text-xs">
          <div>Total Leads</div>
          <div className="font-medium">329</div>
        </div>
      </div>
    </div>
  );
}
