import "./navigationmenu.scss";
import { Link } from "react-router-dom";

const NavigationMenu = () => (
  <nav className="navigationmenu">
    <ul>
      <li><Link to="/contact">Contact Us</Link></li>
      <li><Link to="/profile">Check your reservation</Link></li>
      <li><Link to="/restaurant-menu">Menu</Link></li>
      <li><Link to="/reservation">Book a table</Link></li>
      <li><Link to="/event">Events</Link></li>
    </ul>
  </nav>
);

export default NavigationMenu;
