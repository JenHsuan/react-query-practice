export const articlesKeys = {
  all: ['articles'] as const,
  detail: (id: Number) => [...articlesKeys.all, id] as const, // ['todos', 'list']
};