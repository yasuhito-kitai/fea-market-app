"use client";

import { useState } from "react";

export default function ParchaseAddressPage() {
    const [zipcode, setZipcode] = useState<string>("");
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-6">住所の変更</h1>
            </div>
            <div>
                <label className="block mb-1">郵便番号</label>
                    <input value={zipcode} onChange={(e)=>setZipcode(e.target.value)}
                        type="text"
                    />
            </div>
            {/* ここに住所と建物名を後で追加 */}
        </div>
    );

}


// return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
//       <h1 className="text-2xl font-bold mb-6">住所の変更</h1>
//       <form onSubmit={handleSaveProfile} className="space-y-4">
//         <div>
//           <label className="block mb-1">郵便番号</label>
//           <input
//             type="text"
//             inputMode="numeric"
//             pattern="\d{3}-?\d{4}"
//             placeholder="例：123-4567"
//             value={zipcode}
//             onChange={(e) => setZipcode(e.target.value)}
//             className="w-full border p-2 rounded"
//             autoComplete="postal-code"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">住所</label>
//           <input
//             type="text"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             className="w-full border p-2 rounded"
//             autoComplete="street-address"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">建物名</label>
//           <input
//             type="text"
//             value={building}
//             onChange={(e) => setBuilding(e.target.value)}
//             className="w-full border p-2 rounded"
//             autoComplete="address-line2"
//           />
//         </div>
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
//         >
//           {loading ? '保存中…' : '保存する'}
//         </button>
//       </form>
//     </div>
//   );