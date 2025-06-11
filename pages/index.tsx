import Layout from "../components/layout"
import { IDKitWidget, VerificationLevel, ISuccessResult } from '@worldcoin/idkit'

export default function IndexPage() {
  // handleVerify 函數 - 按照官方文檔的實作
  const handleVerify = async (proof: ISuccessResult) => {
    const res = await fetch("/api/verify", { // route to your backend will depend on implementation
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proof),
    })
    if (!res.ok) {
      throw new Error("Verification failed."); // IDKit will display the error message to the user in the modal
    }
  };

  // onSuccess 函數 - 按照官方文檔的實作
  const onSuccess = () => {
    // This is where you should perform any actions after the modal is closed
    // Such as redirecting the user to a new page
    window.location.href = "/success";
  };


  return (
    <Layout>
      <h1>NextAuth.js + World ID Example</h1>
      <p>
        This is an example site to demonstrate how to use{" "}
        <a href="https://next-auth.js.org">NextAuth.js</a> with {" "}
        <a href="https://worldcoin.org/world-id">World ID</a> for authentication.
      </p>

      <div style={{ margin: '2rem 0', textAlign: 'center' }}>
        <h2>World ID 驗證</h2>

        <IDKitWidget
          app_id={process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`} // obtained from the Developer Portal
          action={process.env.NEXT_PUBLIC_ACTION_ID || "login"} // obtained from the Developer Portal
          onSuccess={onSuccess} // callback when the modal is closed
          handleVerify={handleVerify} // callback when the proof is received
          verification_level={VerificationLevel.Orb}
        >
          {({ open }) =>
            // This is the button that will open the IDKit modal
            <button
              onClick={open}
              style={{
                background: 'linear-gradient(45deg, #000, #333)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Verify with World ID
            </button>
          }
        </IDKitWidget>
      </div>
    </Layout>
  )
}
