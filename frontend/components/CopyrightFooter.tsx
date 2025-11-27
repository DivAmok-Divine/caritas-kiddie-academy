import Link from "next/link";

export default function CopyrightFooter() {
  return (
    <div className="w-full max-w-6xl xl:max-w-7xl 2xl:max-w-8xl flex flex-col lg:flex-row gap-2 xl:gap-4">
      <div className="w-full lg:w-2/5"></div>
      <div className="w-full lg:w-3/5 text-center text-white opacity-75">
        <p className="text-[10px] sm:text-[11px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg leading-relaxed mb-0.5 sm:mb-1 md:mb-1.5">
          <span className="whitespace-nowrap">
            &copy; {new Date().getFullYear()}{" "}
            <Link
              href="#"
              className="underline hover:opacity-100 transition-opacity"
              title="Website link to be provided"
            >
              Caritas Kiddie Academy
            </Link>
            . All rights reserved.
          </span>
        </p>
        <p className="text-[10px] sm:text-[11px] md:text-xs lg:text-xs xl:text-sm 2xl:text-base leading-relaxed">
          <span className="whitespace-nowrap">
            Designed by{" "}
            <Link
              href="#"
              className="underline hover:opacity-100 transition-opacity"
              title="Website link to be provided"
            >
              DivAmok Corp
            </Link>
            .
          </span>
        </p>
      </div>
    </div>
  );
}

