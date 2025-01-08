import Link from 'next/link';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>MyApp</div>
      <div style={styles.links}>
        <Link href="/" style={styles.link}>
          Home
        </Link>
        <Link href="/profile" style={styles.link}>
          Profile
        </Link>
        <Link href="/preferences" style={styles.link}>
          Search
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
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#2c3e50', // Matches the dark text theme
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
// logo, profile, search, signout, 