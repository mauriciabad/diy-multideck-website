import { SITE_URL } from '../config'

export function absoluteUrl(url: string) {
  return new URL(url, SITE_URL).toString()
}

export function absoluteUrlOptional(url: string | undefined) {
  return url ? absoluteUrl(url) : undefined
}
