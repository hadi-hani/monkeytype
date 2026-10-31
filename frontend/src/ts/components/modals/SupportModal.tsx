import { JSXElement } from "solid-js";

import { AnimatedModal } from "../common/AnimatedModal";
import { Button } from "../common/Button";
import { Fa } from "../common/Fa";

export function SupportModal(): JSXElement {
  const buttonClass = "p-4 flex flex-col text-md h-full justify-center items-center";

  return (
    <AnimatedModal
      id="Support"
      title="Support TypeHorizon"
      modalClass="max-w-4xl"
    >
      <div>
        TypeHorizon is an independent open-source project. The most useful
        support is helping improve the code, reporting reproducible issues, and
        contributing changes under GPL-3.0. <Fa icon="fa-heart" />
      </div>
      <div class="mt-4 grid grid-cols-1 gap-4 xs:grid-cols-2">
        <Button
          variant="button"
          href="https://github.com/hadi-hani/monkeytype/issues"
          fa={{ icon: "fa-bug", fixedWidth: true, size: 2 }}
          text="Report an issue"
          class={buttonClass}
        />
        <Button
          variant="button"
          href="https://github.com/hadi-hani/monkeytype"
          fa={{ icon: "fa-code", fixedWidth: true, size: 2 }}
          text="Contribute on GitHub"
          class={buttonClass}
        />
      </div>
    </AnimatedModal>
  );
}
