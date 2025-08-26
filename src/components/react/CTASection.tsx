import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { RButton } from "./RButton";

interface CTASectionProps {
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  description?: string;
  benefits?: string[];
  linkHref?: string;
  linkText?: string;
  className?: string;
  orderReverse?: boolean;
}

export function CTASection({
  imageSrc,
  imageAlt = "",
  title = "",
  description = "",
  benefits = [],
  linkHref = "#",
  linkText = "",
  className = "",
  orderReverse = false,
}: CTASectionProps) {
  return (
    <div className={`overflow-hidden py-5 ${className}`}>
      <div className="relative isolate">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div
            // use lg:flex-row-reverse when orderReverse is true; mobile stays stacked
            className={`mx-auto flex max-w-2xl flex-col gap-16 bg-white/75 px-6 py-16 shadow-lg ring-1 ring-gray-900/5 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none ${
              orderReverse ? "lg:flex-row-reverse" : "lg:flex-row"
            } lg:items-center lg:py-20 xl:gap-x-20 xl:px-20 dark:bg-white/3 dark:shadow-none dark:ring-white/10`}
          >
            {imageSrc && (
              <img
                alt={imageAlt}
                src={imageSrc}
                className="h-96 w-full flex-none rounded-2xl object-cover shadow-none lg:aspect-square lg:h-auto lg:max-w-sm dark:shadow-xl"
              />
            )}
            <div className="w-full flex-auto">
              <h2>{title}</h2>
              <p className="mt-6 text-lg/8 text-pretty text-gray-600 dark:text-gray-400">
                {description}
              </p>
              <ul
                role="list"
                className="my-10 grid grid-cols-1 gap-x-8 gap-y-3 "
              >
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-x-3">
                    <CheckCircleIcon
                      aria-hidden="true"
                      className="h-7 w-5 flex-none text-secondary"
                    />
                    {benefit}
                  </li>
                ))}
              </ul>
              {linkHref && (
                <RButton variant="primary" text={linkText} href={linkHref} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
