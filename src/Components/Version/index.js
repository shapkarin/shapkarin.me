export default function Version() {
  const version = process.env.REACT_APP_VERSION || null;
  return version && <span>v{ process.env.REACT_APP_VERSION }</span>
}