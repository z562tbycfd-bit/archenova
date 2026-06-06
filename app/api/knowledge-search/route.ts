import { searchKnowledge } from "@/lib/knowledgeSearch";

export async function POST(req: Request) {
  const { query } = await req.json();

  const data = [
    {
      type: "Research",
      title: "Fusion Infrastructure",
      text: "Fusion increases strategic autonomy.",
      url: "/research",
    },
    {
      type: "Crossing",
      title: "Physical AI",
      text: "Physical AI is entering deployment phase.",
      url: "/crossings",
    },
  ];

  const results =
    searchKnowledge(query, data);

  return Response.json({
    results,
  });
}