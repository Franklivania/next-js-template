import { Icon } from "@iconify/react";

export const renderStars = (rating) => {
  return Array.from({ length: 5 }, (_, index) => {
    const starNumber = index + 1;
    const isFull = rating >= starNumber;
    const isHalf = !isFull && rating >= starNumber - 0.5;
    const icon = isFull
      ? "material-symbols:star"
      : isHalf
        ? "material-symbols:star-half"
        : "material-symbols:star-outline";
    return (
      <Icon key={index} icon={icon} width={18} height={18} color="#FA8232" />
    );
  });
};
