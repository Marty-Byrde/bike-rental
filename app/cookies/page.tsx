import CookieBanner from '@/app/(components)/Shared/CookieBanner'
import Link from 'next/link'

export default async function CookiesPage() {
  return (
    <Link href='/'>
      <CookieBanner permission={false} />
    </Link>
  )
}
