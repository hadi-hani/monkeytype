import { Link } from "@tanstack/solid-router";
import { JSXElement } from "solid-js";

import { getRoutePage } from "../../../states/router";
import { isFocusMode } from "../../../states/test";
import { restartTest } from "../../../test/test-logic";
import { cn } from "../../../utils/cn";
import { isDevEnvironment } from "../../../utils/env";

export function Logo(): JSXElement {
  return (
    <Link
      to="/"
      class="-m-2 flex h-6 w-max gap-2 rounded-[0.8rem] p-2 focus-visible:**:data-[ui-element='logoSubtext']:text-transparent"
      aria-label="TypeHorizon Home"
      style={{
        "box-sizing": "content-box",
        "font-family": "Lexend Deca ,sans-serif",
      }}
      data-ui-element="logo"
      onClick={() => {
        if (getRoutePage() === "test") void restartTest();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        class={cn("h-full fill-none stroke-current transition-colors", {
          "text-sub": isFocusMode(),
        })}
        aria-hidden="true"
      >
        <rect x="4" y="4" width="56" height="56" rx="17" fill="currentColor" opacity="0.12" stroke="none" />
        <path d="M12 47H52M18 37H46" stroke-width="4" stroke-linecap="round" />
        <path d="M23 29A9 9 0 0 1 41 29" stroke-width="4" stroke-linecap="round" />
        <path d="M32 11V18" stroke-width="4" stroke-linecap="round" />
      </svg>
      <div class="hidden h-6 place-content-center text-[2rem] leading-0 sm:grid">
        <div
          class={cn(
            "-mt-[1.65em] hidden pl-[0.5em] text-[0.315em] leading-0 text-sub transition-colors duration-125 lg:block",
            {
              "text-transparent": isFocusMode(),
            },
          )}
          data-ui-element="logoSubtext"
        >
          {isDevEnvironment() ? "local development" : "typing practice"}
        </div>
        <h1
          class={cn("-mt-[0.11em] text-text transition-colors duration-250", {
            "text-sub": isFocusMode(),
          })}
          data-ui-element="logoText"
        >
          TypeHorizon
        </h1>
      </div>
    </Link>
  );
}
