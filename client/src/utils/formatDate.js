export const formatBlogDate = (isoString) => {
  // Append 'Z' if missing to treat as UTC
  const fixedIsoString = isoString.endsWith('Z') ? isoString : isoString + 'Z';

  const postDate = new Date(fixedIsoString);
  const now = new Date();
  const diffInMs = now - postDate;
  const diffInHours = diffInMs / (1000 * 60 * 60);

  if (diffInHours < 1) {
    const minutes = Math.floor(diffInMs / (1000 * 60));
    return `${minutes} min ago`;
  } else if (diffInHours < 6) {
    const hours = Math.floor(diffInHours);
    return `${hours} hr${hours > 1 ? "s" : ""} ago`;
  } else {
    return postDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
};
