import { NextSeo } from 'next-seo'

import HomeLayout from '@/components/@Layout/HomeLayout'
import Profile from '@/containers/Profile'

function ProfilePage() {
  return (
    <>
      <NextSeo title="profile" />
      <HomeLayout content={<Profile />} />
    </>
  )
}

export default ProfilePage
