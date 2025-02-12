export default function ProblemSetLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" max-w-[1200px]  w-full mx-auto grid grid-cols-12 gap-4 p-4">
      <div className="col-span-9  border border-black p-4 rounded-lg shadow">
        {children}
      </div>

      {/* Sidebar: Leaderboard + Upcoming Contests */}
      <div className="col-span-3 flex flex-col gap-4">
        {/* Leaderboard Section */}
        <div className="bg-accent p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Leaderboard</h2>
          <p> one </p>
          <p> one </p>
          <p> one </p>
          <p> one </p>
          <p> one </p>
          <p> one </p>
          <p> one </p>
          <p> one </p>
          <p> one </p>
          <p> one </p>
          <p> one </p>
          <p> one </p>
          <p> one </p>
          <p> one </p>
          <p> one </p>
        </div>

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

