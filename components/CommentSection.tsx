"use client";

import { useEffect, useState } from "react";

type Comment = {
  createdAt: Date | string;
  comment: string;
};

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchedComments = localStorage.getItem(
      `${window.location.pathname}/comments`,
    );
    if (fetchedComments) {
      const parsed: Comment[] = JSON.parse(fetchedComments);
      parsed.forEach((c) => {
        c.createdAt = new Date(c.createdAt);
      });
      setComments(parsed);
    }
  }, []);

  useEffect(() => {
    if (comments.length) {
      localStorage.setItem(
        `${window.location.pathname}/comments`,
        JSON.stringify(comments),
      );
    }
  }, [comments]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const comment = e.currentTarget?.comment?.value;

    if (comment) {
      setComments((arr) => [{ createdAt: new Date(), comment }, ...arr]);
    }
  }

  return (
    <div className="flex flex-col mt-8 items-stretch w-full">
      <form onSubmit={handleSubmit} className="pb-8 space-y-2">
        <input
          name="comment"
          type="text"
          placeholder="Say something about this character"
          className="input input-bordered input-lg w-full block"
          required
        />
        <button className="btn btn-primary" type="submit">
          Comment
        </button>
      </form>
      <div className="space-y-4">
        {comments.map((c, i) => (
          <div key={i} className="space-y-0.5">
            <p className="text-xs text-slate-300">
              Created at {new Date(c.createdAt).toLocaleString()}
            </p>
            <p>{c.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
