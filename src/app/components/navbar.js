import Link from 'next/link';
import {useState, useEffect} from 'react';
import { auth, db } from '../controllers/firebase'
import { doc, getDoc } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import Logo from '../../../public/trees.svg';
const Navbar = () => {
  const [userloc, setUserloc] = useState(null);
  async function fetchLoc() {
    if (!auth.currentUser?.uid) {
      alert('not signed in');
      return;
    }
    try {
      const docRef = await getDoc(doc(db, "users", auth.currentUser.uid));
      if (docRef.exists()) {
        const user = docRef.data();
        setUserloc(user.location);
      } else {
        return;
      }

    } catch (error) {
      console.log(error);
    }
      
  }

  async function logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      alert("sign-out successful");
      // window.location.href = '/login';
    }).catch((error) => {
      console.error(error);
    });
  }
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User signed in:", user);
        fetchLoc(); // Fetch location after user is confirmed
      } else {
        console.log("No user signed in.");
      }
    });

    // Cleanup the auth listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <nav style={styles.navbar}>
      <div>
      <Link href='/' style={styles.link}>
      
      {/* <a href="/" style={styles.link}> */}
      <Logo style={styles.logo} />
      {/* </a> */}
      </Link>
      
      </div>

      <div style={styles.links}>
      <a href="/profile" style={styles.link}>
          Profile
        </a>  
        {userloc && <a href={`/search/${userloc.lat}/${userloc.lng}`} style={styles.link}>
          Search
        </a> }
        <Link href="/" style={styles.link} onClick={logout}>
          Logout
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: 'transparent', // Makes the navbar background transparent
    color: '#2c3e50', // Adjusted to a darker shade for better readability
    position: 'absolute', // Ensures the navbar is overlaid at the top
    top: 0,
    left: 0,
    width: '100%', // Stretches across the screen
    zIndex: 1000, // Keeps it on top of all content
  },
  logo: {
    // fontSize: '1.5rem',
    // fontWeight: 'bold',
    // color: '#2c3e50', // Matches the dark text theme
    width: '48px',
    height :'48px',


  },
  links: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    textDecoration: 'none',
    color: '#2c3e50', // Matches the text theme
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'color 0.3s',
  },
  linkHover: {
    color: '#1abc9c', // Optional hover color
  },
};

export default Navbar;