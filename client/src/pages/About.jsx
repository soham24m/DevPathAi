import mePhoto from '../assets/me.jpeg'

export default function About() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-black text-white">
      
      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-8 py-5">
        <a href="/" className="text-white font-bold text-xl tracking-widest hover:text-purple-400 transition">DEVPATH AI</a>
        <span className="text-gray-500 text-sm tracking-widest">BETA</span>
      </nav>

      {/* HERO */}
      <div className="min-h-screen flex items-center justify-center px-8 pt-20">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Photo */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur-2xl opacity-20" />
              <img
                src={mePhoto}
                alt="Soham Siddhartha Mishra"
                className="relative w-72 h-80 object-cover object-top rounded-3xl border border-gray-800"
              />
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-purple-400 text-sm tracking-[0.4em] mb-4 uppercase">The Builder</p>
            <h1 className="text-5xl font-black text-white mb-2 leading-tight">Soham Siddhartha<br/>Mishra</h1>
            <p className="text-gray-500 text-sm tracking-widest mb-6 uppercase">1st Year CSE · SRM University Chennai</p>
            
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              I'm a first year CS student who got tired of opening 50 browser tabs just to figure out what to learn next. 
              No one tells you the exact path. Everyone's too busy gatekeeping. So I built DevPath AI — 
              an AI that just tells you exactly what to do, week by week, no fluff.
            </p>

            <div className="flex gap-4">
              <a href="https://github.com/soham24m" target="_blank" rel="noopener noreferrer"
                className="px-6 py-3 border border-gray-800 rounded-xl text-white text-sm font-bold tracking-widest hover:border-purple-500 hover:text-purple-400 transition-all">
                GitHub ↗
              </a>
              <a href="https://www.linkedin.com/in/soham-siddhartha-mishra-ba1aa822a/" target="_blank" rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white text-sm font-bold tracking-widest hover:opacity-90 transition-all">
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* WHY I BUILT THIS */}
      <div className="py-20 px-8 border-t border-gray-900">
        <div className="max-w-3xl mx-auto">
          <p className="text-purple-400 text-sm tracking-[0.4em] mb-4 uppercase text-center">The Why</p>
          <h2 className="text-5xl font-black text-white mb-12 text-center">Why I built this.</h2>
          
          <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
            <p>
              I'm a first year CS student at SRM University. When I started, I had zero clue where to begin. 
              YouTube had 1000 tutorials. Google had 10 million opinions. Reddit told me 10 different things. 
              I wasted weeks just figuring out what to learn instead of actually learning.
            </p>
            <p>
              Procrastination wasn't laziness — it was <span className="text-white font-bold">decision paralysis</span>. 
              Too many options, no clear path, no accountability. I'd open VS Code, stare at it, and close it.
            </p>
            <p>
              DevPath AI solves exactly this. You tell it your goal. It tells you exactly what to do each week, 
              each day. No more "where do I start". No more wasted hours. Just a clear, structured path from 
              where you are to where you want to be.
            </p>
            <p className="text-white font-bold text-xl">
              I built the tool I wish I had on day one.
            </p>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="py-20 px-8 border-t border-gray-900">
        <div className="max-w-4xl mx-auto">
          <p className="text-purple-400 text-sm tracking-[0.4em] mb-4 uppercase text-center">What it does</p>
          <h2 className="text-5xl font-black text-white mb-16 text-center">Built to fight procrastination.</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🗺️', title: 'AI Roadmap', desc: 'Type your goal, get a structured week-by-week learning plan instantly.' },
              { icon: '📅', title: 'Daily Plans', desc: 'Break each week into daily tasks so you always know exactly what to do today.' },
              { icon: '▶️', title: 'YouTube Resources', desc: 'Every topic links directly to the best YouTube tutorials so you never waste time searching.' },
            ].map((f, i) => (
              <div key={i} className="border border-gray-900 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:bg-gray-950">
                <div className="text-3xl mb-4">{f.icon}</div>
                <div className="text-white font-black text-xl mb-3">{f.title}</div>
                <div className="text-gray-600 text-sm leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 px-8 border-t border-gray-900 text-center">
        <h2 className="text-5xl font-black text-white mb-6">Stop scrolling.<br/>Start building.</h2>
        <a href="/"
          className="inline-block px-10 py-4 bg-white text-black font-bold text-lg rounded-full hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/30">
          Generate Your Roadmap →
        </a>
      </div>

      {/* FOOTER */}
      <div className="border-t border-gray-900 py-8 px-8 text-center">
        <p className="text-gray-700 text-sm tracking-widest">DEVPATH AI — BUILT BY SOHAM SIDDHARTHA MISHRA</p>
      </div>
    </div>
  )
}