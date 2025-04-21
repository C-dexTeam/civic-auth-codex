// ** Reac Impors
import { createContext, useEffect, useState } from 'react'
// ** Next Import
import { useRouter } from 'next/router'
// ** Axios
import authConfig from '@/configs/auth'
import axios from 'axios'
import { showToast } from '@/utils/showToast'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { SigninMessage } from '@/layout/auth/Wallet/SignInMessage'
import { binary_to_base58 } from 'base58-js'

// ** Defaults
const defaultProvider = {
  user: {
    username: "user",
    email: null,
    role: "public",
    publicKey: null,
  },
  loading: true,
  walletConnected: false,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  refreshAuth: () => Promise.resolve(),
}

const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)
  const [walletConnected, setWalletConnected] = useState(defaultProvider.walletConnected)

  // ** Hooks
  const router = useRouter()

  // ** Wallet
  const wallet = useWallet();
  const walletModal = useWalletModal();

  const createSessionData = (data) => {
    const userData = {
      username: data?.username || defaultProvider.user.username,
      email: data?.email || defaultProvider.user.email,
      name: data?.name || defaultProvider.user.name,
      surname: data?.surname || defaultProvider.user.surname,
      role: data?.roleName || data?.role || defaultProvider.user.role,
      experience: data?.experience || defaultProvider.user.experience,
      level: data?.level || defaultProvider.user.level,
      nextLevelExperience: data?.nextLevelExperience || defaultProvider.user.nextLevelExperience,
      publicKey: data?.publicKey || defaultProvider.user.publicKey,
      streak : data?.statistic?.streak || defaultProvider.user.streak,
      compleredChapters : data?.statistic?.compleredChapters || defaultProvider.user.compleredChapters,
      compleredChapters : data?.statistic?.compleredChapters || defaultProvider.user.compleredChapters,
      completedCourses : data?.statistic?.completedCourses || defaultProvider.user.completedCourses,
      enrolledCourses : data?.statistic?.enrolledCourses || defaultProvider.user.enrolledCourses,
    }

    return userData
  }

  const createSession = (data) => {
    const userData = createSessionData(data)

    if (userData.publicKey) setWalletConnected(true)

    setUser(userData) // Set the user data to the state
    localStorage.setItem(authConfig.session, JSON.stringify(userData)) // Set the user data to the local storage
  }

  const checkSession = (realData = null) => { // returns boolean
    const session = localStorage.getItem(authConfig.session)

    if (!session) return false

    if (realData) {
      const sessionData = JSON.parse(session)
      const realDataFormatted = createSessionData(realData)

      const isEqual = Object.entries(sessionData).every(([key, value]) => realDataFormatted[key] === value);

      if (!isEqual) return false;
    }

    return true
  }

  const restoreStorage = () => {
    setLoading(false)
    setWalletConnected(false)
    setUser(defaultProvider.user)
    localStorage.setItem(authConfig.session, JSON.stringify(defaultProvider.user))
  }

  const walletConnection = () => {
    console.log("wallet connected", user);

    if (wallet.connected && !user?.publicKey) {
      if (user?.role != "public")
        handleConnectWallet();
      else
        handleSignIn();
    }
  }

  /** Handle User Login Function
   * 
   * @param {String} username
   * @param {String} password
   */
  const handleLogin = async (data) => {
    // ** Set loading to true
    setLoading(true)

    // Send a POST request to the API
    axios.post(authConfig.login, {
      username: data.username || null,
      password: data.password || null,
    })
      .then(response => {
        // ** If the status code is 200, It means the login is successful
        if (response.data?.statusCode === 200) {
          // ** Send a success message to the user
          showToast("dismiss") // Dismiss the previous toast if it exists
          showToast("success", response.data?.message) // Show the success message

          createSession(response.data?.data) // Create a session for the user
          setLoading(false) // Set loading to false

          router.push("/") // Redirect the user to the home page
        } else {
          // ** If the status code is not 200, It means the login is not successful
          // ** Send an error message to the user
          showToast("dismiss") // Dismiss the previous toast if it exists
          showToast("error", response.data?.message) // Show the error message

          restoreStorage() // Delete the user data
        }

      })
      .catch(error => {
        // ** If an error occurs, Send an error message to the user
        showToast("dismiss") // Dismiss the previous toast if it exists
        showToast("error", error.response.data.message) // Show the error message
        console.error(error) // Log the error to the console
        restoreStorage() // Delete the user data
      })
  }

  const walletSignMessage = async (message) => {
    message = message || `Sign in to ${window.location.host}`;

    // if wallet is not connected then show wallet modal
    if (!wallet.connected) walletModal.setVisible(true)

    // if wallet public key or signMessage is not available then return
    if (!wallet.publicKey || !wallet.signMessage) return;

    const pKey = localStorage.getItem(authConfig.publicKey) || null;
    // if user already logged in do not then return 
    if (user?.publicKey && pKey) return;

    try {
      // create a new SigninMessage object
      const signMessage = new SigninMessage({
        domain: window.location.host,
        publicKey: wallet.publicKey.toBase58(),
        statement: message,
      });

      const data = new TextEncoder().encode(signMessage.prepare()); // encode the message
      const signature = await wallet?.signMessage(data); // sign the message
      const serializedSignature = binary_to_base58(signature); // convert the signature to base58

      return {
        message: signMessage.statement, // message statement in plain text
        publicKeyBase58: wallet.publicKey, // public key in base58
        signatureBase58: serializedSignature, // signature in base58
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * 
   * @param {String} message
   * @param {String} publicKeyBase58
   * @param {String} signatureBase58
   */
  const walletLogin = async (data) => {
    try {
      const response = await axios({
        url: authConfig.wallet,
        method: "POST",
        data: data,
      });
      if (response.status === 200) {
        const user = response?.data?.data;

        createSession(user);

        showToast("dismiss");
        showToast("success", "Logged in successfully");
      } else {
        showToast("dismiss");
        showToast("error", response.data.message);
      }
    } catch (error) {
      wallet.disconnect();
      restoreStorage();
      showToast("dismiss");
      showToast("error", "Something went wrong");
    }
  };

  /**
   * 
   * @param {String} message
   * @param {String} publicKeyBase58
   * @param {String} signatureBase58
   */
  const walletConnect = async (data) => {
    try {
      const response = await axios({
        url: authConfig.walletConnect,
        method: "POST",
        data: data,
      });
      if (response.status === 200) {
        refreshAuth();

        showToast("dismiss");
        showToast("success", "Wallet connected successfully");
      } else {
        showToast("dismiss");
        showToast("error", response.data.message);
      }
    } catch (error) {
      wallet.disconnect();
      restoreStorage();
      showToast("dismiss");
      showToast("error", "Something went wrong");
    }
  };

  const handleSignIn = async () => {
    const signMessage = await walletSignMessage();

    if (!signMessage) return;

    walletLogin(signMessage);
  }

  const handleConnectWallet = async () => {
    if (!wallet.connected) walletModal.setVisible(true)

    if (!wallet.publicKey) return;

    const signMessage = await walletSignMessage();

    if (!signMessage) return;

    walletConnect(signMessage);
  }

  //** Handle User Logout Function
  const handleLogout = () => {
    // ** Send a POST request to the API
    axios.post(authConfig.logout)
      .then(response => {
        // ** If the status code is 200, It means the logout is successful
        if (response.data?.statusCode === 200) {
          // ** Send a success message to the user
          showToast("dismiss") // Dismiss the previous toast if it exists
          showToast("success", response.data?.message) // Show the success message

          restoreStorage() // Delete the user data
          router.push("/") // Redirect the user to the login page
        } else {
          // ** If the status code is not 200, It means the logout is not successful
          // ** Send an error message to the user
          showToast("dismiss") // Dismiss the previous toast if it exists
          showToast("error", response.data?.message) // Show the error message

          restoreStorage() // Delete the user data
          router.push("/") // Redirect the user to the login page
        }
      })
      .catch(error => {
        // ** If an error occurs, Send an error message to the user
        showToast("dismiss") // Dismiss the previous toast if it exists
        showToast("error", "An error occurred. Please try again") // Show the error message

        restoreStorage() // Delete the user data
        router.push("/") // Redirect the user to the login page
      })
  }

  /** Handle User Register Function
   * @param {String} confirmPassword
   * @param {String} email
   * @param {String} username
   * @param {String} password
   */
  const handleRegister = async (data) => {
    // ** Set loading to true
    setLoading(true)

    // Send a POST request to the API
    axios.post(authConfig.register, {
      username: data?.username || null,
      email: data?.email || null,
      password: data?.password || null,
      ConfirmPassword: data?.confirmPassword || null,
    })
      .then(response => {
        // ** If the status code is 200, It means the registration is successful
        if (response.data?.statusCode === 200) {
          // ** Send a success message to the user
          showToast("dismiss") // Dismiss the previous toast if it exists
          showToast("success", response.data?.message) // Show the success message

          router.push("/login") // Redirect the user to the login page

          setLoading(false) // Set loading to false
        } else {
          // ** If the status code is not 200, It means the registration is not successful
          // ** Send an error message to the user
          showToast("dismiss") // Dismiss the previous toast if it exists
          showToast("error", response.data?.message) // Show the error message

          restoreStorage() // Delete the user data
        }
      })
      .catch(error => {
        // ** If an error occurs, Send an error message to the user
        showToast("dismiss") // Dismiss the previous toast if it exists
        showToast("error", "An error occurred. Please try again") // Show the error message
        console.error(error) // Log the error to the console
        restoreStorage() // Delete the user data
      })

  }

  // ** Refresh User's Auth Function
  const refreshAuth = async () => {
    setLoading(true) // ** Set loading to true

    // Send a GET request to the API
    await axios.get(authConfig.refresh)
      .then(response => {
        // ** If the status code is 200, It means the user is authenticated
        if (response.data?.statusCode === 200) {
          createSession(response.data?.data) // Create a session for the user

          setLoading(false) // Set loading to false
        } else {
          // ** If the status code is not 200, It means the user is not authenticated

          showToast("dismiss") // Dismiss the previous toast if it exists
          showToast("error", response.data?.message) // Show the error message

          console.log("weqweqwewqe123213213");

          restoreStorage() // Restore the user data
        }
      })
      .catch(error => {
        console.log("sadasdasdasd12321312");
        console.error(error) // Log the error to the console
        restoreStorage() // Restore the user data
      })
  }

  useEffect(() => {
    if (!router.isReady) return;

    if (!wallet.connected)
      refreshAuth();
    else
      walletConnection()

    if (!wallet.connected && walletConnected) {
      handleLogout()
    }
  }, [router.isReady, wallet.connected]);

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    refresh: refreshAuth,
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
