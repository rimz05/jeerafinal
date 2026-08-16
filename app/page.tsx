import { Button } from "@/components/ui/button";
import { Download, Star } from "lucide-react";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  return (
    <div className="relative flex justify-center min-h-screen overflow-hidden px-4 sm:px-10">

      {/* CENTER CONTENT */}
      <div className="flex items-center flex-col text-center gap-5 mt-28 sm:mt-36 max-w-5xl z-10 justify-center">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
          Project management, built for small businesses.
          <br className="hidden sm:block" />
          Simple. Organized. Powerful.
        </h1>

        <p className="text-base sm:text-lg lg:text-xl max-w-xl sm:max-w-2xl text-gray-500 dark:text-gray-400">
          Plan projects, assign tasks, track progress, and manage your team’s work — all from one simple dashboard.
        </p>

        <div className="gap-3 sm:gap-5 flex mt-3 sm:mt-4 text-base sm:text-lg flex-col sm:flex-row">
          {isLoggedIn ? (
            <Button asChild size="lg">
              <Link href="/workspace">Go to Workspace</Link>
            </Button>
          ) : (
            <>
              <Button size="lg">
                <RegisterLink>Get Started Free</RegisterLink>
              </Button>

              <Button asChild size="lg" variant="outline">
                <LoginLink>Sign in</LoginLink>
              </Button>
            </>
          )}
        </div>
      </div>

      {/* CARD 1 */}

      <div className="flex absolute left-5 xl:left-10 top-70 w-80 bg-white dark:bg-gray-800 shadow-lg rounded-xl px-6 py-3 items-center gap-4 rotate-6 -skew-y-3">
        <div className="bg-blue-100/80 dark:bg-blue-900/40 w-14 h-14 flex justify-center items-center rounded-md">
          <img className="w-11" src="images/home/project-icon.png" alt="" />
        </div>
        <div>
          <p className="font-bold leading-5 text-base mb-1 dark:text-white">
            6 New projects created
          </p>
          <p className="text-blue-700 dark:text-blue-400 text-sm">View active projects</p>
        </div>
      </div>

      {/* CARD 2 */}
      <div className="flex absolute right-6 top-[5rem] xl:right-10 xl:top-96 w-80 bg-white dark:bg-gray-800 shadow-lg rounded-xl px-6 py-3 items-center gap-4 -rotate-12 skew-y-3">
        <div className="bg-yellow-100/80 dark:bg-yellow-900/40 w-14 h-14 flex justify-center items-center rounded-md">
          <img className="w-10" src="images/home/invoice-icon.png" alt="" />
        </div>
        <div>
          <p className="font-bold leading-5 text-base mb-1 dark:text-white">
            Project milestone completed
          </p>
          <p className="text-blue-700 dark:text-blue-400 text-sm">Generate invoice</p>
        </div>
      </div>

      {/* CARD 3 */}
      <div className="hidden xl:flex flex-col absolute right-8 top-[32rem] w-88 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-xl rounded-3xl px-6 py-6 gap-4 -rotate-6 skew-x-3">

        <div className="flex gap-3 items-start">
          <div className="bg-cyan-100 dark:bg-cyan-900/40 w-20 h-20 flex justify-center items-center rounded-full">
            <img className="w-14" src="images/home/ai-bot-icon.png" alt="" />
          </div>

          <div>
            <p className="text-gray-400 mb-1 text-sm">Good morning</p>
            <p className="text-lg font-bold leading-5 text-gray-900 dark:text-white">
              Today’s task focus
            </p>
            <p className="mt-1 text-blue-500 font-semibold text-sm">
              Review today’s milestones
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="w-full h-3 rounded-full bg-[#e0e0e2] dark:bg-gray-600 shadow-[inset_0_1px_2px_rgba(0,0,0,0.08)]"></div>
          <div className="w-full h-3 rounded-full bg-[#e0e0e2] dark:bg-gray-600 shadow-[inset_0_1px_2px_rgba(0,0,0,0.08)]"></div>
          <div className="w-full h-3 rounded-full bg-[#e0e0e2] dark:bg-gray-600 shadow-[inset_0_1px_2px_rgba(0,0,0,0.08)]"></div>
        </div>

        <button className="mt-1 w-fit px-4 py-1.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#22c1a7] to-[#2dd4bf] shadow-md shadow-[#2dd4bf]/30">
          ● In progress
        </button>
      </div>

      {/* CARD 4 */}
      <div className="flex flex-col absolute left-0 bottom-[5rem] xl:left-8 xl:top-[32rem] w-88 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-xl rounded-3xl px-6 py-6 gap-3 -rotate-1 skew-x-3">

        <div className="flex gap-3 items-center">
          <div className="bg-green-100 dark:bg-green-900/40 w-14 h-14 flex justify-center items-center rounded-full">
            <img className="w-9" src="images/home/google-sheets-icon.png" alt="" />
          </div>

          <p className="text-lg font-bold text-gray-900 dark:text-white">
            Weekly project report
          </p>
        </div>

        <div className="flex justify-between items-center text-sm">
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Download the latest progress summary
          </p>
          <Download className="text-gray-500 dark:text-gray-400" size={18} />
        </div>

        <div className="flex">
          <Star size={18} fill="currentColor" className="text-yellow-400" />
          <Star size={18} fill="currentColor" className="text-yellow-400" />
          <Star size={18} fill="currentColor" className="text-yellow-400" />
          <Star size={18} fill="currentColor" className="text-yellow-400" />
          <Star size={18} fill="currentColor" className="text-gray-300 dark:text-gray-600" />
        </div>
      </div>
    </div>
  );
}
