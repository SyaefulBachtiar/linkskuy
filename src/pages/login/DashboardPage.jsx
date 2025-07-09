import Navbar from '../../components/Navbar';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useEffect, useState } from 'react';

export default function DashboardPage({ children }) {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    })
    return () => unsubcribe();
  }, []);

    return (
      <>
        <div className="">
          {user && <Navbar />}
          {children}
        </div>
      </>
    );
}