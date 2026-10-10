import type { Metadata } from "next";

import { ContinuityProvider } from "./ContinuityProvider";
import ContinuityEnvironment from "./components/ContinuityEnvironment";

/* ==========================================================
  ARCHENOVA AEVUM
  LIVING OPTICAL GLASS ENVIRONMENT

  Public identity:
  Aevum

  Architectural foundation:
  Continuity

  Design philosophy:
  - Absolute optical black
  - Ultra-transparent architectural glass film
  - Quietly breathing ambient illumination
  - Subtle light refraction and surface reflection
  - Spacious intellectual workspace
  - Minimal visual noise
  - Responsive functional surfaces
  - Motion accessibility

  VISUAL LAYER ONLY

  No changes to:
  - ContinuityProvider
  - ContinuityEnvironment
  - Inquiry logic
  - Evidence review and promotion
  - Episteme Transfer
  - Portable State
  - Recovery
  - Existing commands
========================================================== */

export const metadata: Metadata = {
  title: "Aevum",

  description:
    "Carry questions, evidence, and reasoning across ArcheNova.",
};

/* ==========================================================
  AEVUM VISUAL SYSTEM
========================================================== */

const aevumStyles = `
 /* ========================================================
    01 / PAGE FOUNDATION
 ======================================================== */

 html:has(.continuity),
 body:has(.continuity) {
   min-height: 100%;
   background: #000000 !important;
   overflow-x: clip;
 }

 body:has(.continuity) {
   margin: 0;
 }

 body .continuity {
   --continuity-white: rgba(250,250,249,.98);
   --continuity-text: rgba(239,240,241,.88);
   --continuity-muted: rgba(224,227,231,.57);
   --continuity-faint: rgba(224,227,231,.38);
   --continuity-line: rgba(255,255,255,.13);
   --continuity-line-soft: rgba(255,255,255,.075);

   --aevum-black: #000000;
   --aevum-glass: rgba(255,255,255,.018);
   --aevum-glass-deep: rgba(255,255,255,.009);
   --aevum-glass-edge: rgba(255,255,255,.14);
   --aevum-glass-highlight: rgba(255,255,255,.08);

   --aevum-blur: blur(28px) saturate(115%);
   --aevum-ease: cubic-bezier(.22,1,.36,1);

   position: relative !important;
   isolation: isolate;

   left: 50% !important;
   width: 100vw !important;
   max-width: none !important;
   min-height: 100svh !important;

   margin: 0 0 0 -50vw !important;
   padding: 0 !important;

   box-sizing: border-box !important;
   overflow-x: clip;

   color: var(--continuity-text);

   background:
     radial-gradient(
       ellipse 76% 38% at 50% 7%,
       rgba(186,201,225,.047),
       transparent 74%
     ),
     radial-gradient(
       ellipse 42% 28% at 92% 48%,
       rgba(140,164,205,.021),
       transparent 80%
     ),
     radial-gradient(
       ellipse 48% 32% at 4% 78%,
       rgba(180,190,215,.017),
       transparent 80%
     ),
     linear-gradient(
       180deg,
       #020203 0%,
       #000000 42%,
       #030304 100%
     ) !important;

   font-family:
     Inter,
     ui-sans-serif,
     -apple-system,
     BlinkMacSystemFont,
     "Segoe UI",
     sans-serif;

   -webkit-font-smoothing: antialiased;
 }

 body .continuity,
 body .continuity * {
   box-sizing: border-box;
 }

 body .continuity::before {
   content: "";

   position: absolute;
   inset: 0;
   z-index: -1;

   pointer-events: none;

   background:
     radial-gradient(
       ellipse 54% 23% at 50% 10%,
       rgba(206,220,244,.047),
       transparent 78%
     ),
     radial-gradient(
       ellipse 33% 21% at 82% 56%,
       rgba(154,180,224,.025),
       transparent 82%
     );

   opacity: .68;

   animation:
     aevumAmbientBreath
     18s ease-in-out infinite;
 }

 body .continuity::after {
   content: "";

   position: absolute;
   inset: 0;
   z-index: -1;

   pointer-events: none;

   opacity: .16;

   background-image:
     linear-gradient(
       rgba(255,255,255,.014) 1px,
       transparent 1px
     ),
     linear-gradient(
       90deg,
       rgba(255,255,255,.014) 1px,
       transparent 1px
     );

   background-size: 96px 96px;

   mask-image:
     radial-gradient(
       ellipse 75% 46% at 50% 18%,
       #000,
       transparent 92%
     );

   -webkit-mask-image:
     radial-gradient(
       ellipse 75% 46% at 50% 18%,
       #000,
       transparent 92%
     );
 }

 /* ========================================================
    02 / ATMOSPHERIC BACKGROUND
 ======================================================== */

 body .continuity .continuity__background {
   position: absolute;
   inset: 0;
   z-index: -1;
   pointer-events: none;
   overflow: hidden;
 }

 body .continuity .continuity__stars {
   position: absolute;
   inset: -10%;

   opacity: .19;

   background-size:
     103px 103px,
     163px 163px;

   animation:
     aevumStarDrift
     90s linear infinite;
 }

 body .continuity .continuity__horizon {
   position: absolute;

   top: 3%;
   left: 50%;

   width: min(115vw, 1700px);
   height: min(115vw, 1700px);

   transform: translateX(-50%);

   border: 1px solid rgba(255,255,255,.042);
   border-radius: 50%;

   opacity: .72;

   box-shadow:
     0 0 110px rgba(175,195,225,.012),
     inset 0 0 95px rgba(255,255,255,.009);

   animation:
     aevumHorizonBreath
     24s ease-in-out infinite;
 }

 body .continuity .continuity__horizon::before,
 body .continuity .continuity__horizon::after {
   border-color: rgba(255,255,255,.025);
 }

 /* ========================================================
    03 / HEADER
 ======================================================== */

 body .continuity .continuity__header {
   position: relative;
   z-index: 20;

   display: grid;
   grid-template-columns: 1fr auto 1fr;
   align-items: center;

   min-height: 78px;

   padding:
     0 clamp(20px,4.5vw,90px);

   border-bottom:
     1px solid rgba(255,255,255,.085);

   background:
     linear-gradient(
       180deg,
       rgba(15,17,21,.40),
       rgba(3,4,6,.26)
     );

   backdrop-filter:
     blur(22px) saturate(110%);

   -webkit-backdrop-filter:
     blur(22px) saturate(110%);

   box-shadow:
     inset 0 1px 0 rgba(255,255,255,.045),
     0 12px 50px rgba(0,0,0,.12);
 }

 body .continuity .continuity__brand {
   display: inline-flex;
   align-items: center;

   gap: 12px;

   width: fit-content;

   color: rgba(255,255,255,.84);

   text-decoration: none;

   font-size: 10px;
   font-weight: 500;
   letter-spacing: .2em;

   transition:
     color .3s ease,
     opacity .3s ease;
 }

 body .continuity .continuity__brand:hover {
   color: #fff;
 }

 body .continuity .continuity__brand-mark {
   display: grid;
   place-items: center;

   width: 29px;
   height: 29px;

   border:
     1px solid rgba(255,255,255,.24);

   border-radius: 50%;

   background:
     radial-gradient(
       circle at 35% 20%,
       rgba(255,255,255,.085),
       rgba(255,255,255,.006) 75%
     );

   box-shadow:
     inset 0 1px 0 rgba(255,255,255,.10),
     0 0 20px rgba(255,255,255,.018);

   font-family:
     Georgia,
     "Times New Roman",
     serif;

   font-size: 14px;

   transition:
     border-color .4s ease,
     box-shadow .4s ease;
 }

 body .continuity .continuity__brand:hover
 .continuity__brand-mark {
   border-color: rgba(255,255,255,.48);

   box-shadow:
     inset 0 1px 0 rgba(255,255,255,.16),
     0 0 25px rgba(255,255,255,.055);
 }

 body .continuity .continuity__header-center {
   display: flex;
   align-items: center;

   gap: 17px;

   color: rgba(255,255,255,.61);

   font-size: 9px;
   letter-spacing: .3em;
 }

 body .continuity .continuity__header-line {
   width: 38px;
   height: 1px;

   background:
     linear-gradient(
       90deg,
       transparent,
       rgba(255,255,255,.26),
       transparent
     );
 }

 body .continuity .continuity__status {
   justify-self: end;

   display: flex;
   align-items: center;

   gap: 9px;

   color: rgba(255,255,255,.57);

   font-size: 8px;
   letter-spacing: .17em;
 }

 body .continuity .continuity__status-dot--ready {
   animation:
     aevumStatusPulse
     5s ease-in-out infinite;
 }

 /* ========================================================
    04 / FULL-WIDTH ENVIRONMENT
 ======================================================== */

 body .continuity .continuity__environment {
   position: relative;
   z-index: 2;

   width:
     calc(100% - clamp(36px,8vw,160px));

   max-width: 1760px;

   margin: 0 auto;

   padding:
     clamp(58px,7vw,112px)
     0
     76px;
 }

 /* ========================================================
    05 / AEVUM IDENTITY
 ======================================================== */

 body .continuity .continuity__intro {
   position: relative;

   width: min(100%,980px);

   margin: 0 auto;

   text-align: center;
 }

 body .continuity .continuity__intro::before {
   content: "";

   position: absolute;

   top: -90px;
   left: 50%;

   width: min(95vw,900px);
   height: 370px;

   transform: translateX(-50%);

   pointer-events: none;
   z-index: -1;

   background:
     radial-gradient(
       ellipse at center,
       rgba(195,211,235,.062),
       rgba(130,160,205,.017) 43%,
       transparent 74%
     );

   filter: blur(30px);

   animation:
     aevumIntroBreath
     15s ease-in-out infinite;
 }

 body .continuity .continuity__eyebrow {
   color: rgba(255,255,255,.51);

   font-size: 9px;
   font-weight: 500;
   letter-spacing: .29em;
 }

 body .continuity .continuity__title {
   margin: 27px 0 0;

   color: #f5f3ef;

   font-family:
     Georgia,
     "Times New Roman",
     serif;

   font-size:
     clamp(76px,10vw,152px);

   font-weight: 400;
   line-height: .92;
   letter-spacing: -.065em;

   text-shadow:
     0 0 65px rgba(255,255,255,.055);
 }

 body .continuity .continuity__thesis {
   margin: 32px 0 0;

   color: rgba(255,255,255,.87);

   font-family:
     Georgia,
     "Times New Roman",
     serif;

   font-size:
     clamp(23px,2.7vw,38px);

   font-weight: 400;
   line-height: 1.25;
   letter-spacing: -.028em;
 }

 body .continuity .continuity__definition {
   width: min(100%,600px);

   margin: 22px auto 0;

   color: rgba(255,255,255,.55);

   font-size:
     clamp(12px,1.15vw,14px);

   line-height: 1.9;
   letter-spacing: .02em;
 }

 /* ========================================================
    06 / BEGIN INQUIRY
 ======================================================== */

 body .continuity .continuity__origin {
   width: min(100%,1450px);

   margin:
     clamp(64px,7vw,110px)
     auto
     0;
 }

 body .continuity .continuity__origin-line {
   color: rgba(255,255,255,.39);
 }

 body .continuity .continuity__origin-core {
   position: relative;
   isolation: isolate;

   width: min(100%,1050px);

   margin:
     clamp(35px,5vw,75px)
     auto;

   padding:
     clamp(40px,6vw,90px);

   border:
     1px solid rgba(255,255,255,.13);

   border-radius: 32px;

   background:
     radial-gradient(
       ellipse 85% 85% at 50% -12%,
       rgba(255,255,255,.068),
       transparent 76%
     ),
     linear-gradient(
       145deg,
       rgba(255,255,255,.032),
       rgba(255,255,255,.007) 55%,
       rgba(255,255,255,.015)
     );

   backdrop-filter:
     blur(28px) saturate(115%);

   -webkit-backdrop-filter:
     blur(28px) saturate(115%);

   box-shadow:
     inset 0 1px 0 rgba(255,255,255,.13),
     inset 0 -1px 0 rgba(255,255,255,.025),
     0 35px 100px rgba(0,0,0,.18),
     0 0 70px rgba(195,210,235,.014);

   transition:
     border-color .6s ease,
     box-shadow .6s ease,
     background .6s ease;
 }

 body .continuity .continuity__origin-core::before {
   content: "";

   position: absolute;
   inset: 1px;

   z-index: -1;
   pointer-events: none;

   border-radius: inherit;

   background:
     linear-gradient(
       115deg,
       rgba(255,255,255,.055),
       transparent 26%,
       transparent 74%,
       rgba(255,255,255,.018)
     );

   opacity: .58;

   animation:
     aevumGlassBreath
     16s ease-in-out infinite;
 }

 body .continuity .continuity__origin-core::after {
   content: "";

   position: absolute;

   top: 0;
   left: 14%;
   right: 14%;

   height: 1px;

   pointer-events: none;

   background:
     linear-gradient(
       90deg,
       transparent,
       rgba(255,255,255,.34),
       transparent
     );

   opacity: .52;
 }

 body .continuity .continuity__origin-core:hover {
   border-color: rgba(255,255,255,.20);

   box-shadow:
     inset 0 1px 0 rgba(255,255,255,.17),
     0 40px 115px rgba(0,0,0,.22),
     0 0 90px rgba(195,210,235,.025);
 }

 body .continuity .continuity__origin-core h2 {
   margin-top: 23px;

   color: #f4f2ef;

   font-size:
     clamp(36px,4.8vw,68px);

   line-height: 1.08;
 }

 body .continuity .continuity__origin-description {
   max-width: 600px;

   margin:
     25px auto 0;

   color: rgba(255,255,255,.55);

   font-size: 13px;
   line-height: 1.85;
 }

 body .continuity .continuity__begin {
   margin-top: 35px;

   padding: 14px 0;

   color: rgba(255,255,255,.87);

   font-size: 9px;
   letter-spacing: .2em;
 }

 body .continuity .continuity__begin:hover {
   color: #fff;
 }

 body .continuity .continuity__begin svg {
   transition:
     transform .4s var(--aevum-ease),
     opacity .4s ease;
 }

 body .continuity .continuity__begin:hover svg {
   transform: translateX(7px);
 }

 body .continuity .continuity__origin-principle {
   gap: 15px;

   border-top:
     1px solid rgba(255,255,255,.085);
 }

 /* ========================================================
    07 / COMPOSER
    NO NESTED GLASS
 ======================================================== */

 body .continuity .continuity__origin-core
 .continuity__composer {
   width: min(100%,740px);

   margin: 37px auto 0;

   padding: 26px 0 0;

   border: 0;

   border-top:
     1px solid rgba(255,255,255,.11);

   border-radius: 0;

   background: transparent;

   backdrop-filter: none;
   -webkit-backdrop-filter: none;

   box-shadow: none;
 }

 body .continuity .continuity__composer textarea,
 body .continuity .continuity__composer input {
   color: rgba(255,255,255,.91);

   border-bottom-color:
     rgba(255,255,255,.17);

   transition:
     border-color .3s ease;
 }

 body .continuity .continuity__composer textarea:focus,
 body .continuity .continuity__composer input:focus {
   border-bottom-color:
     rgba(255,255,255,.58);
 }

 body .continuity .continuity__composer textarea::placeholder,
 body .continuity .continuity__composer input::placeholder {
   color: rgba(255,255,255,.30);
 }

 /* ========================================================
    08 / ACTIVE INQUIRY
 ======================================================== */

 body .continuity .continuity__field {
   position: relative;

   display: grid;

   grid-template-columns:
     repeat(2,minmax(0,1fr));

   gap: clamp(14px,2vw,28px);

   width: min(100%,1520px);

   min-height: 0;

   margin:
     clamp(66px,8vw,115px)
     auto
     0;
 }

 body .continuity .continuity__field-axis {
   display: none;
 }

 /* ========================================================
    09 / QUESTION GLASS
 ======================================================== */

 body .continuity .continuity__question {
   position: relative;
   isolation: isolate;

   top: auto;
   left: auto;

   grid-column: 1 / -1;

   order: 0;

   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;

   width: 100%;
   min-height: 310px;
   height: auto;

   margin: 0;

   padding:
     clamp(44px,5.5vw,86px);

   transform: none;

   border:
     1px solid rgba(255,255,255,.135);

   border-radius: 32px;

   background:
     radial-gradient(
       ellipse 72% 95% at 50% -12%,
       rgba(255,255,255,.075),
       transparent 76%
     ),
     linear-gradient(
       145deg,
       rgba(255,255,255,.037),
       rgba(255,255,255,.008) 52%,
       rgba(255,255,255,.016)
     );

   backdrop-filter:
     blur(30px) saturate(115%);

   -webkit-backdrop-filter:
     blur(30px) saturate(115%);

   box-shadow:
     inset 0 1px 0 rgba(255,255,255,.14),
     inset 0 -1px 0 rgba(255,255,255,.025),
     0 40px 120px rgba(0,0,0,.20),
     0 0 90px rgba(190,210,240,.016);

   text-align: center;

   transition:
     border-color .6s ease,
     box-shadow .6s ease;
 }

 body .continuity .continuity__question::before {
   content: "";

   position: absolute;
   inset: 0;

   z-index: -1;
   pointer-events: none;

   border-radius: inherit;

   background:
     radial-gradient(
       ellipse 50% 55% at 50% 6%,
       rgba(225,234,250,.055),
       transparent 80%
     );

   opacity: .50;

   animation:
     aevumQuestionBreath
     17s ease-in-out infinite;
 }

 body .continuity .continuity__question::after {
   content: "";

   position: absolute;

   top: 0;
   left: 13%;
   right: 13%;

   height: 1px;

   pointer-events: none;

   background:
     linear-gradient(
       90deg,
       transparent,
       rgba(255,255,255,.43),
       transparent
     );

   opacity: .62;
 }

 body .continuity .continuity__question:hover {
   border-color: rgba(255,255,255,.20);

   box-shadow:
     inset 0 1px 0 rgba(255,255,255,.18),
     0 45px 130px rgba(0,0,0,.24),
     0 0 100px rgba(190,210,240,.03);
 }

 body .continuity .continuity__question-orbit {
   position: absolute;

   inset: 19px;

   border:
     1px solid rgba(255,255,255,.045);

   border-radius: 24px;

   pointer-events: none;
 }

 body .continuity .continuity__question-orbit--inner {
   inset: 37px;

   border-color:
     rgba(255,255,255,.025);
 }

 body .continuity .continuity__question h2 {
   max-width: 1080px;

   margin-top: 24px;

   color: #f5f3ef;

   font-size:
     clamp(31px,4vw,58px);

   line-height: 1.17;

   overflow-wrap: anywhere;

   text-shadow:
     0 0 45px rgba(255,255,255,.035);
 }

 body .continuity .continuity__purpose {
   max-width: 760px;

   color: rgba(255,255,255,.62);

   font-size:
     clamp(12px,1.15vw,15px);

   line-height: 1.8;
 }

 body .continuity .continuity__scope {
   overflow-wrap: anywhere;
 }

 /* ========================================================
    10 / FUNCTIONAL SATELLITES
 ======================================================== */

 body .continuity .continuity__satellite {
   position: relative;
   isolation: isolate;

   top: auto;
   right: auto;
   bottom: auto;
   left: auto;

   display: block;

   width: 100%;
   min-height: 126px;

   margin: 0;

   padding: 24px 27px;

   border:
     1px solid rgba(255,255,255,.105);

   border-radius: 20px;

   background:
     radial-gradient(
       ellipse 80% 80% at 20% 0%,
       rgba(255,255,255,.043),
       transparent 80%
     ),
     linear-gradient(
       145deg,
       rgba(255,255,255,.024),
       rgba(255,255,255,.006)
     );

   backdrop-filter:
     blur(22px) saturate(110%);

   -webkit-backdrop-filter:
     blur(22px) saturate(110%);

   box-shadow:
     inset 0 1px 0 rgba(255,255,255,.065),
     0 18px 45px rgba(0,0,0,.10);

   text-align: left;

   transition:
     transform .4s var(--aevum-ease),
     border-color .4s ease,
     background .4s ease,
     box-shadow .4s ease;
 }

 body .continuity .continuity__satellite::before {
   top: 28px;
   left: auto;
   right: 25px;

   width: 5px;
   height: 5px;

   background:
     rgba(255,255,255,.62);

   box-shadow:
     0 0 12px rgba(255,255,255,.12);
 }

 body .continuity .continuity__satellite:hover {
   transform: translateY(-4px);

   border-color:
     rgba(255,255,255,.23);

   background:
     radial-gradient(
       ellipse 80% 80% at 20% 0%,
       rgba(255,255,255,.064),
       transparent 80%
     ),
     linear-gradient(
       145deg,
       rgba(255,255,255,.035),
       rgba(255,255,255,.009)
     );

   box-shadow:
     inset 0 1px 0 rgba(255,255,255,.11),
     0 25px 65px rgba(0,0,0,.17),
     0 0 45px rgba(195,210,235,.018);
 }

 body .continuity .continuity__satellite:active {
   transform: translateY(-1px);
 }

 body .continuity .continuity__satellite-main b {
   font-size: 31px;
 }

 body .continuity .continuity__satellite p {
   max-width: 100%;

   color: rgba(255,255,255,.49);
 }

 /* ========================================================
    11 / MODE NAVIGATION
 ======================================================== */

 body .continuity .continuity__modes {
   display: grid;

   grid-template-columns:
     repeat(5,minmax(0,1fr));

   width: min(100%,1520px);

   margin: 45px auto 0;

   border:
     1px solid rgba(255,255,255,.085);

   border-radius: 17px;

   background:
     linear-gradient(
       145deg,
       rgba(255,255,255,.024),
       rgba(255,255,255,.006)
     );

   backdrop-filter:
     blur(20px) saturate(110%);

   -webkit-backdrop-filter:
     blur(20px) saturate(110%);

   box-shadow:
     inset 0 1px 0 rgba(255,255,255,.045);
 }

 body .continuity .continuity__mode {
   position: relative;

   padding: 23px 12px;

   color: rgba(255,255,255,.44);

   font-size: 9px;
   letter-spacing: .2em;

   transition:
     color .3s ease,
     background .3s ease;
 }

 body .continuity .continuity__mode + .continuity__mode {
   border-left:
     1px solid rgba(255,255,255,.055);
 }

 body .continuity .continuity__mode--active {
   color: #f2f0ed;

   background:
     linear-gradient(
       180deg,
       rgba(255,255,255,.065),
       rgba(255,255,255,.012)
     );
 }

 body .continuity .continuity__mode--active i {
   background: rgba(255,255,255,.88);

   box-shadow:
     0 0 18px rgba(255,255,255,.19);
 }

 body .continuity .continuity__mode:hover {
   color: rgba(255,255,255,.92);

   background:
     rgba(255,255,255,.032);
 }

 /* ========================================================
    12 / WORKSPACE
 ======================================================== */

 body .continuity .continuity__workspace {
   width: min(100%,1520px);

   margin:
     clamp(30px,4vw,64px)
     auto
     0;
 }

 body .continuity .continuity__mode-environment,
 body .continuity .continuity__evidence-environment {
   position: relative;
   isolation: isolate;

   padding:
     clamp(34px,4vw,66px);

   border:
     1px solid rgba(255,255,255,.12);

   border-radius: 30px;

   background:
     radial-gradient(
       ellipse 70% 60% at 20% 0%,
       rgba(255,255,255,.048),
       transparent 80%
     ),
     linear-gradient(
       145deg,
       rgba(255,255,255,.029),
       rgba(255,255,255,.006) 60%,
       rgba(255,255,255,.014)
     );

   backdrop-filter:
     blur(28px) saturate(112%);

   -webkit-backdrop-filter:
     blur(28px) saturate(112%);

   box-shadow:
     inset 0 1px 0 rgba(255,255,255,.10),
     inset 0 -1px 0 rgba(255,255,255,.02),
     0 35px 110px rgba(0,0,0,.16);
 }

 body .continuity .continuity__mode-environment::before,
 body .continuity .continuity__evidence-environment::before {
   content: "";

   position: absolute;
   inset: 0;

   z-index: -1;
   pointer-events: none;

   border-radius: inherit;

   background:
     radial-gradient(
       ellipse 65% 55% at 75% 5%,
       rgba(215,226,244,.038),
       transparent 78%
     );

   opacity: .45;

   animation:
     aevumGlassBreath
     20s ease-in-out infinite;
 }

 body .continuity .continuity__mode-environment::after,
 body .continuity .continuity__evidence-environment::after {
   content: "";

   position: absolute;

   top: 0;
   left: 10%;
   right: 10%;

   height: 1px;

   pointer-events: none;

   background:
     linear-gradient(
       90deg,
       transparent,
       rgba(255,255,255,.28),
       transparent
     );

   opacity: .55;
 }

 body .continuity .continuity__mode-environment {
   grid-template-columns:
     minmax(100px,.35fr)
     minmax(0,1.65fr);

   gap: clamp(28px,4vw,75px);
 }

 body .continuity .continuity__mode-copy h3,
 body .continuity .continuity__evidence-intro h3 {
   color: #f3f1ee;

   font-size:
     clamp(31px,3.4vw,48px);
 }

 body .continuity .continuity__mode-state,
 body .continuity .continuity__evidence-metrics {
   background:
     rgba(255,255,255,.075);
 }

 body .continuity .continuity__mode-state div,
 body .continuity .continuity__evidence-metric {
   background:
     linear-gradient(
       145deg,
       rgba(255,255,255,.021),
       rgba(255,255,255,.005)
     );
 }

 body .continuity .continuity__mode-state strong,
 body .continuity .continuity__evidence-metric strong {
   color: rgba(255,255,255,.88);
 }

 /* ========================================================
    13 / EVIDENCE WORKSPACE
 ======================================================== */

 body .continuity .continuity__evidence-header {
   gap: clamp(30px,5vw,90px);
 }

 body .continuity .continuity__knowledge-search {
   margin-top:
     clamp(46px,6vw,82px);

   padding:
     clamp(30px,4vw,54px)
     0
     0;

   border: 0;

   border-top:
     1px solid rgba(255,255,255,.11);

   border-radius: 0;

   background: transparent;

   backdrop-filter: none;
   -webkit-backdrop-filter: none;

   box-shadow: none;
 }

 body .continuity .continuity__review {
   margin-top: 28px;

   padding:
     clamp(28px,4vw,42px)
     0
     0;

   border: 0;

   border-top:
     1px solid rgba(255,255,255,.11);

   border-radius: 0;

   background: transparent;

   backdrop-filter: none;
   -webkit-backdrop-filter: none;

   box-shadow: none;
 }

 body .continuity .continuity__candidate {
   grid-template-columns:
     minmax(0,1fr)
     auto;

   transition:
     background .3s ease,
     border-color .3s ease;
 }

 body .continuity .continuity__candidate:hover {
   background:
     rgba(255,255,255,.012);
 }

 body .continuity .continuity__candidate h5,
 body .continuity .continuity__evidence-item h5 {
   overflow-wrap: anywhere;
 }

 body .continuity .continuity__review-option {
   transition:
     color .25s ease,
     border-color .25s ease,
     background .25s ease,
     box-shadow .25s ease;
 }

 body .continuity .continuity__review-option:hover {
   border-color:
     rgba(255,255,255,.28);

   color: rgba(255,255,255,.88);

   background:
     rgba(255,255,255,.035);
 }

 body .continuity .continuity__review-option--active {
   border-color:
     rgba(255,255,255,.34);

   color: rgba(255,255,255,.91);

   background:
     rgba(255,255,255,.055);

   box-shadow:
     inset 0 1px 0 rgba(255,255,255,.055);
 }

 body .continuity .continuity__knowledge-form input,
 body .continuity .continuity__review-field input,
 body .continuity .continuity__review-field textarea {
   transition:
     border-color .3s ease;
 }

 body .continuity .continuity__knowledge-form input:focus,
 body .continuity .continuity__review-field input:focus,
 body .continuity .continuity__review-field textarea:focus {
   border-bottom-color:
     rgba(255,255,255,.58);
 }

 body .continuity .continuity__evidence-item {
   transition:
     background .3s ease;
 }

 body .continuity .continuity__evidence-item:hover {
   background:
     rgba(255,255,255,.009);
 }

 /* ========================================================
    14 / REALITY CHECK
 ======================================================== */

 body .continuity .continuity__reality {
   position: relative;
   isolation: isolate;

   width: min(100%,1520px);

   margin:
     clamp(48px,6vw,94px)
     auto
     0;

   padding:
     clamp(32px,4vw,60px);

   border:
     1px solid rgba(255,255,255,.12);

   border-radius: 30px;

   background:
     radial-gradient(
       ellipse 75% 70% at 15% 0%,
       rgba(255,255,255,.049),
       transparent 80%
     ),
     linear-gradient(
       145deg,
       rgba(255,255,255,.029),
       rgba(255,255,255,.007)
     );

   backdrop-filter:
     blur(28px) saturate(112%);

   -webkit-backdrop-filter:
     blur(28px) saturate(112%);

   box-shadow:
     inset 0 1px 0 rgba(255,255,255,.10),
     0 30px 95px rgba(0,0,0,.15);
 }

 body .continuity .continuity__reality::before {
   content: "";

   position: absolute;
   inset: 0;

   z-index: -1;
   pointer-events: none;

   border-radius: inherit;

   background:
     radial-gradient(
       ellipse 60% 65% at 75% 0%,
       rgba(205,222,247,.039),
       transparent 80%
     );

   opacity: .48;

   animation:
     aevumGlassBreath
     22s ease-in-out infinite;
 }

 body .continuity .continuity__reality::after {
   content: "";

   position: absolute;

   top: 0;
   left: 12%;
   right: 12%;

   height: 1px;

   pointer-events: none;

   background:
     linear-gradient(
       90deg,
       transparent,
       rgba(255,255,255,.29),
       transparent
     );
 }

 body .continuity .continuity__reality-content > p {
   color: rgba(255,255,255,.89);
 }

 /* ========================================================
    15 / FOOTER
 ======================================================== */

 body .continuity .continuity__footer {
   width: min(100%,1520px);

   margin-top: 55px;

   border-top:
     1px solid rgba(255,255,255,.095);
 }

 body .continuity .continuity__footer p {
   color: rgba(255,255,255,.53);

   font-size: 13px;
 }

 body .continuity .continuity__footer button {
   transition:
     color .25s ease;
 }

 /* ========================================================
    16 / INTERACTION ACCESSIBILITY
 ======================================================== */

 body .continuity a:focus-visible,
 body .continuity button:focus-visible,
 body .continuity input:focus-visible,
 body .continuity textarea:focus-visible {
   outline:
     2px solid rgba(255,255,255,.82);

   outline-offset: 4px;
 }

 body .continuity button,
 body .continuity a {
   -webkit-tap-highlight-color: transparent;
 }

 body .continuity input,
 body .continuity textarea {
   caret-color: rgba(255,255,255,.92);
 }

 /* ========================================================
    17 / TABLET
 ======================================================== */

 @media (max-width: 900px) {
   body .continuity .continuity__environment {
     width: calc(100% - 48px);
   }

   body .continuity .continuity__field {
     grid-template-columns:
       repeat(2,minmax(0,1fr));

     min-height: 0;
   }

   body .continuity .continuity__question {
     width: 100%;
     min-height: 300px;
   }

   body .continuity .continuity__mode-environment {
     grid-template-columns: 1fr;
     gap: 28px;
   }
 }

 /* ========================================================
    18 / MOBILE
 ======================================================== */

 @media (max-width: 700px) {
   body .continuity .continuity__header {
     min-height: 64px;
     padding: 0 18px;
   }

   body .continuity .continuity__header-center {
     display: none;
   }

   body .continuity .continuity__environment {
     width: calc(100% - 32px);

     padding:
       55px
       0
       45px;
   }

   body .continuity .continuity__intro::before {
     top: -45px;
     height: 260px;
     filter: blur(20px);
   }

   body .continuity .continuity__title {
     font-size:
       clamp(65px,19vw,94px);
   }

   body .continuity .continuity__thesis {
     margin-top: 25px;

     font-size:
       clamp(22px,6vw,29px);
   }

   body .continuity .continuity__origin {
     margin-top: 60px;
   }

   body .continuity .continuity__origin-core {
     padding: 43px 23px;

     border-radius: 24px;
   }

   body .continuity .continuity__origin-core h2 {
     font-size:
       clamp(32px,8vw,44px);
   }

   body .continuity .continuity__origin-description {
     font-size: 12px;
   }

   body .continuity .continuity__field {
     display: grid;

     grid-template-columns:
       repeat(2,minmax(0,1fr));

     gap: 10px;

     min-height: 0;

     margin-top: 65px;
   }

   body .continuity .continuity__question {
     position: relative;

     grid-column: 1 / -1;

     width: 100%;
     min-height: 275px;

     margin: 0;

     padding: 45px 24px;

     transform: none;

     border-radius: 24px;
   }

   body .continuity .continuity__question-orbit {
     inset: 12px;
     border-radius: 17px;
   }

   body .continuity .continuity__question-orbit--inner {
     inset: 24px;
   }

   body .continuity .continuity__question h2 {
     font-size:
       clamp(27px,7.5vw,38px);
   }

   body .continuity .continuity__satellite {
     position: relative;

     top: auto;
     right: auto;
     bottom: auto;
     left: auto;

     width: 100%;
     min-height: 116px;

     margin: 0;

     padding: 20px 16px;

     border:
       1px solid rgba(255,255,255,.11);

     border-radius: 17px;
   }

   body .continuity .continuity__satellite::before {
     top: 20px;
     left: auto;
     right: 13px;
   }

   body .continuity .continuity__satellite-main {
     flex-wrap: wrap;
     gap: 5px 9px;
   }

   body .continuity .continuity__satellite-main strong {
     font-size: 8px;
   }

   body .continuity .continuity__satellite-main b {
     font-size: 26px;
   }

   body .continuity .continuity__satellite p {
     font-size: 8px;
   }

   body .continuity .continuity__modes {
     display: grid;

     grid-template-columns:
       repeat(5,minmax(105px,1fr));

     margin-top: 30px;

     overflow-x: auto;

     scrollbar-width: none;

     border-radius: 15px;
   }

   body .continuity .continuity__modes::-webkit-scrollbar {
     display: none;
   }

   body .continuity .continuity__mode-environment,
   body .continuity .continuity__evidence-environment {
     padding: 30px 21px;
     border-radius: 23px;
   }

   body .continuity .continuity__evidence-header {
     grid-template-columns: 1fr;
   }

   body .continuity .continuity__knowledge-search {
     padding: 30px 0 0;
   }

   body .continuity .continuity__knowledge-search-head {
     flex-direction: column;
   }

   body .continuity .continuity__knowledge-form {
     grid-template-columns: 1fr;
   }

   body .continuity .continuity__candidate {
     grid-template-columns: 1fr;
   }

   body .continuity .continuity__review {
     padding: 27px 0 0;
   }

   body .continuity .continuity__review-grid {
     grid-template-columns: 1fr;
   }

   body .continuity .continuity__reality {
     padding: 30px 23px;
     border-radius: 23px;
   }

   body .continuity .continuity__reality-content {
     grid-template-columns: 1fr;
   }

   body .continuity .continuity__footer {
     flex-direction: column;
     align-items: flex-start;
   }
 }

 /* ========================================================
    19 / SMALL MOBILE
 ======================================================== */

 @media (max-width: 430px) {
   body .continuity .continuity__question {
     width: 100%;
     min-height: 270px;
     padding: 38px 20px;
   }

   body .continuity .continuity__question h2 {
     font-size:
       clamp(24px,7vw,34px);
   }

   body .continuity .continuity__satellite {
     padding: 18px 13px;
   }

   body .continuity .continuity__satellite-main strong {
     font-size: 7px;
     letter-spacing: .12em;
   }

   body .continuity .continuity__satellite p {
     font-size: 7px;
   }

   body .continuity .continuity__mode-state,
   body .continuity .continuity__evidence-metrics {
     grid-template-columns:
       repeat(3,minmax(0,1fr));
   }

   body .continuity .continuity__mode-state div,
   body .continuity .continuity__evidence-metric {
     min-width: 0;
     padding: 15px 5px;
   }

   body .continuity .continuity__mode-state span,
   body .continuity .continuity__evidence-metric span {
     font-size: 6px;
     overflow-wrap: anywhere;
   }
 }

 /* ========================================================
    20 / LIVING MOTION SYSTEM
 ======================================================== */

 @keyframes aevumAmbientBreath {
   0%, 100% {
     opacity: .48;
     transform: scale(1);
   }

   50% {
     opacity: .88;
     transform: scale(1.035);
   }
 }

 @keyframes aevumIntroBreath {
   0%, 100% {
     opacity: .50;
     transform:
       translateX(-50%)
       scale(.96);
   }

   50% {
     opacity: .90;
     transform:
       translateX(-50%)
       scale(1.045);
   }
 }

 @keyframes aevumGlassBreath {
   0%, 100% {
     opacity: .30;
   }

   50% {
     opacity: .72;
   }
 }

 @keyframes aevumQuestionBreath {
   0%, 100% {
     opacity: .30;
     transform: scale(.99);
   }

   50% {
     opacity: .75;
     transform: scale(1.015);
   }
 }

 @keyframes aevumHorizonBreath {
   0%, 100% {
     opacity: .48;
     transform:
       translateX(-50%)
       scale(.99);
   }

   50% {
     opacity: .80;
     transform:
       translateX(-50%)
       scale(1.025);
   }
 }

 @keyframes aevumStarDrift {
   0% {
     background-position:
       0 0,
       31px 43px;
   }

   100% {
     background-position:
       103px 103px,
       194px 206px;
   }
 }

 @keyframes aevumStatusPulse {
   0%, 100% {
     opacity: .62;
     box-shadow:
       0 0 7px rgba(255,255,255,.08);
   }

   50% {
     opacity: 1;
     box-shadow:
       0 0 15px rgba(255,255,255,.23);
   }
 }

 /* ========================================================
    21 / GLASS COMPATIBILITY
 ======================================================== */

 @supports not (
   (backdrop-filter: blur(1px)) or
   (-webkit-backdrop-filter: blur(1px))
 ) {
   body .continuity .continuity__header,
   body .continuity .continuity__origin-core,
   body .continuity .continuity__question,
   body .continuity .continuity__satellite,
   body .continuity .continuity__modes,
   body .continuity .continuity__mode-environment,
   body .continuity .continuity__evidence-environment,
   body .continuity .continuity__reality {
     background-color:
       rgba(14,15,18,.90);
   }
 }

 /* ========================================================
    22 / REDUCED MOTION
 ======================================================== */

 @media (prefers-reduced-motion: reduce) {
   body .continuity *,
   body .continuity *::before,
   body .continuity *::after,
   body .continuity::before,
   body .continuity::after {
     animation: none !important;
     transition: none !important;
     scroll-behavior: auto !important;
   }
 }
`;

/* ==========================================================
  PAGE
========================================================== */

export default function ContinuityPage() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: aevumStyles,
        }}
      />

      <ContinuityProvider>
        <ContinuityEnvironment />
      </ContinuityProvider>
    </>
  );
}