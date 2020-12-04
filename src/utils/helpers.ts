/** Copy given string to clipboard. Returns true if successful, false if failed. */
export function copyToClipboard(text: string): boolean {
  const textArea = document.createElement("textarea");
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
  } catch (error) {
    console.error("Failed to copy text:", error);
    return false;
  }
  document.body.removeChild(textArea);
  return true;
}

export function ellipsis(text: string, startLength: number, endLength: number): string {
  if (startLength + endLength + 2 >= text.length) {
    // +2 because there's reason to ellide something shorter than "..."
    return text;
  }
  return text.substr(0, startLength) + "..." + text.substr(text.length - endLength, text.length);
}

/** Finds where "0x" hex value starts and takes start length from there. */
export function hexEllipsis(text: string, startLength = 4, endLength = 4): string {
  const addressIndex = text.indexOf("0x");
  return ellipsis(text, (addressIndex === -1 ? 0 : addressIndex + 2) + startLength, endLength);
}
