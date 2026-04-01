import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";

// npm install react@18 react-dom@18 recoil

import {
  JobsAtom,
  messagesAtom,
  networkAtom,
  notificationAtom,
  totalNotificationSelector,
} from "./store/atoms/navAtoms";

// Recoil Linkedin Navbar
function App() {
  return (
    <RecoilRoot>
      <Navbar />
    </RecoilRoot>
  );
}

function Navbar() {
  const networkCount = useRecoilValue(networkAtom);
  const jobsCount = useRecoilValue(JobsAtom);
  const messagesCount = useRecoilValue(messagesAtom);
  const [notificationCount, setNotificationCount] =
    useRecoilState(notificationAtom);
  // Selector
  const totalNotificationCount = useRecoilValue(totalNotificationSelector);

  return (
    <>
      <div style={{ marginTop: "20px" }}>
        <button>Home</button>
        <button>
          My Network ({networkCount >= 100 ? "99+" : networkCount})
        </button>
        <button>Jobs ({jobsCount >= 100 ? "99+" : jobsCount})</button>
        <button>
          Messages ({messagesCount >= 100 ? "99+" : messagesCount})
        </button>
        <button>
          Notifications ({notificationCount >= 100 ? "99+" : notificationCount})
        </button>
        <button>Me ({totalNotificationCount})</button>

        <button onClick={() => setNotificationCount((c) => c + 1)}>
          Increase Notifications
        </button>
      </div>
    </>
  );
}

export default App;
