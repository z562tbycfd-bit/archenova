"use client";

import {
  useState,
} from "react";

import Reveal from "./Reveal";
import OriginStoryInline from "./OriginStoryInline";

export default function HeroCinematic() {
  const [
    filmEnded,
    setFilmEnded,
  ] = useState(false);

  return (
  <div
    className={[
      "an-hero-cinematic",
      filmEnded
        ? "is-film-ended"
        : "is-film-playing",
    ].join(" ")}
  >
      {/* ==================================================
          CINEMATIC OPENING
          1回だけ最後まで再生
      ================================================== */}

      {!filmEnded && (
        <div
          className="an-hero-cinematic__film"
          aria-hidden="true"
        >
          <video
            className="an-hero-cinematic__video"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={() => {
              /*
               * 動画が本当に最後まで
               * 再生された場合だけ
               * HEROを表示する。
               */
              setFilmEnded(
                true,
              );
            }}
            onError={(event) => {
              /*
               * 動画そのものが
               * 読み込めない場合のみ
               * HEROへフォールバック。
               */
              console.error(
                "[ArcheNova Hero] Video playback error:",
                event,
              );

              setFilmEnded(
                true,
              );
            }}
          >
            <source
              src="/videos/archenova-cosmos.mp4"
              type="video/mp4"
            />
          </video>

          <div
            className="an-hero-cinematic__film-shade"
            aria-hidden="true"
          />

          <div
            className="an-hero-cinematic__film-fade"
            aria-hidden="true"
          />
        </div>
      )}

      {/* ==================================================
          HERO BACKGROUND
          動画終了後に表示
      ================================================== */}

      <div
        className="an-hero-cinematic__afterglow"
        aria-hidden="true"
      />

      <div
        className="an-hero-stars"
        aria-hidden="true"
      />

      {/* ==================================================
          HERO CONTENT
      ================================================== */}

      <div
        className="an-container an-hero-inner an-hero-cinematic__content"
        style={{
          textAlign: "center",
        }}
      >
        <Reveal>
          <div className="an-frame an-stellar-text">
            <span />

            <p>
              FOUNDER-LED CIVILIZATION DESIGN INITIATIVE
            </p>

            <span />
          </div>

          <h1 className="an-title an-stellar-title">
            ArcheNova
          </h1>

          <p className="twin-statement an-stellar-statement">
            Designing the future architecture
            <br />
            of civilization.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="an-lead an-stellar-lead">
            <p>
              ArcheNova is a founder-led civilization
              design initiative dedicated to exploring,
              integrating, designing, and realizing
              civilization.
            </p>

            <p>
              It is not a company, not an institution,
              and not a conventional brand.
            </p>

            <p>
              It is the founder&apos;s digital twin for
              civilization design.
            </p>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <OriginStoryInline />
        </Reveal>
      </div>
    </div>
  );
}