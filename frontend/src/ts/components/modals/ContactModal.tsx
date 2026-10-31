import { JSXElement } from "solid-js";

import { AnimatedModal } from "../common/AnimatedModal";
import { Button } from "../common/Button";

export function ContactModal(): JSXElement {
  const buttonClass = "gap-4 p-4 text-lg justify-start";

  return (
    <AnimatedModal id="Contact" modalClass="max-w-4xl" title="Contact TypeHorizon">
      <div>
        TypeHorizon issues, feature requests, and project questions are handled
        through the public source repository. Do not send passwords, private
        credentials, or personal information in public issues.
      </div>
      <div class="mt-4 grid gap-4 md:grid-cols-2">
        <Button
          variant="button"
          href="https://github.com/hadi-hani/monkeytype/issues/new"
          text="Report a bug or request a feature"
          class={buttonClass}
          fa={{ icon: "fa-bug", fixedWidth: true }}
        />
        <Button
          variant="button"
          href="https://github.com/hadi-hani/monkeytype"
          text="View the source code"
          class={buttonClass}
          fa={{ icon: "fa-code", fixedWidth: true }}
        />
      </div>
    </AnimatedModal>
  );
}
