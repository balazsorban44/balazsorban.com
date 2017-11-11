import React from 'react'
import linkedin from '../../img/icons/linkedin.svg'
import mail from '../../img/icons/mail.svg'
import phone from '../../img/icons/phone.svg'
import {Link} from '../../utils/'
const Footer = () => (
  <footer>
    <ul className="social">
      <li>
        <Link href="https://linkedin.com/in/balazsorban44">
          <img width={24} src={linkedin} alt=""/>
        </Link>
      </li>
      <li>
        <a href="mailto:info@balazsorban.com">
          <img width={24} src={mail} alt=""/>
        </a>
      </li>
      <li>
        <a href="tel:+4795460627">
          <img width={24} src={phone} alt=""/>
        </a>
      </li>
    </ul>
  </footer>
)

export default Footer
