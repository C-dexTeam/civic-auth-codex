import HomePage from "@/views/home"

const Home = () => {
  return <HomePage />
}

Home.acl = {
  action: 'read',
  permission: 'home'
}
export default Home
