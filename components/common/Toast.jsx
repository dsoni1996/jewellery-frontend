"use client";
import { useState, useCallback } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

const S = `
@keyframes toast-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.toast-wrap{position:fixed;bottom:28px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:10px;pointer-events:none;}
.toast-item{display:flex;align-items:center;gap:10px;padding:12px 20px;font-size:13px;border-radius:3px;box-shadow:0 8px 32px rgba(0,0,0,.25);animation:toast-in .25s ease;font-family:'Jost',sans-serif;pointer-events:all;}
.toast-item.success{background:#2C1A0E;color:#D4AF6A;}
.toast-item.error{background:#993C1D;color:#FAECE7;}
`;

export function Toast({ toasts }) {
  return (
    <>
      <style>{S}</style>
      <div className="toast-wrap">
        {toasts.map(t => (
          <div key={t.id} className={`toast-item ${t.type}`}>
            {t.type === "error" ? <AlertCircle size={14}/> : <CheckCircle size={14}/>}
            {t.msg}
          </div>
        ))}
      </div>
    </>
  );
}