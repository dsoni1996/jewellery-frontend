"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Ruler, Printer } from "lucide-react";

const SIZE_CHART = [
  { india: 10, us: "5",    uk: "J½",  eu: "50", mm: 15.9, circ: 49.7 },
  { india: 11, us: "5.5",  uk: "K½",  eu: "51", mm: 16.2, circ: 50.9 },
  { india: 12, us: "6",    uk: "L½",  eu: "52", mm: 16.5, circ: 51.9 },
  { india: 13, us: "6.5",  uk: "M½",  eu: "53", mm: 16.9, circ: 53.0 },
  { india: 14, us: "7",    uk: "N½",  eu: "54", mm: 17.2, circ: 54.0 },
  { india: 15, us: "7.5",  uk: "O½",  eu: "55", mm: 17.5, circ: 55.1 },
  { india: 16, us: "8",    uk: "P½",  eu: "57", mm: 18.2, circ: 57.2 },
  { india: 17, us: "8.5",  uk: "Q½",  eu: "58", mm: 18.5, circ: 58.3 },
  { india: 18, us: "9",    uk: "R½",  eu: "59", mm: 18.8, circ: 59.1 },
  { india: 19, us: "9.5",  uk: "S½",  eu: "61", mm: 19.4, circ: 61.0 },
  { india: 20, us: "10",   uk: "T½",  eu: "62", mm: 19.8, circ: 62.1 },
  { india: 21, us: "10.5", uk: "U½",  eu: "63", mm: 20.0, circ: 62.8 },
  { india: 22, us: "11",   uk: "V½",  eu: "64", mm: 20.4, circ: 64.0 },
];

const S = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
.sg-root{background:#FAF6F0;min-height:100vh;font-family:'Jost',sans-serif;padding:52px 0 80px;}
.sg-inner{max-width:900px;margin:0 auto;padding:0 40px;}
@media(max-width:768px){.sg-inner{padding:0 16px;}}
.sg-back{display:inline-flex;align-items:center;gap:7px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E8875;text-decoration:none;margin-bottom:28px;transition:color .2s;}
.sg-back:hover{color:#B8862A;}
.sg-title{font-family:'Cormorant Garamond',serif;font-size:38px;font-weight:400;color:#2C1A0E;margin-bottom:4px;}
.sg-title em{font-style:italic;color:#B8862A;}
.sg-sub{font-size:12px;color:#9E8875;letter-spacing:1px;margin-bottom:28px;}
.sg-gold-line{height:1px;background:linear-gradient(90deg,transparent,#D4AF6A 50%,transparent);margin-bottom:36px;}
.sg-grid{display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-bottom:36px;}
@media(max-width:700px){.sg-grid{grid-template-columns:1fr;}}
.sg-card{background:#fff;border:1px solid #E8DDD0;border-radius:4px;padding:24px;}
.sg-card-title{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:400;color:#2C1A0E;margin-bottom:14px;display:flex;align-items:center;gap:8px;}
.sg-card-title em{font-style:italic;color:#B8862A;}
.sg-step{display:flex;gap:12px;margin-bottom:14px;}
.sg-step-num{width:26px;height:26px;border-radius:50%;background:#2C1A0E;color:#D4AF6A;font-size:11px;font-weight:600;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;}
.sg-step-text{font-size:13px;color:#5A4535;line-height:1.6;font-weight:300;}
.sg-step-text strong{color:#2C1A0E;font-weight:500;}
.sg-tip{background:#FBF6EE;border:1px solid #E8D8C0;border-radius:3px;padding:12px 14px;font-size:12.5px;color:#7A6656;line-height:1.6;display:flex;gap:8px;margin-top:14px;}
/* Calculator */
.sg-calc{background:#2C1A0E;border-radius:4px;padding:28px;margin-bottom:28px;}
.sg-calc-title{font-family:'Cormorant Garamond',serif;font-size:22px;color:#FFFDF9;margin-bottom:18px;}
.sg-calc-title em{font-style:italic;color:#D4AF6A;}
.sg-calc-row{display:grid;grid-template-columns:1fr 1fr auto;gap:12px;align-items:end;}
@media(max-width:560px){.sg-calc-row{grid-template-columns:1fr;}}
.sg-calc-field{display:flex;flex-direction:column;gap:5px;}
.sg-calc-label{font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#7A6352;}
.sg-calc-input,.sg-calc-select{border:1px solid rgba(212,175,106,.3);padding:10px 13px;font-size:13px;color:#FFFDF9;font-family:'Jost',sans-serif;outline:none;border-radius:2px;background:rgba(255,255,255,.07);width:100%;}
.sg-calc-input:focus,.sg-calc-select:focus{border-color:#D4AF6A;}
.sg-calc-input::placeholder{color:rgba(255,255,255,.3);}
.sg-calc-select option{background:#2C1A0E;color:#FFFDF9;}
.sg-calc-btn{background:#B8862A;color:#fff;border:none;padding:10px 20px;font-family:'Jost',sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;border-radius:2px;white-space:nowrap;transition:background .2s;}
.sg-calc-btn:hover{background:#D4AF6A;color:#2C1A0E;}
.sg-calc-result{margin-top:18px;background:rgba(212,175,106,.1);border:1px solid rgba(212,175,106,.25);border-radius:3px;padding:16px;text-align:center;}
.sg-calc-result-size{font-family:'Cormorant Garamond',serif;font-size:44px;font-weight:300;color:#D4AF6A;line-height:1;}
.sg-calc-result-label{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7A6352;margin-top:4px;}
.sg-calc-result-row{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:14px;border:1px solid rgba(212,175,106,.2);border-radius:2px;overflow:hidden;}
.sg-calc-result-cell{padding:8px;text-align:center;border-right:1px solid rgba(212,175,106,.15);}
.sg-calc-result-cell:last-child{border-right:none;}
.sg-calc-result-cell-label{font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#7A6352;}
.sg-calc-result-cell-val{font-size:14px;font-weight:500;color:#D4AF6A;margin-top:3px;}
/* Table */
.sg-table-card{background:#fff;border:1px solid #E8DDD0;border-radius:4px;overflow:hidden;}
.sg-table-head{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid #E8DDD0;flex-wrap:wrap;gap:10px;}
.sg-table-title{font-family:'Cormorant Garamond',serif;font-size:20px;color:#2C1A0E;}
.sg-table-title em{font-style:italic;color:#B8862A;}
.sg-print-btn{display:inline-flex;align-items:center;gap:7px;background:none;border:1px solid #E8DDD0;padding:7px 14px;font-family:'Jost',sans-serif;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#5A4535;cursor:pointer;border-radius:2px;transition:all .2s;}
.sg-print-btn:hover{border-color:#B8862A;color:#B8862A;}
.sg-table-wrap{overflow-x:auto;}
.sg-table{width:100%;border-collapse:collapse;font-size:13px;}
.sg-table th{padding:10px 14px;text-align:center;font-size:9.5px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#9E8875;background:#FBF6EE;border-bottom:1px solid #E8DDD0;white-space:nowrap;}
.sg-table td{padding:11px 14px;text-align:center;border-bottom:1px solid #F5EDE3;color:#3D2B1A;}
.sg-table tbody tr:last-child td{border-bottom:none;}
.sg-table tbody tr:hover td{background:#FFFDF9;}
.sg-table tbody tr.highlighted td{background:rgba(184,134,42,.06);font-weight:500;color:#2C1A0E;}
.sg-table tbody tr.highlighted td:first-child{border-left:2px solid #B8862A;}
`;

export default function SizeGuidePage() {
  const [method,    setMethod]    = useState("circumference");
  const [measurement, setMeasure] = useState("");
  const [result,    setResult]    = useState(null);

  const calculate = () => {
    const val = parseFloat(measurement);
    if (!val) return;
    let found = null;
    if (method === "circumference") {
      found = SIZE_CHART.reduce((prev, curr) =>
        Math.abs(curr.circ - val) < Math.abs(prev.circ - val) ? curr : prev
      );
    } else {
      found = SIZE_CHART.reduce((prev, curr) =>
        Math.abs(curr.mm - val) < Math.abs(prev.mm - val) ? curr : prev
      );
    }
    setResult(found);
  };

  return (
    <>
      <style>{S}</style>
      <div className="sg-root">
        <div className="sg-inner">
          <Link href="/listing" className="sg-back"><ArrowLeft size={13} /> Back to Jewellery</Link>
          <h1 className="sg-title">Ring Size <em>Guide</em></h1>
          <p className="sg-sub">Find your perfect ring size in 3 simple steps</p>
          <div className="sg-gold-line" />

          {/* Method cards */}
          <div className="sg-grid">
            <div className="sg-card">
              <p className="sg-card-title"><Ruler size={16} style={{ color: "#B8862A" }} /> String <em>Method</em></p>
              {[
                { text: <>Cut a thin strip of <strong>paper or string</strong> about 10cm long.</> },
                { text: <>Wrap it snugly around the <strong>base of your finger</strong> where the ring will sit.</> },
                { text: <><strong>Mark the overlap point</strong> with a pen.</> },
                { text: <>Lay it flat and <strong>measure the length in mm</strong> — that is your circumference.</> },
                { text: <>Use the calculator below or the table to find your size.</> },
              ].map((s, i) => (
                <div key={i} className="sg-step">
                  <div className="sg-step-num">{i + 1}</div>
                  <p className="sg-step-text">{s.text}</p>
                </div>
              ))}
            </div>

            <div className="sg-card">
              <p className="sg-card-title"><Ruler size={16} style={{ color: "#B8862A" }} /> Existing Ring <em>Method</em></p>
              {[
                { text: <>Take a ring that <strong>already fits well</strong> on the same finger.</> },
                { text: <>Place it on a <strong>ruler</strong> and measure the internal diameter in mm.</> },
                { text: <>Find that diameter in our size chart below.</> },
              ].map((s, i) => (
                <div key={i} className="sg-step">
                  <div className="sg-step-num">{i + 1}</div>
                  <p className="sg-step-text">{s.text}</p>
                </div>
              ))}
              <div className="sg-tip">
                💡 <span>Fingers are slightly larger in the evening and in warm weather. Measure at the end of the day for the most accurate size.</span>
              </div>
              <div className="sg-tip" style={{ marginTop: 8 }}>
                👆 <span>If you are between two sizes, always go with the larger size.</span>
              </div>
            </div>
          </div>

          {/* Calculator */}
          <div className="sg-calc">
            <p className="sg-calc-title">Size <em>Calculator</em></p>
            <div className="sg-calc-row">
              <div className="sg-calc-field">
                <label className="sg-calc-label">Measurement Type</label>
                <select className="sg-calc-select" value={method} onChange={e => { setMethod(e.target.value); setResult(null); }}>
                  <option value="circumference">Finger Circumference (mm)</option>
                  <option value="diameter">Ring Inner Diameter (mm)</option>
                </select>
              </div>
              <div className="sg-calc-field">
                <label className="sg-calc-label">Your Measurement (mm)</label>
                <input className="sg-calc-input" type="number" step="0.1" placeholder={method === "circumference" ? "e.g. 54.0" : "e.g. 17.2"} value={measurement} onChange={e => { setMeasure(e.target.value); setResult(null); }} />
              </div>
              <button className="sg-calc-btn" onClick={calculate}>Find Size</button>
            </div>

            {result && (
              <div className="sg-calc-result">
                <p className="sg-calc-result-size">{result.india}</p>
                <p className="sg-calc-result-label">India Ring Size</p>
                <div className="sg-calc-result-row">
                  {[["US", result.us], ["UK", result.uk], ["EU", result.eu], ["Ø mm", result.mm]].map(([l, v]) => (
                    <div key={l} className="sg-calc-result-cell">
                      <p className="sg-calc-result-cell-label">{l}</p>
                      <p className="sg-calc-result-cell-val">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Full size chart */}
          <div className="sg-table-card">
            <div className="sg-table-head">
              <span className="sg-table-title">International Size <em>Chart</em></span>
              <button className="sg-print-btn" onClick={() => window.print()}>
                <Printer size={13} /> Print Chart
              </button>
            </div>
            <div className="sg-table-wrap">
              <table className="sg-table">
                <thead>
                  <tr>
                    <th>India</th><th>US / Canada</th><th>UK / AU</th>
                    <th>Europe</th><th>Diameter (mm)</th><th>Circumference (mm)</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZE_CHART.map(row => (
                    <tr key={row.india} className={result?.india === row.india ? "highlighted" : ""}>
                      <td>{row.india}</td>
                      <td>{row.us}</td>
                      <td>{row.uk}</td>
                      <td>{row.eu}</td>
                      <td>{row.mm}</td>
                      <td>{row.circ}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
