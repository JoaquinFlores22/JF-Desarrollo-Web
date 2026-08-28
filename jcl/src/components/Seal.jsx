let uid = 0;

// Sello circular con texto en arco (SVG textPath) que gira lento.
export default function Seal({ text = 'JCL · ROPA SPORT · DESDE FLORES · ', center = 'J', className = '', style }) {
  const id = `seal-${uid++}`;
  return (
    <div className={`seal ${className}`} style={style} aria-hidden="true">
      <svg viewBox="0 0 100 100">
        <defs>
          <path id={id} d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
        </defs>
        <text>
          <textPath href={`#${id}`}>{text.repeat(2)}</textPath>
        </text>
      </svg>
      <b>{center}</b>
    </div>
  );
}
