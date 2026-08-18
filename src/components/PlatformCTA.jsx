import toptalLogo from '../assets/toptal-symbol.svg';
import upworkLogo from '../assets/upwork.svg';
import arrowUpRight from '../assets/arrow-up-right.svg';

export default function PlatformCTA() {
  return (
    <section className="platform-cta">
      <div className="platform-cta-inner">

        <h2>Prefer to hire through a platform?</h2>

        <div className="platform-cta-actions">

          <a
            href="https://www.toptal.com/designers/resume/saad-malik1?preview"
            target="_blank"
            rel="noreferrer"
            className="platform-cta-button"
          >
            <div className="platform-cta-button-inner">
              <img
                src={toptalLogo}
                alt=""
                className="platform-cta-toptal"
              />

              <span>Visit Toptal</span>

              <img
                src={arrowUpRight}
                alt=""
                className="platform-cta-arrow"
              />
            </div>
          </a>


          <a
            href="https://www.upwork.com/freelancers/meetsaadmalik"
            target="_blank"
            rel="noreferrer"
            className="platform-cta-button"
          >
            <div className="platform-cta-button-inner">
              <img
                src={upworkLogo}
                alt=""
                className="platform-cta-upwork"
              />

              <span>Visit Upwork</span>

              <img
                src={arrowUpRight}
                alt=""
                className="platform-cta-arrow"
              />
            </div>
          </a>

        </div>

      </div>
    </section>
  );
}