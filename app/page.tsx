"use client";

import { useEffect, useMemo, useState } from "react";

type Company = {
  id: string;
  name: string;
  slug: string;
};

type Compensation = {
  id: string;
  role: string;
  level: string;
  location: string;
  baseSalary: number;
  bonus: number;
  stock: number;
  totalComp: number;
  company: Company;
};

type ApiResponse = {
  success: boolean;
  data: Compensation[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

const formatINR = (value: number) => {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)}Cr`;
  }

  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }

  return `₹${value.toLocaleString("en-IN")}`;
};

export default function Home() {
  const [records, setRecords] = useState<Compensation[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [level, setLevel] = useState("");
  const [sort, setSort] = useState("total-desc");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [compare, setCompare] = useState<string[]>([]);

  async function fetchCompensation() {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (search) params.set("search", search);
      if (company) params.set("company", company);
      if (location) params.set("location", location);
      if (level) params.set("level", level);

      params.set("sort", sort);
      params.set("page", page.toString());
      params.set("limit", "10");

      const response = await fetch(
        `/api/compensation?${params.toString()}`
      );

      const result: ApiResponse = await response.json();

      if (result.success) {
        setRecords(result.data);
        setTotalPages(result.pagination.totalPages);
        setTotal(result.pagination.total);
      }
    } catch (error) {
      console.error("Failed to fetch compensation:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCompensation();
    }, 250);

    return () => clearTimeout(timer);
  }, [search, company, location, level, sort, page]);

  function toggleCompare(id: string) {
    setCompare((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }

      if (current.length >= 3) {
        alert("You can compare up to 3 compensation records.");
        return current;
      }

      return [...current, id];
    });
  }

  function clearFilters() {
    setSearch("");
    setCompany("");
    setLocation("");
    setLevel("");
    setSort("total-desc");
    setPage(1);
  }

  const stats = useMemo(() => {
    if (!records.length) {
      return {
        average: 0,
        highest: 0,
      };
    }

    const average =
      records.reduce((sum, item) => sum + item.totalComp, 0) /
      records.length;

    const highest = Math.max(
      ...records.map((item) => item.totalComp)
    );

    return {
      average,
      highest,
    };
  }, [records]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* NAVBAR */}
      <nav className="border-b border-white/10 bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <div className="text-xl font-bold tracking-tight">
              COMP<span className="text-cyan-400">INTEL</span>
            </div>

            <div className="text-xs text-slate-500">
              Compensation Intelligence
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-300">
            <a
              href="#explorer"
              className="transition hover:text-white"
            >
              Salary Explorer
            </a>

            <a
              href="#compare"
              className="transition hover:text-white"
            >
              Compare
            </a>

            <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-cyan-300">
              {compare.length} selected
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-medium text-cyan-300">
              LEVELS MATTER MORE THAN TITLES
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Know your
              <span className="text-cyan-400"> true worth.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              Compare software engineering compensation by company,
              level, role and location. See the complete picture of
              base salary, bonus and equity.
            </p>
          </div>

          {/* SEARCH */}
          <div className="mt-10 max-w-4xl">
            <div className="flex items-center rounded-2xl border border-white/10 bg-white/5 p-2 shadow-2xl">
              <div className="px-4 text-xl text-slate-500">
                ⌕
              </div>

              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search company, role, level or location..."
                className="w-full bg-transparent px-2 py-4 text-white outline-none placeholder:text-slate-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* EXPLORER */}
      <section
        id="explorer"
        className="mx-auto max-w-7xl px-6 py-10"
      >
        {/* STATS */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-500">
              Records found
            </p>

            <p className="mt-2 text-3xl font-bold">
              {total}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-500">
              Average on page
            </p>

            <p className="mt-2 text-3xl font-bold text-cyan-400">
              {formatINR(stats.average)}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-500">
              Highest on page
            </p>

            <p className="mt-2 text-3xl font-bold">
              {formatINR(stats.highest)}
            </p>
          </div>
        </div>

        {/* FILTERS */}
        <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">
              Filter compensation
            </h2>

            <button
              onClick={clearFilters}
              className="text-sm text-cyan-400 hover:text-cyan-300"
            >
              Clear filters
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <input
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
                setPage(1);
              }}
              placeholder="Company"
              className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-cyan-400"
            />

            <input
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setPage(1);
              }}
              placeholder="Location"
              className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-cyan-400"
            />

            <input
              value={level}
              onChange={(e) => {
                setLevel(e.target.value);
                setPage(1);
              }}
              placeholder="Level"
              className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-cyan-400"
            />

            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none"
            >
              <option value="total-desc">
                Total compensation: High → Low
              </option>

              <option value="total-asc">
                Total compensation: Low → High
              </option>

              <option value="base-desc">
                Base salary: High → Low
              </option>

              <option value="base-asc">
                Base salary: Low → High
              </option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="hidden grid-cols-7 border-b border-white/10 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 md:grid">
            <div className="col-span-2">Role / Company</div>
            <div>Level</div>
            <div>Location</div>
            <div>Base</div>
            <div>Total</div>
            <div>Compare</div>
          </div>

          {loading ? (
            <div className="p-12 text-center text-slate-500">
              Loading compensation data...
            </div>
          ) : records.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-lg font-semibold">
                No compensation records found
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Try changing your search or filters.
              </p>
            </div>
          ) : (
            records.map((item) => (
              <div
                key={item.id}
                className="grid gap-4 border-b border-white/10 px-6 py-5 last:border-0 md:grid-cols-7 md:items-center"
              >
                <div className="md:col-span-2">
                  <p className="font-semibold">
                    {item.role}
                  </p>

                  <p className="mt-1 text-sm text-cyan-400">
                    {item.company.name}
                  </p>
                </div>

                <div>
                  <span className="rounded-lg bg-white/10 px-3 py-1 text-sm">
                    {item.level}
                  </span>
                </div>

                <div className="text-sm text-slate-400">
                  {item.location}
                </div>

                <div>
                  <p className="font-semibold">
                    {formatINR(item.baseSalary)}
                  </p>

                  <p className="text-xs text-slate-500">
                    base
                  </p>
                </div>

                <div>
                  <p className="font-bold text-cyan-400">
                    {formatINR(item.totalComp)}
                  </p>

                  <p className="text-xs text-slate-500">
                    total
                  </p>
                </div>

                <div>
                  <button
                    onClick={() => toggleCompare(item.id)}
                    className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                      compare.includes(item.id)
                        ? "bg-cyan-400 text-slate-950"
                        : "border border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    {compare.includes(item.id)
                      ? "Selected"
                      : "Compare"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* PAGINATION */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Page {page} of {totalPages}
          </p>

          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() =>
                setPage((current) => Math.max(1, current - 1))
              }
              className="rounded-xl border border-white/10 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-30"
            >
              Previous
            </button>

            <button
              disabled={page >= totalPages}
              onClick={() =>
                setPage((current) =>
                  Math.min(totalPages, current + 1)
                )
              }
              className="rounded-xl border border-white/10 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-30"
            >
              Next
            </button>
          </div>
        </div>
      </section>

      {/* COMPENSATION BREAKDOWN */}
      <section className="border-t border-white/10 bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-cyan-400">
              TOTAL COMPENSATION
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Salary is more than base pay.
            </h2>

            <p className="mt-4 text-slate-400">
              We normalize compensation into three components so
              offers can be compared consistently across companies
              and levels.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-2xl">01</div>
              <h3 className="mt-5 text-xl font-semibold">
                Base salary
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Fixed annual compensation paid as salary.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-2xl">02</div>
              <h3 className="mt-5 text-xl font-semibold">
                Bonus
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Annual performance or joining incentives.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-2xl">03</div>
              <h3 className="mt-5 text-xl font-semibold">
                Equity
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Annualized value of stock or equity compensation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARE */}
      {compare.length > 0 && (
        <section
          id="compare"
          className="border-t border-white/10"
        >
          <div className="mx-auto max-w-7xl px-6 py-16">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm font-semibold text-cyan-400">
                  COMPARISON
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  Compare compensation
                </h2>
              </div>

              <button
                onClick={() => setCompare([])}
                className="text-sm text-slate-500 hover:text-white"
              >
                Clear
              </button>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {compare.map((id) => {
                const item = records.find(
                  (record) => record.id === id
                );

                if (!item) return null;

                return (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-6"
                  >
                    <p className="text-sm text-cyan-400">
                      {item.company.name}
                    </p>

                    <h3 className="mt-2 text-xl font-bold">
                      {item.role}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {item.level} · {item.location}
                    </p>

                    <div className="mt-6 space-y-4">
                      <div className="flex justify-between">
                        <span className="text-slate-500">
                          Base
                        </span>

                        <span className="font-semibold">
                          {formatINR(item.baseSalary)}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-slate-500">
                          Bonus
                        </span>

                        <span className="font-semibold">
                          {formatINR(item.bonus)}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-slate-500">
                          Stock
                        </span>

                        <span className="font-semibold">
                          {formatINR(item.stock)}
                        </span>
                      </div>

                      <div className="border-t border-white/10 pt-4">
                        <div className="flex justify-between">
                          <span className="font-semibold">
                            Total
                          </span>

                          <span className="text-xl font-bold text-cyan-400">
                            {formatINR(item.totalComp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-6 py-8 text-sm text-slate-500 sm:flex-row">
          <p>
            COMPINTEL — Compensation Intelligence Platform
          </p>

          <p>
            Built with Next.js · Prisma · PostgreSQL
          </p>
        </div>
      </footer>
    </main>
  );
}