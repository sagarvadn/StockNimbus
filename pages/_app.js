import Footer from '@/components/Footer'
import '@/styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import LoadingBar from 'react-top-loading-bar'

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState({ value: null })
  const [key, setKey] = useState(0)
  const router = useRouter()
  const [progress, setProgress] = useState(0)

  const logout = ()=>{
    document.getElementById('user-dropdown').classList.toggle("hidden")
    localStorage.removeItem('Stock_Nimbus_Token')
    setUser({value:null})
    window.location.reload();
  }

  useEffect(()=>{
    router.events.on('routeChangeStart', ()=>{
      setProgress(10)
    })
    router.events.on('routeChangeComplete', ()=>{
      setProgress(100)
    })
    const token = localStorage.Stock_Nimbus_Token
    if(token){
      setUser({value : token})
      setKey(Math.random())
    }
  },[router.query])

  return (
  <>
  <LoadingBar
        color='#2563eb'
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
  <Header logout={logout} user={user} key={key} />
  <main className="flex min-h-screen flex-col items-center justify-between p-24">
  <Component {...pageProps} />
  </main>
  <Footer />
  </>
  )
}
