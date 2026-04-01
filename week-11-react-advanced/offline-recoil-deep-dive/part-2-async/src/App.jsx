import { RecoilRoot, useRecoilValue } from "recoil";
import {
  notificationsAtom,
  notificationsAtomAsync,
  totalNotificationSelector,
  totalNotificationSelectorAsync,
} from "./store/atoms/navAtomsAsync";

// Recoil Linkedin Navbar
function App() {
  return (
    <RecoilRoot>
      <Navbar />
    </RecoilRoot>
  );
}
function Navbar() {
  // const data = useRecoilValue(notificationsAtom);
  // const totalNotificationCount = useRecoilValue(totalNotificationSelector);
  const data = useRecoilValue(notificationsAtomAsync);
  const totalNotificationCount = useRecoilValue(totalNotificationSelectorAsync);
  return (
    <>
      <button>Home</button>
      <button>
        My Network ({data.networkCount >= 100 ? "99+" : data.networkCount})
      </button>
      <button>Jobs ({data.jobsCount >= 100 ? "99+" : data.jobsCount})</button>
      <button>
        Messages ({data.messagesCount >= 100 ? "99+" : data.messagesCount})
      </button>
      <button>
        Notifications (
        {data.notificationCount >= 100 ? "99+" : data.notificationCount})
      </button>
      <button>Me ({totalNotificationCount})</button>
    </>
  );
}

export default App;
