import './Skeleton.css';

// Ye ek "generic" building block hai — koi bhi shape/size ka
// grey box bana sakta hai, jo poore app mein reuse hoga.
interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

export default function Skeleton({
  width = '100%',
  height = '16px',
  borderRadius = '6px',
}: SkeletonProps) {
  return (
    <div
      className="skeleton"
      style={{ width, height, borderRadius }}
    />
  );
}
