export const articlesKeys = {
  allArticles: ['articles'] as const,
  allAngularSites: ['angularSites'] as const,
  page: (page: Number) => [...articlesKeys.allArticles, "page", page] as const, 
  detail: (id: Number) => [...articlesKeys.allArticles, "detail", id] as const, 
};