import { useEffect, useRef } from 'react';
import { useTOC } from '@/Contexts/TOCContext';

const TOCMacro = ({ hasUpdatedTOC, children, ...props }) => {
  const { updateTOC, tocData } = useTOC();
  console.log('hasUpdatedTOC', hasUpdatedTOC);

  useEffect(() => {
    // Only update TOC if it hasn't been updated yet and we have valid data
    if (hasUpdatedTOC.current || !props.node) {
      return;
    }

    const extractTextValues = (rootNode) => {
      if (!rootNode) {
        return [];
      }

      const texts = [];
      const stack = [rootNode];

      while (stack.length > 0) {
        const node = stack.pop();

        if (node.type === 'text' && node.value) {
          const trimmedValue = node.value.trim();
          if (trimmedValue) {
            texts.push(trimmedValue);
          }
        }

        if (node.children && Array.isArray(node.children)) {
          // Push children in reverse order to maintain original traversal order
          for (let i = node.children.length - 1; i >= 0; i--) {
            stack.push(node.children[i]);
          }
        }
      }

      return texts;
    };

    const tocTexts = extractTextValues(props.node);
    
    // Only update if we have meaningful TOC data
    if (tocTexts.length > 0) {
      console.log('TOC Links:', tocTexts);
      updateTOC(tocTexts);
      hasUpdatedTOC.current = true;
    }
  }, [props.node, updateTOC]);

  return <ol {...props}>{children}</ol>;
};

export default TOCMacro;