"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchJobs, Job } from "@/app/lib/fetchJobs";
import { categories, categoryKeywords } from "@/app/lib/categories";
import Link from "next/link";

export default function HomePage() {
  const { data: jobs, isLoading, isError } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  if (isLoading) return <div className="text-center py-20">Loading jobs...</div>;
  if (isError) return <div className="text-center text-red-500">Failed to load jobs</div>;

  const categoryCounts = categories.map((cat) => {
    const keywords = categoryKeywords[cat.name] || [];
    const count = jobs?.filter((job) => {
      const text = `${job.title} ${job.company}`.toLowerCase();
      return keywords.some((k) => text.includes(k));
    }).length;
    return { ...cat, count };
  });

  return (
    <main className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Find Your Perfect Career Path 🌍
      </h1>

      {/* Categories */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categoryCounts.map((cat) => (
          <Link
            href={`/jobs/${cat.name.toLowerCase()}`}
            key={cat.id}
            className="bg-white shadow-sm rounded-2xl p-6 hover:shadow-md transition"
          >
            <div className="text-4xl mb-3">{cat.icon}</div>
            <h3 className="font-semibold text-lg">{cat.name}</h3>
            <p className="text-gray-500">{cat.count ?? 0} jobs</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
