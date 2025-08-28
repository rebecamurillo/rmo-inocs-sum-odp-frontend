import { RButton } from ".";

type Props = {
  id: string;
  title: string;
  description: string;
  completed?: boolean;
  inProgress?: boolean;
  locked?: boolean;
  cta: string;
  href?: string;
  onAction?: (id: string) => void;
  className?: string;
};

export function CTACard({
  id,
  title,
  description,
  completed,
  inProgress,
  locked,
  cta,
  href,
  onAction,
  className,
}: Props) {
  const onClick = () => {
    if (!locked) {
      if (href) {
        window.location.href = href;
      }
      onAction?.(id);
    }
  };
  return (
    <div
      className={`flex flex-col gap-4 rounded-lg border p-4 lg:p-6 relative transition-all duration-200 ${
        completed
          ? " border-success cursor-pointer"
          : locked
          ? "bg-light/30 border-dark cursor-not-allowed"
          : "border-warning cursor-pointer"
      } ${className}`}
      onClick={onClick}
    >
      <h4 className="text-primary">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>

      <RButton
        href={href}
        variant={locked ? "link" : completed ? "secondary" : "primary"}
        text={cta}
        disabled={locked}
        onClick={() => !locked && onAction?.(id)}
      ></RButton>

      {completed && (
        <span className="absolute top-1 lg:top-4 right-1 lg:right-4 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-success/30 text-success">
          ✅ Completed
        </span>
      )}
      {inProgress && (
        <span className="absolute  top-1 lg:top-4 right-1 lg:right-4 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-warning/30 text-warning">
          ⏳ In Progress
        </span>
      )}
    </div>
  );
}

export default CTACard;
