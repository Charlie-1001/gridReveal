import styles from './Footer.module.css';

function Footer() {
  return(
    <footer id='footer' className={`${styles.footer} up-shadow`}>
      {/* copyright part */}
      <p>©{new Date().getFullYear()} Grid Reveal. All rights reserved.</p>

      <div>
        <h3>Image Usage Notice</h3>
        <p>
          "Some images used in educational activities may belong to their respective copyright owners.
          They are used for educational purposes only. We respect intellectual property rights and will
          remove or replace any content upon a valid copyright request."
        </p>
      </div>

      {/* contact part */}
      <div>
        <h3>Contact</h3>
        <p>
          Email: <a href='https://mail.google.com/mail/?view=cm&fs=1&to=piscesmai1001@gmail.com&su=EduPlayground Inquiry'>
          piscesmai1001@gmail.com</a>
        </p>
        <p>
          Viber: <a href="viber://chat?number=%2B959421247184">Chat on Viber</a>
        </p>
      </div>

      {/* Developer */}
      <p><i>Developed by Charlie Sparks</i></p>
    </footer>
  )
}

export default Footer;
