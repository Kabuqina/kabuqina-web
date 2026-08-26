export type SiteLocale = 'zh' | 'en'

export function getInitialLocale(): SiteLocale {
	return new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'zh'
}
export function withLocale(href: string, locale: SiteLocale): string {
	if (href.startsWith('http') || href === '#') return href
	const [path, hash] = href.split('#')
	const cleanPath = path.replace(/[?&]lang=en/, '')
	const localizedPath = locale === 'en' ? `${cleanPath}${cleanPath.includes('?') ? '&' : '?'}lang=en` : cleanPath
	return hash ? `${localizedPath}#${hash}` : localizedPath
}
