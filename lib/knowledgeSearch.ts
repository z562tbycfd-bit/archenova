export type KnowledgeItem = {
  type: string;
  title: string;
  text: string;
  url: string;
};

export function searchKnowledge(
  query: string,
  items: KnowledgeItem[]
) {
  const q = query.toLowerCase();

  return items.filter((item) =>
    (
      item.title +
      " " +
      item.text
    )
      .toLowerCase()
      .includes(q)
  );
}