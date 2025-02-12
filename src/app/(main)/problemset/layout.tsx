import { LeaderboardDemo } from "@/components/demo/leaderboard-chart";

export default function ProblemSetLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" max-w-[1200px]  w-full mx-auto grid grid-cols-12 gap-4 p-4">
      <div className="col-span-9">
        {children}
      </div>

      {/* Sidebar: Leaderboard + Upcoming Contests */}

      <div className="col-span-3 flex flex-col gap-4">
        <LeaderboardDemo />

        <div className="bg-accent p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Upcoming Contests</h2>
          <p> one </p>
          <p> one </p>
          <p> one </p>
          <p> one </p>
          <p> one </p>
        </div>
      </div>
    </div>
  );
}

