import { useQuery } from "@tanstack/solid-query";
import { For, JSXElement } from "solid-js";

import {
  getContributorsQueryOptions,
  getSpeedHistogramQueryOptions,
  getSupportersQueryOptions,
  getTypingStatsQueryOptions,
} from "../../queries/public";
import { showModal } from "../../states/modals";
import { getTheme } from "../../states/theme";
import { getNumberWithMagnitude } from "../../utils/numbers";
import { Advertisement } from "../common/Advertisement";
import AsyncContent from "../common/AsyncContent";
import { Button } from "../common/Button";
import { ChartJs } from "../common/ChartJs";
import { H2, H3 } from "../common/Headers";
import { CommandlineHotkey } from "../hotkeys/CommandlineHotkey";
import { QuickRestartHotkey } from "../hotkeys/QuickRestartHotkey";

export function AboutPage(): JSXElement {
  const contributors = useQuery(() => getContributorsQueryOptions());

  const supporters = useQuery(() => getSupportersQueryOptions());

  const typingStats = useQuery(() => getTypingStatsQueryOptions());

  const speedHistogram = useQuery(() => getSpeedHistogramQueryOptions());

  const numberOfHistogramRecords = (data?: { y: number }[]) => {
    if (data === undefined) return "";
    const sum = getNumberWithMagnitude(
      data.reduce((sum, it) => (sum += it.y), 0),
    );
    return `${sum.roundedTo2} ${sum.orderOfMagnitude}`;
  };

  return (
    <div class="content-grid grid gap-8">
      <section class="text-center text-sub">
        TypeHorizon is an independent project maintained by its contributors and
        contributors. It is a modified distribution based on the Monkeytype
        GPL-3.0 codebase.
        <br />
        <a href="https://github.com/monkeytypegame/monkeytype">Original upstream project</a>
        {" "}and{" "}
        <a href="https://github.com/hadi-hani/monkeytype">TypeHorizon source code</a>.
      </section>
      <section>
        <AsyncContent
          alwaysShowContent
          queries={{ typingStats }}
          errorMessage="Failed to get global typing stats"
        >
          {({ typingStatsData }) => (
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <For
                each={
                  [
                    [
                      "total tests started",
                      () => typingStatsData()?.testsStarted,
                    ],
                    ["total typing time", () => typingStatsData()?.timeTyping],
                    [
                      "total tests completed",
                      () => typingStatsData()?.testsCompleted,
                    ],
                  ] as const
                }
              >
                {([title, stat]) => (
                  <div class="text-center">
                    <div class="text-sub">{title}</div>
                    <div class="text-5xl">{stat()?.text ?? "-"}</div>
                    <div class="text-xl">{stat()?.subText ?? "-"}</div>
                  </div>
                )}
              </For>
            </div>
          )}
        </AsyncContent>
      </section>
      <section class="h-48 w-full">
        <AsyncContent
          alwaysShowContent
          queries={{ speedHistogram }}
          errorMessage="Failed to get global speed stats for histogram"
        >
          {({ speedHistogramData }) => (
            <>
              <ChartJs
                name="SpeedHistogram"
                type="bar"
                data={{
                  labels: speedHistogramData()?.labels ?? [],
                  datasets: [
                    {
                      yAxisID: "count",
                      label: "Users",
                      data: speedHistogramData()?.data ?? [],
                      minBarLength: 2,
                      backgroundColor: getTheme().main,
                      borderColor: getTheme().main,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  hover: {
                    mode: "nearest",
                    intersect: false,
                  },
                  scales: {
                    x: {
                      axis: "x",
                      bounds: "ticks",
                      display: true,
                      title: {
                        display: false,
                        text: "Bucket",
                      },
                      offset: true,
                    },
                    count: {
                      axis: "y",
                      beginAtZero: true,
                      min: 0,
                      ticks: {
                        autoSkip: true,
                        autoSkipPadding: 20,
                        stepSize: 10,
                      },
                      display: true,
                      title: {
                        display: true,
                        text: "Users",
                      },
                    },
                  },
                  plugins: {
                    annotation: {
                      annotations: [],
                    },
                    tooltip: {
                      animation: { duration: 250 },
                      intersect: false,
                      mode: "index",
                      callbacks: {
                        afterLabel: (context) => {
                          return (
                            (context.raw as { topPercentage?: string })
                              .topPercentage ?? ""
                          );
                        },
                      },
                    },
                  },
                }}
              />
              <div class="text-right text-xs text-sub">
                distribution of time 60 leaderboard results (wpm) <br />
                {numberOfHistogramRecords(speedHistogramData()?.data)} total
                results
              </div>
            </>
          )}
        </AsyncContent>
      </section>
      <section>
        <H2 fa={{ icon: "fa-info-circle" }} text="about" />
        <p>
          TypeHorizon is a customizable typing-practice platform based on the
          Monkeytype codebase. This independent distribution retains many of
          the upstream typing modes, settings, themes, and real-time feedback,
          while using the TypeHorizon product identity and its own deployment
          configuration.
          <br />
          <br />
          Practice typing, review your results, and track your progress.
        </p>
      </section>
      <section>
        <H3 fa={{ icon: "fa-align-left" }} text="word set" />
        <p>
          By default, this website uses the most common 200 words in the English
          language to generate its tests. You can change to an expanded set
          (1000 most common words) in the options, or change the language
          entirely.
        </p>
      </section>
      <section>
        <H3 fa={{ icon: "fa-keyboard" }} text="keybinds" />
        <p>
          You can use <QuickRestartHotkey /> to restart the typing test. Open
          the command line by pressing <CommandlineHotkey /> - there you can
          access all the functionality you need without touching your mouse.
        </p>
      </section>
      <section>
        <H3 fa={{ icon: "fa-list-ol" }} text="stats" />
        <dl class="grid">
          <dt class="col-1 mr-4">wpm</dt>
          <dd class="col-2">
            - total number of characters in the correctly typed words (including
            spaces), divided by 5 and normalised to 60 seconds.
          </dd>

          <dt class="col-1 mr-4">raw wpm</dt>
          <dd class="col-2">
            {" "}
            - calculated just like wpm, but also includes incorrect words.
          </dd>

          <dt class="col-1 mr-4">acc</dt>
          <dd class="col-2"> - percentage of correctly pressed keys.</dd>

          <dt class="col-1 mr-4">char</dt>
          <dd class="col-2">
            - correct characters / incorrect characters. Calculated after the
            test has ended.
          </dd>

          <dt class="col-1 mr-4">consistency</dt>
          <dd class="col-2">
            - based on the variance of your raw wpm. Closer to 100% is better.
            Calculated using the coefficient of variation of raw wpm and mapped
            onto a scale from 0 to 100.
          </dd>
        </dl>
      </section>
      <Advertisement id="ad-about-1" visible="sellout" />
      <section>
        <H3 fa={{ icon: "fa-chart-area" }} text="results screen" />
        <p>
          After completing a test you will be able to see your wpm, raw wpm,
          accuracy, character stats, test length, leaderboards info and test
          info (you can hover over some values to get floating point numbers).
          You can also see a graph of your wpm and raw over the duration of the
          test. Remember that the wpm line is a global average, while the raw
          wpm line is a local, momentary value (meaning if you stop, the value
          is 0).
        </p>
      </section>
      <section>
        <H3 fa={{ icon: "fa-bug" }} text="bug report or feature request" />
        <p>
          If you encounter a bug, or have a feature request - join the Discord
          server, send me an email, a direct message on Twitter or create an
          issue on GitHub.
        </p>
      </section>
      <div></div>
      <section>
        <H2 fa={{ icon: "fa-life-ring" }} text="support" />
        <p>
          Thanks to everyone who has supported this project. It would not be
          possible without you and your continued support.
        </p>
        <div class="mt-4 text-xl">
          <Button
            fa={{
              icon: "fa-donate",
            }}
            onClick={() => showModal("Support")}
            text="support"
            class="w-full p-8"
          />
        </div>
      </section>
      <div></div>
      <section>
        <H2 fa={{ icon: "fa-envelope" }} text="contact" />
        <p>
          For TypeHorizon bug reports and feature requests, use the issue
          tracker in the TypeHorizon source repository.
        </p>
        <div class="mt-4 grid w-full grid-cols-1 gap-4 text-xl sm:grid-cols-2 lg:grid-cols-4">
          <Button
            text="mail"
            fa={{ icon: "fa-envelope" }}
            onClick={() => showModal("Contact")}
            class="w-full p-8"
          />
          <Button
            text="issues"
            fa={{ icon: "fa-twitter", variant: "brand" }}
            href="https://github.com/hadi-hani/monkeytype/issues"
            class="w-full p-8"
          />
          <Button
            text="source"
            fa={{ icon: "fa-discord", variant: "brand" }}
            href="https://github.com/hadi-hani/monkeytype"
            class="w-full p-8"
          />
          <Button
            text="upstream"
            fa={{ icon: "fa-github", variant: "brand" }}
            href="https://github.com/monkeytypegame/monkeytype"
            class="w-full p-8"
          />
        </div>
      </section>
      <div></div>
      <section>
        <H2 fa={{ icon: "fa-users" }} text="upstream credits" />
        <p>
          <Button
            variant="text"
            text="Montydrei"
            href="https://www.reddit.com/user/montydrei"
            class="p-0 pt-2 pr-2 pb-2"
          />
          for the name suggestion
        </p>
        <p>
          <Button
            variant="text"
            text="Everyone"
            href="https://www.reddit.com/r/MechanicalKeyboards/comments/gc6wx3/experimenting_with_a_completely_new_type_of/"
            class="p-0 pt-2 pr-2 pb-2"
          />
          who provided valuable feedback on the original reddit post for the
          prototype of this website
        </p>
        <p>
          <Button
            variant="text"
            text="Supporters"
            href="#supporters_title"
            class="p-0 pt-2 pr-2 pb-2"
          />
          who helped financially by donating, enabling optional ads or buying
          merch
        </p>
        <p>
          <Button
            variant="text"
            text="Contributors"
            href="https://github.com/monkeytypegame/monkeytype/graphs/contributors"
            class="p-0 pt-2 pr-2 pb-2"
          />
          on GitHub that have helped with implementing various features, adding
          themes and more
        </p>
      </section>
      <Advertisement id="ad-about-2" visible="sellout" />
      <div></div>
      <section>
        <H2
          id="supporters_title"
          fa={{ icon: "fa-hand-holding-usd" }}
          text="top supporters"
        />
        <AsyncContent
          queries={{ supporters }}
          errorMessage="Failed to get supporters"
        >
          {({ supportersData }) => (
            <div
              class="grid"
              style={{
                "grid-template-columns": "repeat(auto-fill, minmax(13em, 1fr))",
              }}
            >
              <For each={supportersData()}>{(name) => <div>{name}</div>}</For>
            </div>
          )}
        </AsyncContent>
      </section>
      <div></div>
      <section>
        <H2
          id="contributors_title"
          fa={{ icon: "fa-code-branch" }}
          text="contributors"
        />
        <AsyncContent
          queries={{ contributors }}
          errorMessage="Failed to get contributors"
        >
          {({ contributorsData }) => (
            <div
              class="grid"
              style={{
                "grid-template-columns": "repeat(auto-fill, minmax(13em, 1fr))",
              }}
            >
              <For each={contributorsData()}>{(name) => <div>{name}</div>}</For>
            </div>
          )}
        </AsyncContent>
      </section>
      <section id="license">
        <H2 fa={{ icon: "fa-file-contract" }} text="license and source" />
        <p>
          TypeHorizon is a modified work based on the
          <a href="https://github.com/monkeytypegame/monkeytype"> original Monkeytype project</a>.
          The upstream authors' copyright and license notices are retained.
          TypeHorizon changes are dated 31 October 2026 and maintained in this
          repository.
        </p>
        <p>
          This work is distributed under GNU General Public License version 3.0
          (GPL-3.0). You may run, study, modify, and redistribute it under that
          license. The software is provided without warranty. The corresponding
          source code and build scripts are available in the linked repository.
        </p>
        <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Button
            text="Read GPL-3.0 license"
            fa={{ icon: "fa-file-contract" }}
            href="/LICENSE"
            class="w-full p-6"
          />
          <Button
            text="TypeHorizon source"
            fa={{ icon: "fa-code" }}
            href="https://github.com/hadi-hani/monkeytype"
            class="w-full p-6"
          />
          <Button
            text="Original Monkeytype source"
            fa={{ icon: "fa-code-branch" }}
            href="https://github.com/monkeytypegame/monkeytype"
            class="w-full p-6"
          />
        </div>
      </section>
    </div>
  );
}
