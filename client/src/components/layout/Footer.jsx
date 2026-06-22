// export default function Footer() {
//   return (
//     <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-400">
//       © {new Date().getFullYear()} RailwayGPT AI — Agentic Railway OS. Built with ❤ for travellers.
//     </footer>
//   );
// }



import { Mail, MapPin, Train } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black/40 backdrop-blur-xl">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Top Section */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 p-2">
                <Train className="h-5 w-5 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-white">
                RailwayGPT AI
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-slate-400">
              India's first Multi-Agent Railway Operating System powered by AI.
              Search trains, book tickets, track delays, manage refunds and get
              instant railway assistance through intelligent AI agents.
            </p>

            {/* Social Buttons without icons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-400 transition hover:border-violet-500 hover:text-white"
              >
                GitHub
              </a>

              <a
                href="#"
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-400 transition hover:border-violet-500 hover:text-white"
              >
                LinkedIn
              </a>

              <a
                href="#"
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-400 transition hover:border-violet-500 hover:text-white"
              >
                Twitter
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-5 font-semibold text-white">Product</h3>

            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#">AI Assistant</a></li>
              <li><a href="#">Train Search</a></li>
              <li><a href="#">PNR Status</a></li>
              <li><a href="#">Ticket Booking</a></li>
              <li><a href="#">Refund Management</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-5 font-semibold text-white">Resources</h3>

            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#">Documentation</a></li>
              <li><a href="#">API Reference</a></li>
              <li><a href="#">Developer Guide</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 font-semibold text-white">Contact</h3>

            <div className="space-y-4 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                support@railwaygpt.ai
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={16} />
                India
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-2 gap-6 border-y border-white/10 py-10 md:grid-cols-4">
          <div className="text-center">
            <h4 className="text-3xl font-bold text-white">50+</h4>
            <p className="mt-2 text-xs uppercase tracking-wider text-slate-500">
              AI Agents
            </p>
          </div>

          <div className="text-center">
            <h4 className="text-3xl font-bold text-white">1M+</h4>
            <p className="mt-2 text-xs uppercase tracking-wider text-slate-500">
              Queries Processed
            </p>
          </div>

          <div className="text-center">
            <h4 className="text-3xl font-bold text-white">99.99%</h4>
            <p className="mt-2 text-xs uppercase tracking-wider text-slate-500">
              Uptime
            </p>
          </div>

          <div className="text-center">
            <h4 className="text-3xl font-bold text-white">&lt;1s</h4>
            <p className="mt-2 text-xs uppercase tracking-wider text-slate-500">
              Response Time
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-sm text-slate-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} RailwayGPT AI. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-white">
              Terms
            </a>

            <a href="#" className="hover:text-white">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}