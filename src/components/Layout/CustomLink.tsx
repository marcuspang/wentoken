import NextLink from "next/link";
import { Link, LinkProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface CustomLinkProps extends LinkProps {
  href: string;
  children: ReactNode;
}

const CustomLink = ({ href, children, ...props }: CustomLinkProps) => {
  return (
    <NextLink href={href} passHref>
      <Link {...props}>{children}</Link>
    </NextLink>
  );
};

export default CustomLink;
