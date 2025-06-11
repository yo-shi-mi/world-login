import { useSession } from "next-auth/react"
import Layout from "../components/layout"
import { useState, useEffect } from 'react'

export default function MePage() {
  const { data: session } = useSession()
  const [signInData, setSignInData] = useState<any>(null)

  useEffect(() => {
    const savedData = localStorage.getItem('nextAuthSignInResult')
    if (savedData) {
      setSignInData(JSON.parse(savedData))
    }
  }, [])

  return (
    <Layout>
      <h1>用戶資料頁面</h1>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Session 資料：</h2>
        <pre style={{
          background: '#f8f9fa',
          padding: '1rem',
          borderRadius: '4px',
          overflow: 'auto'
        }}>
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>

      {signInData && (
        <div>
          <h2>上次登入回應：</h2>
          <pre style={{
            background: '#e7f3ff',
            padding: '1rem',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
            {JSON.stringify(signInData, null, 2)}
          </pre>
        </div>
      )}
    </Layout>
  )
}
