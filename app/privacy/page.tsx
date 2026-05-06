"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lang/LanguageContext";
import privacyTranslations from "@/lang/privacy";

export default function PrivacyPage() {
  const { language } = useLanguage();
  const t = privacyTranslations[language];

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

        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent mb-8">
          {t.heading}
        </h1>

        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
          {t.lastUpdated}
        </p>

        <div className="space-y-6 text-slate-700 dark:text-slate-300">
          <section>
            <h2 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-3">
              {t.s1.title}
            </h2>
            <p className="leading-relaxed">{t.s1.body}</p>
            <ul className="mt-2 space-y-1 list-disc list-inside ml-2">
              {t.s1.items.map((item) => (
                <li key={item.label}>
                  <strong>{item.label}</strong> — {item.desc}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-3">
              {t.s2.title}
            </h2>
            <ul className="mt-2 space-y-1 list-disc list-inside ml-2">
              {t.s2.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-3">
              {t.s3.title}
            </h2>
            <p className="leading-relaxed">{t.s3.body}</p>
            <ul className="mt-2 space-y-1 list-disc list-inside ml-2">
              {t.s3.items.map((item) => (
                <li key={item.label}>
                  <strong>{item.label}</strong> — {item.desc}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-3">
              {t.s4.title}
            </h2>
            <p className="leading-relaxed">{t.s4.body}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-3">
              {t.s5.title}
            </h2>
            <p className="leading-relaxed">
              {t.s5.body}{" "}
              <Link
                href="/contact"
                className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200 underline"
              >
                {t.s5.link}
              </Link>
              .
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
