import { useEffect, useState } from "react";

interface GithubData {
  sha: string;
  html_url: string;
  commit: {
    author: {
      date: string;
      name: string;
      email: string;
    };
    message: string;
  };
}

export default function UpdateStatus() {
  const [lastCommit, setLastCommit] = useState<GithubData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLastCommit() {
      try {
        const res = await fetch(
          `https://api.github.com/repos/anassm/anass/commits`
        );
        if (!res.ok) throw new Error("Failed to fetch commits");

        const data: GithubData[] = await res.json();

        setLastCommit(data[0]);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      }
    }

    fetchLastCommit();
  }, []);

  if (error) {
    return <>Error: {error}</>;
  }

  if (!lastCommit) {
    return <>Loading repo data...</>;
  }

  const commitDate = new Date(lastCommit.commit.author.date).toLocaleString();

  return (
    <span>
      Updated:{" "}
      <a
        href={lastCommit.html_url}
        target="_blank"
        rel="noopener noreferrer"
        title={`Last commit message: ${lastCommit.commit.message}`}
      >
        {commitDate}
      </a>
    </span>
  );
}
