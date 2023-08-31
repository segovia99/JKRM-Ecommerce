import BannersEdit from '@/components/admin/BannersEdit'
import Layout from '@/components/admin/Layout'
import { useAdmin } from '@/hooks/useAdmin'
import { useEffect } from 'react'

export default function Banners () {
  const { setPageTitle } = useAdmin()

  useEffect(() => {
    setPageTitle('Banners')
  }, [])

  return (
    <Layout>
      <BannersEdit />
    </Layout>
  )
}
