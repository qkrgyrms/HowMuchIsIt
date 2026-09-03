import type { MatchStatus } from "@/lib/types";

export function MatchBadge({ status, missingCount }: { status: MatchStatus; missingCount: number }) {
  if (status === "완전매치") {
    return (
      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
        완전매치
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-700">
      부족 {missingCount}개
    </span>
  );
}

export function DifficultyBadge({ difficulty }: { difficulty: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600">
      {difficulty}
    </span>
  );
}
