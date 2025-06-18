import React, { useState } from 'react';
import RatingStar from "@/components/ui/RatingStar";
import { createReview } from "@/lib/sanity-utils";
import { Button } from "@/components/ui/button";

interface ReviewSectionProps {
  orderId: string; // ini _id dari sanity repair
  existingReview?: {
    score: number;
    review: string;
  };
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ orderId, existingReview }) => {
  const [rating, setRating] = useState(existingReview?.score || 0);
  const [reviewText, setReviewText] = useState(existingReview?.review || "");
  const [isSubmitted, setIsSubmitted] = useState(!!existingReview);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!rating || !reviewText) {
      alert("Mohon isi rating dan ulasan.");
      return;
    }

    setLoading(true);
    try {
      await createReview(orderId, rating, reviewText);
      setIsSubmitted(true);
      alert("Review berhasil dikirim!");
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-[1fr_30%] lg:grid-cols-[1fr_10%] items-center gap-3 lg:gap-2 mt-5 lg:mt-4">
      <RatingStar
        totalStars={5}
        initialRating={rating}
        onRatingChange={isSubmitted ? undefined : setRating}
        readOnly={isSubmitted}
      />
      {!isSubmitted && (
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Mengirim..." : "Kirim"}
        </Button>
      )}
      <textarea
        rows={2}
        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-slate-800 dark:text-white resize-none transition-colors col-span-2 text-sm lg:text-base"
        placeholder="Berikan ulasan Anda untuk pelayanan kami"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        readOnly={isSubmitted}
      />
    </div>
  );
};

export default ReviewSection;
