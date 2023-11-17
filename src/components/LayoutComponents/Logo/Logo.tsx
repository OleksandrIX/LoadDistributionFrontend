import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

interface LogoProps {
    className: string;
    imgSrc: string;
    altText: string;
    children?: ReactNode;
}

const Logo: FC<LogoProps> = ({ className,imgSrc, altText, children }) => {
    return (
        <Link to="/" className="logo">
            <img className={className} src={imgSrc} alt={altText} />
            {children}
        </Link>
    );
};

export { Logo };
