'use client';
import React from "react";
import { ExternalLink} from "lucide-react"

type AirportLinkProps = {
  url: string;
  title?: string;
  className?: string;
};

const AirportLink = React.forwardRef<HTMLAnchorElement, AirportLinkProps>(
  ({ url, title, className }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
      <a
        href="#"
        ref={ref}
        onClick={handleClick}
        className={className}
        title={title}
        rel="nofollow"
      >
      <ExternalLink className="h-3 w-3 ml-2" /> {title}
      </a>
    );
  }
);

AirportLink.displayName = "AirportLink";

export default AirportLink;
