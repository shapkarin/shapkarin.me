import { Link } from "react-router-dom";
import clsx from "clsx";
import { FiExternalLink } from "react-icons/fi";

import styles from "./styles.module.less";

const LinkComponent = ({
  href,
  to,
  children,
  external,
  wide = false,
  ...props
}) => {
  const address = href || to;
  const isExternal =
    external ??
    (address.startsWith("http://") || address.startsWith("https://"));
  const externalAttr = isExternal
    ? {
        target: "_blank",
        rel: "noreferrer",
      }
    : {};
  if (isExternal) {
    return (
      <a
        href={address}
        {...externalAttr}
        {...props}
        className={clsx(
          props.className,
          wide && styles.button,
        )}
      >
        {children}
        <FiExternalLink size={12} className={styles.icon}/>
      </a>
    );
  }
  return (
    <Link to={address} {...externalAttr} {...props}>
      {children}
    </Link>
  );
};

export default LinkComponent;
