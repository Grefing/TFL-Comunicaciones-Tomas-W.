import {
  AiOutlineInstagram,
  AiOutlineGithub,
  AiOutlineWhatsApp,
  AiOutlineLinkedin,
  AiOutlineMail,
  AiOutlineDownload,
} from "react-icons/ai";
import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-dark text-light py-4">
      <div className="d-flex justify-content-center mx-5">
        <p className="nameFooter">&copy;TFL Tomas Wajnerman 2024</p>
      </div>

      <div className="d-flex justify-content-center">
        <Link
          to="/public/manualdeusuario.pdf"
          target="_blank"
          download
          className="d-flex download"
        >
          <p className="align-self-center">Manual de usuario</p>
          <AiOutlineDownload className="logoDownload"></AiOutlineDownload>
        </Link>
      </div>

      <div className=" mx-5 d-flex justify-content-center">
        <Link target="_blank" to={"https://www.instagram.com/tomi_waj/"}>
          <AiOutlineInstagram className="igLogo logo"></AiOutlineInstagram>
        </Link>
        <Link target="_blank" to={"https://www.facebook.com/tomas.wajnerman"}>
          <AiOutlineLinkedin className="lkLogo logo"></AiOutlineLinkedin>
        </Link>
        <Link target="_blank" to={"mailto:wajnermantomas@gmail.com"}>
          <AiOutlineMail className="gmailLogo logo"></AiOutlineMail>
        </Link>
        <Link target="_blank" to={"https://github.com/Grefing"}>
          <AiOutlineGithub className="ghLogo logo"></AiOutlineGithub>
        </Link>
        <Link target="_blank" to={"https://wa.me/543813567072"}>
          <AiOutlineWhatsApp className="waLogo logo"></AiOutlineWhatsApp>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
