"use client";
import React from "react";


export function IconButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
return (
<button onClick={onClick} className="px-3 py-2 rounded-lg border bg-white shadow-sm">{children}</button>
);
}