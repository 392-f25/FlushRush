import type { Restroom, Review } from '../types/restroom'

type ReviewSectionProps = {
  selected: Restroom
  reviews: Review[]
  draft: string
  onDraftChange: (value: string) => void
  onAddReview: () => void
}

const ReviewSection = ({ selected, reviews, draft, onDraftChange, onAddReview }: ReviewSectionProps) => (
  <div className="rounded-3xl border border-slate-800/70 bg-slate-900/60 p-5 shadow-xl shadow-indigo-500/10">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-indigo-200/80">Reviews</p>
        <h3 className="text-xl font-semibold">Recent notes for {selected.name}</h3>
      </div>
      <span className="text-sm text-slate-300">{reviews.length} entries</span>
    </div>
    <div className="mt-3 space-y-3">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3">
        <label className="text-sm font-semibold text-white">Leave a quick review</label>
        <textarea
          value={draft}
          onChange={(e) => onDraftChange(e.target.value)}
          placeholder="e.g., Door button works, clear signage, low noise..."
          className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-sm text-white outline-none ring-0 focus:border-indigo-400"
          rows={3}
        />
        <div className="mt-2 flex items-center justify-end gap-3">
          <span className="text-xs text-slate-400">Shared to campus-only feed</span>
          <button
            onClick={onAddReview}
            className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:opacity-50"
            disabled={!draft.trim()}
          >
            Post
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {reviews.map((review) => (
          <div key={review.id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-white">{review.author}</div>
              <div className="text-sm text-slate-300">
                {review.rating} ★ • {review.time}
              </div>
            </div>
            <p className="mt-2 text-sm text-slate-200">{review.note}</p>
          </div>
        ))}
        {!reviews.length && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-200">
            No reviews yet. Be the first to leave an accessibility note.
          </div>
        )}
      </div>
    </div>
  </div>
)

export default ReviewSection
