export const Grid = () => {
  const tmpStyle: React.CSSProperties = {
    background: '#aaffaa',
    display: 'inline-grid',
    width: '100%',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridGap: 10,
  }
  return <div style={tmpStyle}>그리드</div>
}
