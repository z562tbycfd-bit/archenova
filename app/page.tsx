import Link from "next/link";

export default function GatePage() {
 return (
   <section className="gate">
     {/* 背景は既存のヒーロー画像 + 統一フィルムをそのまま使う前提 */}
     <div className="gate-inner">
       <div className="gate-head">
         <span className="gate-label">IRREVERSIBILITY GATE</span>
         <h1 className="gate-title">ArcheNova</h1>
         <p className="gate-sub">Touch only what cannot be undone.</p>
       </div>

       {/* 固定の注意書き（超短文） */}
       <div className="gate-statement glass-block">
         <p className="text" style={{ marginBottom: 10 }}>
           This is not a community.<br />
           This is a boundary.<br />
           You may touch it. You may leave.
         </p>
         <p className="text dim" style={{ margin: 0 }}>
           Scrolling begins selection.
           Leaving is allowed—memory is not.
         </p>
       </div>

       {/* 最初に「入る / 戻る」を選ばせる */}
       <div className="gate-actions">
         <Link className="gate-primary" href="/home">
           Enter →
         </Link>

         <a className="gate-secondary" href="https://x.com/ArcheNova_X" target="_blank" rel="noreferrer">
           Leave to X ↗
         </a>
       </div>

       {/* 追加の小さな導線（控えめ） */}
       <div className="gate-foot">
         <Link className="back-link" href="/contact">
           Contact / Access →
         </Link>
       </div>
     </div>
   </section>
 );
}