import { FiExternalLink } from 'react-icons/fi';
import styles from './Button.module.less';

const Button = ({ url = 'https://github.com/shapkarin?tab=repositories', external = true, children = 'More' }) => {
  return (
    <a href={url} target="_blank" rel="noreferrer" className={styles.button}>
      <div className={styles.buttonContent}>
        {children}
        {external && <FiExternalLink className={styles.externalIcon} />}
      </div>
    </a>
  );
};

export default Button;