export default function CurvedMarquee() {
  return (
    <div style={{ width: '100%', overflow: 'hidden', height: '200px', position: 'relative' }}>
      <svg viewBox="0 0 1200 200" style={{ width: '100%', height: '100%' }}>
        <path id="curve" d="M 0 100 Q 600 250 1200 100" fill="transparent" />
        <text style={{ fontSize: '40px', fill: '#000' }}>
          <textPath href="#curve" startOffset="0">
            Mock Room Investor Mock Room Investor Mock Room Investor Mock Room
          </textPath>
        </text>
      </svg>
    </div>
  )
}
