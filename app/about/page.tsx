"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { VocoraMascot } from "@/components/vocora-mascot";
import { useLanguage } from "@/lang/LanguageContext";
import aboutTranslations from "@/lang/about";

export default function AboutPage() {
  const { language } = useLanguage();
  const t = aboutTranslations[language];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white dark:from-purple-950 dark:to-slate-900">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200 mb-8 text-sm font-medium transition-colors"
        >
          {t.backToHome}
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
            <VocoraMascot width={48} height={48} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent">
            {t.heading}
          </h1>
        </div>

        <div className="space-y-6 text-slate-700 dark:text-slate-300">
          <section>
            <h2 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-3">
              {t.mission.title}
            </h2>
            <p className="leading-relaxed">{t.mission.body}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-3">
              {t.whatWeDo.title}
            </h2>
            <ul className="space-y-2 list-none">
              {t.whatWeDo.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-3">
              {t.team.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  name: "Ruben Aleman",
                  handle: "@BUDDY26",
                  github: "https://github.com/BUDDY26",
                },
                {
                  name: "Silvia Osuna",
                  handle: "@mozzarellastix",
                  github: "https://github.com/mozzarellastix",
                },
                {
                  name: "Andrea Garza",
                  handle: "@andreag02",
                  github: "https://github.com/andreag02",
                },
              ].map((member) => (
                <a
                  key={member.name}
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-purple-100 dark:border-purple-800 text-center hover:border-purple-400 dark:hover:border-purple-600 transition-colors block"
                >
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <VocoraMascot width={28} height={28} />
                  </div>
                  <p className="font-semibold text-slate-800 dark:text-slate-100">
                    {member.name}
                  </p>
                  <p className="text-sm text-purple-500 dark:text-purple-400">
                    {member.handle}
                  </p>
                </a>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-3">
              {t.academic.title}
            </h2>
            <p className="leading-relaxed">{t.academic.body}</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
