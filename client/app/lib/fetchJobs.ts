export interface Job {
  title: string;
  company: string;
  link: string;
}

export const fetchJobs = async (): Promise<Job[]> => {
  const res = await fetch("http://localhost:5001/api/jobs");
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
};
