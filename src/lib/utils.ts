function limitCheckbox(name: string, count: number) {
  const checkboxes = document.getElementsByName(name);
  const checked = [...checkboxes].filter(
    (c: HTMLElement) => (c as HTMLInputElement).checked
  );
  if (checked.length > count) {
    return true;
  }
  return false;
}
