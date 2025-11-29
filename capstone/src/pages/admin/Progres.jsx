import React from "react";

const dokumenData = [
  { nama: "Barang Pangan", jenis: "BAPB" },
  { nama: "Bongkar Muat", jenis: "BAPP" },
  { nama: "Barang Pangan", jenis: "BAPB" },
  { nama: "Barang Pangan", jenis: "BAPB" },
];

export default function Progres() {
  return (
    <div className="p-8 w-full">
      <h1 className="text-xl font-semibold mb-6">Daftar Dokumen</h1>

      <div className="grid grid-cols-3 text-sm font-semibold border-b pb-4 mb-4">
        <span>Dokumen</span>
        <span className="text-center">Jenis Dokumen</span>
        <span className="text-right">Aksi</span>
      </div>

      {dokumenData.map((item, i) => (
        <div
          key={i}
          className="grid grid-cols-3 bg-white border rounded-lg p-4 mb-3"
        >
          <span>{item.nama}</span>
          <span className="text-center">{item.jenis}</span>

          <div className="flex justify-end gap-2">
            <button className="bg-blue-500 text-white px-4 py-1 rounded-lg">
              ACC
            </button>
            <button className="bg-red-500 text-white px-4 py-1 rounded-lg">
              TOLAK
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
