import CreatePost from './CreatePost'
import Home from './Home'
import Notifications from './Notifications'

const SidebarItems = () => {
  return (
    <>
      <Home />
      {/* Search */}
      <Notifications />
      <CreatePost />
    </>
  )
}

export default SidebarItems
