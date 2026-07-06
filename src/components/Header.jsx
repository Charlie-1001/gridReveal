import styles from './Header.module.css';

function Header() {
  return (
    <header className={`${styles.header} drop-shadow`}>
      <h1>Grid Reveal</h1>
    </header>
  )
}

export default Header;