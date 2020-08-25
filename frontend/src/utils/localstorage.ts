export function setHistory(query: string): void {
  const searchHistory: string = localStorage.searchHistory;

  const historyList = {
    history: new Array<string>(),
  };

  if (searchHistory) {
    const beforeHistory: { history: string[] } = JSON.parse(searchHistory);
    historyList.history = beforeHistory.history;
  }

  historyList.history.push(query);
  if (historyList.history.length > 5) {
    historyList.history.splice(0, 1);
  }

  localStorage.searchHistory = JSON.stringify(historyList);
}

export function getHistory(): string[] {
  const searchHistory: string = localStorage.searchHistory;

  if (!searchHistory) {
    return [];
  }

  const beforeHistory: { history: string[] } = JSON.parse(searchHistory);

  return beforeHistory.history;
}
