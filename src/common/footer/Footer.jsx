import {
    AiOutlineInstagram,
    AiOutlineFacebook,
    AiOutlineTwitter,
    AiOutlineGithub,
  } from "react-icons/ai";
  import "./footer.css";
  import { Link } from "react-router-dom";
  
  const Footer = () => {
    return (
      <div className="bg-dark text-light py-4">
           <div className="d-flex justify-content-center mx-5">
              <p className="nameFooter">&copy;TFL Tomas Wajnerman 2024</p>
            </div>
  
            <div className=" mx-5 d-flex justify-content-center">
              <Link target="_blank" to={"https://www.instagram.com/tomi_waj/"}>
                <AiOutlineInstagram className="igLogo logo"></AiOutlineInstagram>
              </Link>
              <Link target="_blank" to={"https://www.facebook.com/tomas.wajnerman"}>
                <AiOutlineFacebook className="fcLogo logo"></AiOutlineFacebook>
              </Link>
              <Link target="_blank" to={"https://twitter.com/TomasitoWaj"}>
                <AiOutlineTwitter className="twLogo logo"></AiOutlineTwitter>
              </Link>
              <Link target="_blank" to={"https://github.com/Grefing"}>
                <AiOutlineGithub className="ghLogo logo"></AiOutlineGithub>
              </Link>
            </div>
      </div>
    );
  };
  
  export default Footer;
  