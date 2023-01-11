import { Session } from 'next-auth';
import { signIn, signOut, useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

export default function TopArea() {
  const session = useSession() as any;
  
  useEffect(() => {
    console.log(session);
  }, [session])
  
  if (session.status === 'unauthenticated') {
    return(
      <button onClick={() => signIn()}>Sign In</button>
    )
  }

  return (
    <button onClick={() => signOut()}>Sign Out</button>
  )
}
