export type PromotionInput = {
  source_type?: string;
  verification_status?: string;
  trust_score?: number;
  likes?: number;
};

export function getSignalPromotion(item: PromotionInput) {
  const status = item.verification_status ?? "community";
  const trust = item.trust_score ?? 0;
  const likes = item.likes ?? 0;

  if (status === "official") {
    return {
      level: "official",
      label: "Official Signal",
      description: "Approved as an official ArcheNova signal.",
    };
  }

  if (status === "verified" && trust >= 95 && likes >= 10) {
    return {
      level: "verified",
      label: "Verified Signal",
      description: "High-trust source with community validation.",
    };
  }

  if (status === "verified" || trust >= 70 || likes >= 5) {
    return {
      level: "candidate",
      label: "Candidate Signal",
      description: "Potential signal requiring continued observation.",
    };
  }

  return {
    level: "community",
    label: "Community Crossing",
    description: "Community-submitted knowledge fragment.",
  };
}