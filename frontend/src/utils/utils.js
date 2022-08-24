export function renderLoading(isLoading, submitElement) {
  if (isLoading) {
    submitElement.textContent = 'Сохранение...';
  } else {
    submitElement.textContent = 'Сохранить';
  }
}