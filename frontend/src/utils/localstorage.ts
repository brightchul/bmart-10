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
  const searchHistory: string | undefined = localStorage.searchHistory;

  if (!searchHistory) {
    return [];
  }

  const beforeHistory: {} | { history: string[] } = JSON.parse(searchHistory);

  if (!("history" in beforeHistory)) {
    return [];
  }

  return beforeHistory.history;
}

export function deleteHistoryByIndex(index: number): string[] {
  const searchHistory: string = localStorage.searchHistory;

  const historyList = {
    history: new Array<string>(),
  };

  if (searchHistory) {
    const beforeHistory: { history: string[] } = JSON.parse(searchHistory);
    historyList.history = beforeHistory.history;
  } else {
    return [];
  }

  historyList.history.splice(index, 1);
  localStorage.searchHistory = JSON.stringify(historyList);

  return historyList.history;
}
