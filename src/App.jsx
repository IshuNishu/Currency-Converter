import React, { useEffect, useState } from "react";

const countryList = {
  AED: "AE",
  AFN: "AF",
  XCD: "AG",
  ALL: "AL",
  AMD: "AM",
  ANG: "AN",
  AOA: "AO",
  ARS: "AR",
  AUD: "AU",
  AZN: "AZ",
  BDT: "BD",
  BGN: "BG",
  BHD: "BH",
  BMD: "BM",
  BRL: "BR",
  CAD: "CA",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CZK: "CZ",
  DKK: "DK",
  DZD: "DZ",
  EGP: "EG",
  EUR: "FR",
  GBP: "GB",
  HKD: "HK",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  JPY: "JP",
  KRW: "KR",
  KWD: "KW",
  LKR: "LK",
  MYR: "MY",
  MXN: "MX",
  NOK: "NO",
  NZD: "NZ",
  OMR: "OM",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  QAR: "QA",
  RUB: "RU",
  SAR: "SA",
  SEK: "SE",
  SGD: "SG",
  THB: "TH",
  TRY: "TR",
  TWD: "TW",
  USD: "US",
  ZAR: "ZA",
};

const BASE_URL = "https://open.er-api.com/v6/latest";

export default function App() {
  const codes = Object.keys(countryList).sort();
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [amount, setAmount] = useState(1);
  const [rate, setRate] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    updateExchangeRate();
    // eslint-disable-next-line
  }, []);

  const updateExchangeRate = async () => {
    setLoading(true);
    try {
      const url = `${BASE_URL}/${from}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      const r = data.rates[to];
      setRate(r);
      const finalAmount = (parseFloat(amount) || 1) * r;
      setResult(finalAmount.toFixed(4));
    } catch (err) {
      console.error(err);
      setResult("Error fetching rate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${
        dark ? "dark" : ""
      } min-h-screen flex items-center justify-center transition-colors duration-500 bg-gray-100 dark:bg-gray-900`}
    >
      <div className="max-w-md w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-6 rounded-xl shadow-lg transition-colors duration-500">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Currency Converter</h1>
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors"
            title="Toggle theme"
          >
            {dark ? "🌞" : "🌙"}
          </button>
        </div>

        <label className="block text-sm mb-1">Amount</label>
        <input
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent mb-4"
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">From</label>
            <div className="flex items-center gap-3">
              <img
                src={`https://flagsapi.com/${countryList[from]}/flat/32.png`}
                alt=""
                className="w-8 h-6 object-cover rounded-sm"
              />
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent"
              >
                {codes.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">To</label>
            <div className="flex items-center gap-3">
              <img
                src={`https://flagsapi.com/${countryList[to]}/flat/32.png`}
                alt=""
                className="w-8 h-6 object-cover rounded-sm"
              />
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent"
              >
                {codes.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <button
            onClick={updateExchangeRate}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-md transition-all"
          >
            {loading ? "Loading..." : "Get Exchange Rate"}
          </button>
        </div>

        <div className="mt-4 p-4 rounded-md bg-gray-100 dark:bg-gray-700 transition-colors">
          <p className="text-sm">
            {amount} {from} =
          </p>
          <p className="text-xl font-medium">
            {result ? `${result} ${to}` : "—"}
          </p>
          {rate && (
            <p className="text-xs mt-1">
              1 {from} = {rate} {to}
            </p>
          )}
        </div>

        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          Data from open.er-api.com
        </p>
      </div>
    </div>
  );
}
