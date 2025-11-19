import type { RestroomStatus } from '../types/restroom'

const statusStyles: Record<RestroomStatus, string> = {
  open: 'bg-emerald-500/10 text-emerald-100 border border-emerald-500/30',
  cleaning: 'bg-amber-500/10 text-amber-100 border border-amber-500/30',
  blocked: 'bg-rose-500/10 text-rose-100 border border-rose-500/30',
}

const StatusPill = ({ status }: { status: RestroomStatus }) => (
  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}>
    {status === 'open' && 'Open'}
    {status === 'cleaning' && 'Cleaning'}
    {status === 'blocked' && 'Temporarily blocked'}
  </span>
)

export default StatusPill
