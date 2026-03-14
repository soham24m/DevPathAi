export default function WeekCard({ week, completed, toggleTask }) {
  const allDone = week.tasks.every((_, i) => completed[`${week.week}-${i}`])

  return (
    <div className={`mb-6 rounded-2xl border p-6 transition ${allDone ? 'border-cyan-500 bg-cyan-950/20' : 'border-gray-800 bg-gray-900'}`}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-white">
          Week {week.week} — {week.theme}
        </h2>
        {allDone && <span className="text-cyan-400 text-sm font-semibold">✅ Done</span>}
      </div>

      <div className="space-y-2 mb-4">
        {week.tasks.map((task, i) => {
          const key = `${week.week}-${i}`
          return (
            <div
              key={i}
              onClick={() => toggleTask(week.week, i)}
              className="flex items-start gap-3 cursor-pointer group"
            >
              <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 transition ${completed[key] ? 'bg-purple-500 border-purple-500' : 'border-gray-600 group-hover:border-purple-400'}`} />
              <span className={`text-sm transition ${completed[key] ? 'line-through text-gray-500' : 'text-gray-300'}`}>
                {task}
              </span>
            </div>
          )
        })}
      </div>

      <div className="border-t border-gray-800 pt-4 mt-4">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Milestone</p>
        <p className="text-sm text-cyan-400">{week.milestone}</p>
      </div>

      <div className="mt-3">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Resources</p>
        {week.resources.map((r, i) => (
          <p key={i} className="text-sm text-purple-400">→ {r}</p>
        ))}
      </div>
    </div>
  )
}