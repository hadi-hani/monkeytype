import { Link } from "@solidjs/meta";
import { createMemo, JSXElement } from "solid-js";

import { Theme } from "../../constants/themes";
import { isDevEnvironment } from "../../utils/env";

export function FavIcon(props: { theme: Theme }): JSXElement {
  const icon = createMemo<string>(() => {
    let { main, bg } = props.theme;
    if (isDevEnvironment()) {
      [main, bg] = [bg, main];
    }
    if (bg === main) {
      bg = "#111";
      main = "#eee";
    }

    const svgPre = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <style>
        #bg{fill:${bg};}
        .line{fill:none;stroke:${main};stroke-width:5;stroke-linecap:round;stroke-linejoin:round;}
      </style>
      <rect id="bg" x="0" y="0" width="64" height="64" rx="16"/>
      <path class="line" d="M12 47H52M18 37H46"/>
      <path class="line" d="M23 29A9 9 0 0 1 41 29"/>
      <path class="line" d="M32 11V18"/>
    </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svgPre)}`;
  });

  return (
    <Link id="favicon" rel="shortcut icon" type="image/svg+xml" href={icon()} />
  );
}
