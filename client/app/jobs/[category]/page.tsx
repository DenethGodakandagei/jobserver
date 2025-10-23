"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchJobs } from "@/app/lib/fetchJobs";
import { categoryKeywords } from "@/app/lib/categories";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const { data: jobs, isLoading, isError } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  if (isLoading) return <div className="text-center py-20">Loading jobs...</div>;
  if (isError) return <div className="text-center text-red-500">Error loading jobs</div>;

  const keywords = categoryKeywords[capitalize(category)] || [];
  const filteredJobs = jobs?.filter((job) => {
    const text = `${job.title} ${job.company}`.toLowerCase();
    return keywords.some((k) => text.includes(k));
  });

  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-2xl font-bold mb-6 capitalize">{category} Jobs</h1>

      {filteredJobs?.length ? (
        <ul className="space-y-4">
          {filteredJobs.map((job, idx) => (
            <li key={idx} className="p-4 border rounded-lg bg-white shadow-sm">
              <h3 className="font-semibold text-lg">{job.title}</h3>
              <p className="text-gray-600">{job.company}</p>
              <a
                href={job.link}
                target="_blank"
                className="text-blue-600 underline mt-2 inline-block"
              >
                View Job →
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No jobs found in this category.</p>
      )}
    </main>
  );
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
