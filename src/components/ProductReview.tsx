import { Review } from "@/types/product";

type ReviewsProps = {
  reviews: Review[];
};

export function ProductReview({reviews}: ReviewsProps)  {
  return (
    <div
      id="reviews"
      className="mt-6 rounded-xl border border-zinc-200 bg-white p-4 sm:p-6 lg:p-8"
    >
      <div className="mb-6 flex items-center justify-between border-b border-zinc-100 pb-5">
        <div>
          <h2 className="text-xl font-bold text-zinc-900">
            Reviews
          </h2>

          <p className="mt-1 text-sm text-zinc-400">
            What customers are saying
          </p>
        </div>

        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-500">
          {reviews.length} reviews
        </span>
      </div>

      <div className="divide-y divide-zinc-100">
        {reviews.map((review) => (
          <div
            key={review.reviewerEmail}
            className="py-6 first:pt-0 last:pb-0"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-zinc-800">
                  {review.reviewerName}
                </p>

                <p className="mt-1 text-xs text-zinc-400">
                  {new Date(review.date).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm tracking-wide text-amber-400">
                  {"★".repeat(review.rating)}
                </span>

                <span className="text-xs text-zinc-400">
                  {review.rating}/5
                </span>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-zinc-600">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>     
  )
}