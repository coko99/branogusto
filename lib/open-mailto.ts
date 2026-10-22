export function openMailto(href: string) {
  const link = document.createElement("a")
  link.href = href
  link.click()
}
