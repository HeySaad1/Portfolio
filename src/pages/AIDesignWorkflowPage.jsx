import { useEffect, useRef } from 'react';
import './AIDesignWorkflowPage.css';

export default function AIDesignWorkflowPage() {
  const pageRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    /* Measure workflow diagram paths */
    const spinePaths = page.querySelectorAll('.aiw-spine path');

    spinePaths.forEach(path => {
      const length = path.getTotalLength();
      path.style.setProperty('--len', length);
    });

    /* Measure signature paths */
    const signaturePaths = Array.from(
      page.querySelectorAll('.aiw-sign-svg path')
    );

    if (signaturePaths.length) {
      const lengths = signaturePaths.map(path => path.getTotalLength());
      const total = lengths.reduce((a, b) => a + b, 0);

      const DRAW = 1.9;
      const GAP = 0.12;
      let at = 0.3;

      signaturePaths.forEach((path, index) => {
        const duration = (lengths[index] / total) * DRAW;

        path.style.setProperty('--len', lengths[index]);
        path.style.setProperty('--dur', `${duration.toFixed(3)}s`);
        path.style.setProperty('--delay', `${at.toFixed(3)}s`);

        at += duration + GAP;
      });
    }

    /* Scroll reveal */
    const items = page.querySelectorAll('.aiw-reveal');

    if (!('IntersectionObserver' in window)) {
      items.forEach(item => item.classList.add('is-in'));
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.15,
      }
    );

    items.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="aiw-page" ref={pageRef}>
      <div className="aiw-frame">

        <article className="aiw-sheet">

          {/* Document heading */}
          <div className="aiw-docline">
            <p className="aiw-kicker">AI x Design</p>
            <p className="aiw-dateline">August 2026</p>
          </div>

          <h1>How I build products today</h1>

          <div className="aiw-opening">
            <p className="aiw-lead">
              Over the last year, my workflow has changed quite a bit.
              I rarely start with a blank Figma canvas anymore.
            </p>

            <p className="aiw-quiet">
              Instead, I use AI to explore ideas quickly, compare different
              directions, and find out which ones hold up before investing
              time refining them.
            </p>

            <p className="aiw-quiet">
              Figma is still where I spend most of my time. It's where ideas
              become products.
            </p>
          </div>

          <hr className="aiw-divider" />

          {/* 01 — Explore */}
          <section className="aiw-stage aiw-reveal">

            <div className="aiw-note">

              <p className="aiw-note-number">
                <b>01</b> / Explore
              </p>

              <svg
                className="aiw-spine"
                width="64"
                height="104"
                viewBox="0 0 64 104"
                aria-hidden="true"
              >
                <path d="M32 0 V20 C32 60 4 56 4 104" />
                <path d="M32 0 V20 C32 60 18 56 18 104" />
                <path d="M32 0 V20 C32 60 32 56 32 104" />
                <path d="M32 0 V20 C32 60 46 56 46 104" />
                <path d="M32 0 V20 C32 60 60 56 60 104" />
              </svg>

              <p className="aiw-tools">
                <span>Tools</span>
                Variant AI
                <br />
                Claude Design
              </p>

            </div>

            <div className="aiw-stage-content">

              <h2>
                Explore several concepts instead of one
              </h2>

              <p>
                I usually begin by generating multiple concepts rather than
                designing a single screen from scratch.
              </p>

              <p>
                This helps me explore more directions early and avoid getting
                attached to the first idea.
              </p>

            </div>
          </section>

          {/* 02 — Refine */}
          <section className="aiw-stage aiw-reveal">

            <div className="aiw-note">

              <p className="aiw-note-number">
                <b>02</b> / Refine
              </p>

              <svg
                className="aiw-spine"
                width="64"
                height="104"
                viewBox="0 0 64 104"
                aria-hidden="true"
              >
                <path d="M4 0 C4 48 32 44 32 82 V104" />
                <path d="M18 0 C18 48 32 44 32 82 V104" />
                <path d="M32 0 V104" />
                <path d="M46 0 C46 48 32 44 32 82 V104" />
                <path d="M60 0 C60 48 32 44 32 82 V104" />
              </svg>

              <p className="aiw-tools">
                <span>Tools</span>
                Figma
                <small>
                  with Figma AI
                </small>
              </p>

            </div>

            <div className="aiw-stage-content">

              <h2>
                Choose one direction, then refine it in Figma
              </h2>

              <p>
                Deciding is the actual work. I keep the concept that still
                holds up when I push on it: when the content runs long, when
                someone arrives halfway through the task, when there is
                nothing on the screen yet. Most concepts look equally good
                until you ask them a hard question.
              </p>

              <p>
                Once I know which direction is worth pursuing, I move into
                Figma.
              </p>

              <p>
                This is where I refine layouts, improve hierarchy, build
                components, solve edge cases, and think through the details
                that AI still can't.
              </p>

            </div>
          </section>

          {/* 03 — Build */}
          <section className="aiw-stage aiw-reveal">

            <div className="aiw-note">

              <p className="aiw-note-number">
                <b>03</b> / Build
              </p>

              <svg
                className="aiw-spine"
                width="64"
                height="104"
                viewBox="0 0 64 104"
                aria-hidden="true"
              >
                <path
                  className="is-chosen"
                  d="M32 0 V96"
                />

                <circle
                  cx="32"
                  cy="100"
                  r="3.5"
                />
              </svg>

              <p className="aiw-tools">
                <span>Tools</span>
                Cursor
                <br />
                Claude Code

                <small>
                  connected to Figma
                  <br />
                  via MCP
                </small>
              </p>

            </div>

            <div className="aiw-stage-content">

              <h2>
                Build the working product faster
              </h2>

              <p>
                Once the design is in a good place, I use AI to accelerate
                implementation and iteration.
              </p>

              <p>
                Cursor and Claude Code connect back to Figma through the MCP,
                so the agent reads the file itself. Components, variables,
                and spacing come from the source instead of from me
                describing them in a prompt.
              </p>

              <p>
                The rest is context I have to write down. The brief carries
                the intent, the copy, and the decisions I have already made,
                and anything I am unsure about gets marked as a guess so it
                is checked rather than preserved.
              </p>

              <p>
                The goal isn't to replace development. It's to shorten the
                path between an idea and a working product.
              </p>

            </div>
          </section>

          <hr className="aiw-divider" />

          {/* Closing */}
          <section className="aiw-closing aiw-reveal">

            <p className="aiw-closing-lines">
              AI helps me explore faster. Judgment decides{' '}
              <em>
                which direction survives contact with real users.
              </em>
            </p>

            <p className="aiw-closing-note">
              The tools will continue to evolve. My focus is on building a
              workflow that evolves with them.
            </p>

            <div className="aiw-sign">

              <div className="aiw-sign-block">

                <svg
                  className="aiw-sign-svg"
                  viewBox="0 0 22394 12983"
                  role="img"
                  aria-label="Saad Malik"
                >
                  <path d="M45.0078 11360.4C1014.6 10798.4 1872.41 10027.1 2752.56 9339.11C4166.68 8233.71 5573.67 7119.6 6978.34 6002.22C8571.4 4734.98 10234.7 3502.12 11664.6 2046.67C11817.1 1891.41 13539.1 197.613 12485.9 53.7782C12184.3 12.5844 11541.7 126.374 11291.2 185.334C10229.2 435.37 9203.9 853.028 8224.56 1326.67C7284.98 1781.08 6598.69 2168.58 5709.01 2724C4639.87 3391.45 3530.07 4122.6 2647.67 5035.11C1887.41 5821.32 1074 7235.48 1835.23 8293.78C2056.55 8601.46 2347.22 8749.98 2674.34 8921.33C3227.02 9210.83 3812.35 9422.6 4397.01 9636C4491.94 9670.65 5907.53 10079.7 5616.56 10375.6C5513.56 10480.3 5293.97 10523.9 5170.34 10549.8C4849.62 10616.9 4491.87 10655.2 4165.9 10599.6C4065.81 10582.5 3828.73 10518.2 3764.12 10404C3623.92 10156.3 4086.28 9868.28 4201.45 9792.44C5155.68 9164.15 6319.08 8670.16 7426.34 8388C7642.14 8333.01 7989.6 8276.11 8215.67 8260C8392.41 8247.41 8760.78 8206.85 8912.56 8352.44C9080.95 8513.95 8738.84 8947.95 8660.12 9081.33C8581.91 9213.86 8329.7 9564.91 8658.34 9561.33C9099.47 9556.54 9558.57 9288.78 9927.67 9068.89C10169.6 8924.78 9787.55 9171.17 10069.9 9081.33C10235 9028.79 10378.6 8933.51 10526.8 8846.67C10560.9 8826.67 10702.7 8718.9 10681.5 8825.33C10668.6 8889.63 10611.9 9016.88 10644.1 9081.33C10683 9159.18 10949.9 8957.33 10976.6 8939.11C11150.4 8820.49 11323.9 8642.34 11525.9 8572.89C11731.1 8502.36 11689.1 8762.7 11698.3 8884C11794.1 10144.9 13951.9 8412.53 14240.6 8146.22C15270 7196.52 16101.2 5986.99 16734.8 4743.56C16913.4 4393.11 17172.4 3805.45 17293 3413.78C17367.4 3172.23 17503.7 2719.61 17280.6 2496.44C16785.8 2001.67 16057 3730.61 15981 3897.33C15247 5507.3 14743.3 7219.39 14308.1 8930.22C13995 10161 13761.9 11413.7 13435.2 12640.4C13408.3 12741.4 13315.7 13016.1 13285.9 12916C13256 12815.3 13288.2 12709.2 13293 12608.4" />

                  <path d="M8557.01 11552.4C8528.06 11666.3 8481.86 11703 8674.34 11716C8938.62 11733.8 9589.5 11639.7 9787.23 11612.9C11526 11376.8 13254.2 11160.4 15005 11026.2C17447.7 10839.1 19898.2 10688.4 22349 10688.4" />
                </svg>

                <p className="aiw-sign-name">
                  Saad Malik
                </p>

                <p className="aiw-sign-role">
                  Senior Product Designer
                </p>

              </div>

            </div>

          </section>

        </article>

      </div>
    </main>
  );
}