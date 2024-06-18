import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export function Footer() {
    return (
        <footer className="footer">
            <div className="footerGrid">
                <div className="footerSection">
                    <h4>Contact Us</h4>
                    <p>Email: support@studyhub.com</p>
                    <p>Phone: +31 123 456 789</p>
                    <p>Address: 123 StudyHub Lane, Emmen, Netherlands</p>
                </div>
                <div className="footerSection">
                    <h4>Follow Us</h4>
                    <div className="socialIcons">
                        <a href="#" aria-label="Facebook">
                            <FaFacebook />
                        </a>
                        <a href="#" aria-label="Instagram">
                            <FaInstagram />
                        </a>
                        <a href="#" aria-label="Twitter">
                            <FaTwitter />
                        </a>
                        <a href="#" aria-label="LinkedIn">
                            <FaLinkedin />
                        </a>
                        <a href="mailto:support@studyhub.com" aria-label="Email">
                            <FaEnvelope />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
