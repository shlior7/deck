import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const AblyChatComponent = dynamic(() => import('../../components/AblyChatComponent'), { ssr: false });

export default function Chat() {
  const [code, setCode] = useState('');
  const router = useRouter()
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (!router.isReady)
      return;
    const deckCode = router.query.code as string
    setCode(deckCode);
  }, [router.isReady])

  return (<div className="container">
    <Head>
    <title>Realtime Chat App with Ably, NextJS and Vercel</title>
    <link rel="icon" href="https://static.ably.dev/motif-red.svg?nextjs-vercel" type="image/svg+xml" />
  </Head>

  <main>
    <h1 className="title">Next.js Chat Demo</h1>
    <AblyChatComponent />
    <h2>{code}</h2>
  </main>
  </div>)
}
