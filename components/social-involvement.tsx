import { Users } from "lucide-react";

export function SocialInvolvement() {
  return (
    <div className="flex flex-col items-center">
      <Users className="h-10 w-10 text-blue-500" />
      <div className="mt-2 text-xs text-center">
        <div>Social Involvement</div>
      </div>

      <div className="mt-4 flex justify-between w-full">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-4 w-4 rounded-full bg-blue-500"></div>
        ))}
      </div>
    </div>
  );
}
