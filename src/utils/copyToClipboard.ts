export default function copyToClipboard(text: string) {
  return window.navigator.clipboard.writeText(text);
}
