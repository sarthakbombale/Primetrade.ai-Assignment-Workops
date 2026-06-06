export default function StatusBadge({ status }) {
  const style = {
    padding: '4px 8px',
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 600,
    color: '#111827',
  };
  if (status === 'completed') {
    return <span style={{ ...style, background: '#bbf7d0' }}>Completed</span>;
  }
  return <span style={{ ...style, background: '#fef3c7' }}>Pending</span>;
}
