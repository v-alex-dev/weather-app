export function validCity(city: string): boolean {
  const elements = document.querySelectorAll('h2');
  for (const element of elements) {
    if (element.textContent === city) {
      return true; // City already exists
    }
  }
  return false; // City doesn't exist
}