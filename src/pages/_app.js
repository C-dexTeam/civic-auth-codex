// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'
// ** Store Imports
import { store } from '@/store'
import { Provider } from 'react-redux'
// ** Loader Import
import NProgress from 'nprogress'
// ** Config Imports
import { defaultACLObj } from '@/configs/acl'
import themeConfig from '@/configs/themeConfig'
// ** Third Party Import
import { Toaster } from 'react-hot-toast'
// ** Spinner Import
import Spinner from '@/components/spinner'
// ** Contexts
import { AuthProvider } from '@/context/AuthContext'
// ** Styled Components
import ReactHotToast from '@/components/react-hot-toast'
// ** Component Imports
import Layout from '@/layout/Layout'
import GuestGuard from '@/layout/auth/GuestGuard'
import AuthGuard from '@/layout/auth/AuthGuard'
// ** Global css styles
import '../styles/main.css'
import "keen-slider/keen-slider.min.css"

// ** Theme Components
import ThemeComponent from '@/layout/ThemeComponent'
import WindowWrapper from '@/components/window-wrapper'
import AclGuard from '@/layout/auth/AclGuard'
import { Wallet } from '@/layout/auth/Wallet'
import { useEffect } from 'react'
import AdminLayout from '@/layout/admin/AdminLayout'

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

const Guard = ({ children, authGuard, guestGuard }) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>
  } else {
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
  }
}

// ** Configure JSS & ClassName
const App = props => {
  const { Component, pageProps } = props

  // Variables
  const getLayout = Component.admin ? (page => <AdminLayout>{page}</AdminLayout>) : Component.getLayout ?? (page => <Layout>{page}</Layout>)
  const authGuard = Component.authGuard ?? true
  const guestGuard = Component.guestGuard ?? false
  const aclAbilities = Component.acl ?? defaultACLObj

  useEffect(() => {
    const container = document.querySelectorAll(".stars");
    const n = 64; //Amount of stars

    container.forEach((item) => {
      for (let i = n; i > 0; i--) {
        //Rng stuff
        let pos1 = Math.random() * 100 + "%";
        let pos2 = Math.random() * 100 + "%";
        let size = Math.random() * 3;

        let star = document.createElement("star");

        //Individual Properties
        star.classList.add("star");
        star.style.height = size + "px";
        star.style.width = size + "px";
        star.style.top = pos1;
        star.style.right = pos2;
        star.style.boxShadow = `0 0 ${size + 2 + "px"} 1px rgba(255,255,255,0.2)`;

        // sarı yıldızlar
        let randn = Math.random() * 100
        if (randn > 56 && randn < 64) {
          star.classList.add("yellow");
        } else if (randn > 64 && randn < 72) {
          star.classList.add("orange");
        } else if (randn > 72 && randn < 80) {
          star.classList.add("red");
        } else if (randn > 80 && randn < 100) {
        }

        let randn2 = Math.random() * 100
        // yanıp sönme efekti ver
        if (randn2 > 16 && randn2 < 32) {
          let duration = Math.random() * 5 + 2;
          star.style.animation = `twinkle ${duration}s infinite`;
        }

        item.append(star);
      }
    });

  }, [])

  return (
    <Provider store={store}>
      <Head>
        <title>{`${themeConfig.templateName}`}</title>
        <meta name='description' content={`${themeConfig.templateName}`} />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>

      <Wallet>
        <AuthProvider>
          <ThemeComponent>
            <WindowWrapper>
              <Guard authGuard={authGuard} guestGuard={guestGuard}>
                <AclGuard aclAbilities={aclAbilities} guestGuard={guestGuard}>
                  {getLayout(<Component {...pageProps} />)}
                </AclGuard>
              </Guard>
            </WindowWrapper>

            <ReactHotToast>
              <Toaster position={themeConfig.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
            </ReactHotToast>
          </ThemeComponent>
        </AuthProvider>
      </Wallet>
    </Provider>
  )
}

export default App
