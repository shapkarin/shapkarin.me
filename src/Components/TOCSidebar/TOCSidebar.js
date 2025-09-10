import { useTOC } from '@/Contexts/TOCContext';

const TOCSidebar = () => {
  const { tocData } = useTOC();

  if (!tocData || tocData.length === 0) {
    return null;
  }

  return (
    <div className="TOCSidebar">
      <h3>Table of Contents</h3>
      <ul>
        {tocData.map((text, index) => (
          <li key={index}>
            <a href={`#${text.toLowerCase().replace(/\s+/g, '-')}`}>
              {text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TOCSidebar;
