import { JSXElement } from "solid-js";

import { getIsScreenshotting } from "../../../states/core";
import { showModal } from "../../../states/modals";
import { isFocusMode } from "../../../states/test";
import { cn } from "../../../utils/cn";
import { Button } from "../../common/Button";
import { isLoadingShown } from "../../core/PageSwitcher";
import { Keytips } from "./Keytips";
import { ThemeIndicator } from "./ThemeIndicator";
import { VersionButton } from "./VersionButton";

export function Footer(): JSXElement {
  return (
    <footer
      class={cn("relative text-xs text-sub", {
        "opacity-0": getIsScreenshotting(),
      })}
      data-focused={isFocusMode() ? "" : undefined}
      inert={isLoadingShown()}
    >
      <Keytips />

      <div
        class={cn("-m-2 flex justify-between gap-8 transition-opacity", {
          "opacity-0": isFocusMode(),
        })}
      >
        <div class="grid grid-cols-1 justify-items-start xs:grid-cols-2 sm:grid-cols-4 lg:flex">
          <Button
            variant="text"
            text="contact"
            fa={{ icon: "fa-envelope", fixedWidth: true }}
            onClick={() => showModal("Contact")}
          />
          <Button
            variant="text"
            text="support"
            fa={{ icon: "fa-heart", fixedWidth: true }}
            onClick={() => showModal("Support")}
          />
          <Button
            variant="text"
            text="source"
            fa={{ icon: "fa-code", fixedWidth: true }}
            href="https://github.com/hadi-hani/monkeytype"
          />
          <Button
            variant="text"
            text="report issue"
            fa={{ icon: "fa-bug", fixedWidth: true }}
            href="https://github.com/hadi-hani/monkeytype/issues"
          />
          <Button
            variant="text"
            text="GPL-3.0 license"
            fa={{ icon: "fa-file-contract", fixedWidth: true }}
            href="/LICENSE"
          />
        </div>
        <div class="flex flex-col items-end text-right lg:flex-row">
          <ThemeIndicator />
          <VersionButton />
        </div>
      </div>
    </footer>
  );
}
