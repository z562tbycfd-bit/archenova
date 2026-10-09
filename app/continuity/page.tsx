import type { Metadata } from "next";

import { ContinuityProvider } from "./ContinuityProvider";
import ContinuityEnvironment from "./components/ContinuityEnvironment";

/* ==========================================================
  ARCHENOVA AEVUM
  INDEPENDENT INTELLECTUAL ENVIRONMENT

  Public identity:
  Aevum

  Architectural foundation:
  Continuity

  Design philosophy:
  - Full-viewport optical black
  - Transparent architectural glass
  - Spacious intellectual workspace
  - Minimal visual noise
  - Responsive functional surfaces

  All page-specific visual overrides
  are contained in this file.

  Existing Continuity logic remains unchanged.
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
   background: #050506 !important;
   overflow-x: clip;
 }

 body:has(.continuity) {
   margin: 0;
 }

 body .continuity {
   --continuity-white: rgba(248,248,246,.97);
   --continuity-text: rgba(238,238,234,.84);
   --continuity-muted: rgba(224,224,218,.51);
   --continuity-faint: rgba(224,224,218,.32);
   --continuity-line: rgba(255,255,255,.11);
   --continuity-line-soft: rgba(255,255,255,.065);

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
       ellipse 70% 42% at 50% 13%,
       rgba(255,255,255,.055),
       transparent 75%
     ),
     radial-gradient(
       ellipse 42% 30% at 86% 65%,
       rgba(255,255,255,.017),
       transparent 80%
     ),
     linear-gradient(
       180deg,
       #0a0a0b 0%,
       #050506 46%,
       #09090a 100%
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

   opacity: .16;

   background-size:
     103px 103px,
     163px 163px;
 }

 body .continuity .continuity__horizon {
   position: absolute;

   top: 3%;
   left: 50%;

   width: min(115vw, 1700px);
   height: min(115vw, 1700px);

   transform: translateX(-50%);

   border: 1px solid rgba(255,255,255,.035);
   border-radius: 50%;

   opacity: .72;
   box-shadow: none;
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
     1px solid rgba(255,255,255,.07);

   background:
     rgba(5,5,6,.42);

   backdrop-filter:
     blur(18px) saturate(80%);

   -webkit-backdrop-filter:
     blur(18px) saturate(80%);
 }

 body .continuity .continuity__brand {
   display: inline-flex;
   align-items: center;

   gap: 12px;

   width: fit-content;

   color: rgba(255,255,255,.8);

   text-decoration: none;

   font-size: 10px;
   font-weight: 500;
   letter-spacing: .2em;

   transition: color .2s ease;
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
     1px solid rgba(255,255,255,.2);

   border-radius: 50%;

   font-family:
     Georgia,
     "Times New Roman",
     serif;

   font-size: 14px;
 }

 body .continuity .continuity__header-center {
   display: flex;
   align-items: center;

   gap: 17px;

   color: rgba(255,255,255,.57);

   font-size: 9px;
   letter-spacing: .3em;
 }

 body .continuity .continuity__header-line {
   width: 38px;
   height: 1px;

   background:
     rgba(255,255,255,.14);
 }

 body .continuity .continuity__status {
   justify-self: end;

   display: flex;
   align-items: center;

   gap: 9px;

   color: rgba(255,255,255,.5);

   font-size: 8px;
   letter-spacing: .17em;
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
   width: min(100%,980px);

   margin: 0 auto;

   text-align: center;
 }

 body .continuity .continuity__eyebrow {
   color: rgba(255,255,255,.46);

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
 }

 body .continuity .continuity__thesis {
   margin: 32px 0 0;

   color: rgba(255,255,255,.85);

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

   color: rgba(255,255,255,.49);

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
   color: rgba(255,255,255,.34);
 }

 body .continuity .continuity__origin-core {
   width: min(100%,1050px);

   margin:
     clamp(35px,5vw,75px)
     auto;

   padding:
     clamp(40px,6vw,90px);

   border:
     1px solid rgba(255,255,255,.09);

   border-radius: 32px;

   background:
     radial-gradient(
       ellipse 75% 75% at 50% 0%,
       rgba(255,255,255,.045),
       transparent 75%
     ),
     linear-gradient(
       145deg,
       rgba(255,255,255,.034),
       rgba(255,255,255,.008)
     );

   backdrop-filter:
     blur(26px) saturate(85%);

   -webkit-backdrop-filter:
     blur(26px) saturate(85%);

   box-shadow:
     inset 0 1px 0
     rgba(255,255,255,.05);
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

   color: rgba(255,255,255,.49);

   font-size: 13px;
   line-height: 1.85;
 }

 body .continuity .continuity__begin {
   margin-top: 35px;

   padding: 14px 0;

   color: rgba(255,255,255,.85);

   font-size: 9px;
   letter-spacing: .2em;
 }

 body .continuity .continuity__begin:hover {
   color: #fff;
 }

 body .continuity .continuity__origin-principle {
   gap: 15px;

   border-top:
     1px solid rgba(255,255,255,.07);
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
     1px solid rgba(255,255,255,.08);

   border-radius: 0;

   background: transparent;

   backdrop-filter: none;
   -webkit-backdrop-filter: none;

   box-shadow: none;
 }

 body .continuity .continuity__composer textarea,
 body .continuity .continuity__composer input {
   color: rgba(255,255,255,.88);

   border-bottom-color:
     rgba(255,255,255,.14);
 }

 body .continuity .continuity__composer textarea:focus,
 body .continuity .continuity__composer input:focus {
   border-bottom-color:
     rgba(255,255,255,.46);
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
     1px solid rgba(255,255,255,.095);

   border-radius: 32px;

   background:
     radial-gradient(
       ellipse 65% 90% at 50% 0%,
       rgba(255,255,255,.052),
       transparent 78%
     ),
     linear-gradient(
       145deg,
       rgba(255,255,255,.034),
       rgba(255,255,255,.009)
     );

   backdrop-filter:
     blur(26px) saturate(85%);

   -webkit-backdrop-filter:
     blur(26px) saturate(85%);

   box-shadow:
     inset 0 1px 0
     rgba(255,255,255,.05);

   text-align: center;
 }

 body .continuity .continuity__question-orbit {
   position: absolute;

   inset: 19px;

   border:
     1px solid rgba(255,255,255,.034);

   border-radius: 24px;

   pointer-events: none;
 }

 body .continuity .continuity__question-orbit--inner {
   inset: 37px;

   border-color:
     rgba(255,255,255,.018);
 }

 body .continuity .continuity__question h2 {
   max-width: 1080px;

   margin-top: 24px;

   color: #f5f3ef;

   font-size:
     clamp(31px,4vw,58px);

   line-height: 1.17;

   overflow-wrap: anywhere;
 }

 body .continuity .continuity__purpose {
   max-width: 760px;

   color: rgba(255,255,255,.56);

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
     1px solid rgba(255,255,255,.08);

   border-radius: 20px;

   background:
     rgba(255,255,255,.018);

   text-align: left;

   transition:
     transform .22s ease,
     border-color .22s ease,
     background .22s ease;
 }

 body .continuity .continuity__satellite::before {
   top: 28px;
   left: auto;
   right: 25px;

   width: 5px;
   height: 5px;

   background:
     rgba(255,255,255,.44);
 }

 body .continuity .continuity__satellite:hover {
   transform: translateY(-2px);

   border-color:
     rgba(255,255,255,.2);

   background:
     rgba(255,255,255,.04);
 }

 body .continuity .continuity__satellite-main b {
   font-size: 31px;
 }

 body .continuity .continuity__satellite p {
   max-width: 100%;

   color: rgba(255,255,255,.42);
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

   border-top:
     1px solid rgba(255,255,255,.1);

   border-bottom:
     1px solid rgba(255,255,255,.06);
 }

 body .continuity .continuity__mode {
   padding: 23px 12px;

   color: rgba(255,255,255,.38);

   font-size: 9px;
   letter-spacing: .2em;
 }

 body .continuity .continuity__mode--active {
   color: #f2f0ed;
 }

 body .continuity .continuity__mode:hover {
   color: rgba(255,255,255,.87);
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
   padding:
     clamp(34px,4vw,66px);

   border:
     1px solid rgba(255,255,255,.09);

   border-radius: 30px;

   background:
     linear-gradient(
       145deg,
       rgba(255,255,255,.038),
       rgba(255,255,255,.009)
     );

   backdrop-filter:
     blur(24px) saturate(85%);

   -webkit-backdrop-filter:
     blur(24px) saturate(85%);

   box-shadow:
     inset 0 1px 0
     rgba(255,255,255,.04);
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

 body .continuity .continuity__mode-state div,
 body .continuity .continuity__evidence-metric {
   background: transparent;
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
     1px solid rgba(255,255,255,.09);

   border-radius: 0;

   background: transparent;

   backdrop-filter: none;
   -webkit-backdrop-filter: none;
 }

 body .continuity .continuity__review {
   margin-top: 28px;

   padding:
     clamp(28px,4vw,42px)
     0
     0;

   border: 0;

   border-top:
     1px solid rgba(255,255,255,.09);

   border-radius: 0;

   background: transparent;

   backdrop-filter: none;
   -webkit-backdrop-filter: none;
 }

 body .continuity .continuity__candidate {
   grid-template-columns:
     minmax(0,1fr)
     auto;
 }

 body .continuity .continuity__candidate h5,
 body .continuity .continuity__evidence-item h5 {
   overflow-wrap: anywhere;
 }

 body .continuity .continuity__review-option {
   transition:
     color .2s ease,
     border-color .2s ease,
     background .2s ease;
 }

 body .continuity .continuity__review-option:hover {
   border-color:
     rgba(255,255,255,.25);

   color: rgba(255,255,255,.8);
 }

 /* ========================================================
    14 / REALITY CHECK
 ======================================================== */

 body .continuity .continuity__reality {
   width: min(100%,1520px);

   margin:
     clamp(48px,6vw,94px)
     auto
     0;

   padding:
     clamp(32px,4vw,60px);

   border:
     1px solid rgba(255,255,255,.09);

   border-radius: 30px;

   background:
     linear-gradient(
       145deg,
       rgba(255,255,255,.035),
       rgba(255,255,255,.009)
     );

   backdrop-filter:
     blur(24px) saturate(85%);

   -webkit-backdrop-filter:
     blur(24px) saturate(85%);
 }

 body .continuity .continuity__reality-content > p {
   color: rgba(255,255,255,.86);
 }

 /* ========================================================
    15 / FOOTER
 ======================================================== */

 body .continuity .continuity__footer {
   width: min(100%,1520px);

   margin-top: 55px;

   border-top:
     1px solid rgba(255,255,255,.08);
 }

 body .continuity .continuity__footer p {
   color: rgba(255,255,255,.48);

   font-size: 13px;
 }

 /* ========================================================
    16 / INTERACTION ACCESSIBILITY
 ======================================================== */

 body .continuity a:focus-visible,
 body .continuity button:focus-visible,
 body .continuity input:focus-visible,
 body .continuity textarea:focus-visible {
   outline:
     2px solid rgba(255,255,255,.78);

   outline-offset: 4px;
 }

 body .continuity button,
 body .continuity a {
   -webkit-tap-highlight-color: transparent;
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
       1px solid rgba(255,255,255,.08);

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
    20 / REDUCED MOTION
 ======================================================== */

 @media (prefers-reduced-motion: reduce) {
   body .continuity *,
   body .continuity *::before,
   body .continuity *::after {
     animation-duration: .001ms !important;
     animation-iteration-count: 1 !important;
     transition-duration: .001ms !important;
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