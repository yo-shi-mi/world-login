import Layout from "../components/layout"
import { useState, useEffect } from 'react'

export default function SuccessPage() {
    const [verificationData, setVerificationData] = useState<any>(null)

    useEffect(() => {
        // 從 localStorage 取得驗證結果
        const savedData = localStorage.getItem('verificationResult')
        if (savedData) {
            setVerificationData(JSON.parse(savedData))
        }
    }, [])

    return (
        <Layout>
            <h1>🎉 驗證成功！</h1>
            <p>您已經成功通過 World ID 驗證。</p>

            {verificationData && (
                <div style={{ marginTop: '2rem' }}>
                    <h2>驗證詳細資料：</h2>

                    <div style={{
                        backgroundColor: '#f8f9fa',
                        padding: '1rem',
                        borderRadius: '8px',
                        marginBottom: '1rem'
                    }}>
                        <h3>API 回應：</h3>
                        <pre style={{
                            background: '#e9ecef',
                            padding: '1rem',
                            borderRadius: '4px',
                            overflow: 'auto',
                            fontSize: '14px'
                        }}>
                            {JSON.stringify(verificationData.apiResponse, null, 2)}
                        </pre>
                    </div>

                    <div style={{
                        backgroundColor: '#f8f9fa',
                        padding: '1rem',
                        borderRadius: '8px',
                        marginBottom: '1rem'
                    }}>
                        <h3>驗證證明：</h3>
                        <pre style={{
                            background: '#e9ecef',
                            padding: '1rem',
                            borderRadius: '4px',
                            overflow: 'auto',
                            fontSize: '14px'
                        }}>
                            {JSON.stringify(verificationData.proof, null, 2)}
                        </pre>
                    </div>

                    <div style={{
                        backgroundColor: '#f8f9fa',
                        padding: '1rem',
                        borderRadius: '8px'
                    }}>
                        <h3>驗證時間：</h3>
                        <p>{new Date(verificationData.timestamp).toLocaleString()}</p>
                    </div>
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
                        cursor: 'pointer'
                    }}
                >
                    返回首頁
                </button>
            </div>
        </Layout>
    )
}