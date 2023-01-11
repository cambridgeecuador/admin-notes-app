import { useSession } from 'next-auth/react'
import React from 'react'

export default function Protected() {
  const session = useSession({ required: true })
  console.log(session);

  return (
    <div>protected</div>
  )
}
