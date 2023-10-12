
// Save data in localstorage
export const saveLastSearch = (data: any    ) => {
    localStorage.setItem('lastSearch', JSON.stringify(data));
};

// Upload data in localstorage.
export const loadLastSearch = (): any | null => {
    const savedData = localStorage.getItem('lastSearch');
    return savedData ? JSON.parse(savedData) : null;
};

export const resetLastSearch = (): any => {
  localStorage.clear();
  location.reload();
}