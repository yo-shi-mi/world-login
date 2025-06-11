import Layout from "../components/layout"
import { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"

export default function AuthSuccessPage() {
    const { data: session } = useSession()
    const [signInData, setSignInData] = useState<any>(null)

    useEffect(() => {
        // 從 localStorage 取得登入結果
        const savedData = localStorage.getItem('nextAuthSignInResult')
        if (savedData) {
            setSignInData(JSON.parse(savedData))
        }
    }, [])

    return (
        <Layout>
            <h1>🎉 World ID 登入成功！</h1>
            <p>您已經成功使用 World ID 登入。</p>

            {session && (
                <div style={{
                    backgroundColor: '#d4edda',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    border: '1px solid #c3e6cb'
                }}>
                    <h3>當前 Session 資料：</h3>
                    <pre style={{
                        background: '#f8f9fa',
                        padding: '1rem',
                        borderRadius: '4px',
                        overflow: 'auto',
                        fontSize: '14px'
                    }}>
                        {JSON.stringify(session, null, 2)}
                    </pre>
                </div>
            )}

            {signInData && (
                <div style={{
                    backgroundColor: '#f8f9fa',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '1rem'
                }}>
                    <h3>NextAuth 登入回應：</h3>
                    <pre style={{
                        background: '#e9ecef',
                        padding: '1rem',
                        borderRadius: '4px',
                        overflow: 'auto',
                        fontSize: '14px'
                    }}>
                        {JSON.stringify(signInData.result, null, 2)}
                    </pre>
                    <p style={{ marginTop: '1rem' }}>
                        <strong>登入時間：</strong> {new Date(signInData.timestamp).toLocaleString()}
                    </p>
                </div>
            )}

            <div style={{ marginTop: '2rem' }}>
                <button
                    onClick={() => window.location.href = '/'}
                    style={{
                        background: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginRight: '1rem'
                    }}
                >
                    返回首頁
                </button>

                <button
                    onClick={() => window.location.href = '/me'}
                    style={{
                        background: '#28a745',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    查看完整用戶資料
                </button>
            </div>
        </Layout>
    )
} 