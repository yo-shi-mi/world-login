import { useSession } from "next-auth/react"
import Layout from "../components/layout"

export default function AuthDetailsPage() {
    const { data: session } = useSession()

    return (
        <Layout>
            <h1>World ID 認證詳細資訊</h1>

            <div style={{ margin: '20px 0' }}>
                <h2>ID Token</h2>
                <pre style={{
                    background: '#f5f5f5',
                    padding: '15px',
                    borderRadius: '5px',
                    overflow: 'auto'
                }}>
                    {session?.id_token}
                </pre>
            </div>

            <div style={{ margin: '20px 0' }}>
                <h2>用戶資訊</h2>
                <pre style={{
                    background: '#f5f5f5',
                    padding: '15px',
                    borderRadius: '5px',
                    overflow: 'auto'
                }}>
                    {JSON.stringify(session?.profile, null, 2)}
                </pre>
            </div>

            <div style={{ margin: '20px 0' }}>
                <h3>驗證資訊</h3>
                <ul>
                    <li>Verification Level: {session?.profile?.["https://id.worldcoin.org/v1"]?.verification_level}</li>
                    <li>Credential Type: {session?.profile?.["https://id.worldcoin.org/beta"]?.credential_type}</li>
                    <li>Likely Human: {session?.profile?.["https://id.worldcoin.org/beta"]?.likely_human}</li>
                </ul>
            </div>

            <div style={{ margin: '20px 0' }}>
                <h3>基本資訊</h3>
                <ul>
                    <li>Name: {session?.profile?.name}</li>
                    <li>Given Name: {session?.profile?.given_name}</li>
                    <li>Family Name: {session?.profile?.family_name}</li>
                    <li>Email: {session?.profile?.email}</li>
                    <li>Subject (ID): {session?.profile?.sub}</li>
                </ul>
            </div>
        </Layout>
    )
} 