export default function Version({ prefix = 'v', number = null }) {
  const version = process.env.REACT_APP_VERSION || null;
  return version && <span>{!number && prefix}{ process.env.REACT_APP_VERSION }</span>
}