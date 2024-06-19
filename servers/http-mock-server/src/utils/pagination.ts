export const createPaginate =
  <T, C>(arr: T[], getCursor: (item: T) => C) =>
  (limit: number, cursor?: C) => {
    const start = cursor
      ? arr.findIndex((item) => getCursor(item) === cursor)
      : 0;

    const end = start + limit;
    return {
      result: arr.slice(start, end),
      next: arr[end] ? getCursor(arr[end]) : null,
      hasNextPage: arr.length > end,
      total: arr.length,
    };
  };
