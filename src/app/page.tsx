"use client";
import { dashboardData, poolData, tokenData } from "@/constants/data";
import {
  BackwardIcon,
  CheckmarkIcon,
  CopyIcon,
  ExternalLinkIcon,
  ForwardIcon,
  SearchIcon,
} from "@/icons";
import { useState } from "react";

export default function Home() {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Filter pools based on search query
  const filteredPools = poolData.filter((pool) => {
    const query = searchQuery.trim().toLowerCase();
    return (
      pool.pair.toLowerCase().includes(query) ||
      pool.tokenAddress.toLowerCase().includes(query)
    );
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredPools.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPools = filteredPools.slice(startIndex, endIndex);

  // Reset to page 1 when search query changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleCopyAddress = (address: string, id: number) => {
    navigator.clipboard.writeText(address).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleExternalLink = (address: string) => {
    window.open(`https://etherscan.io/address/${address}`, "_blank");
  };

  return (
    <div className="space-y-10">
      {/* Dashboard Cards Section */}
      <section>
        <h1 className="text-white font-semibold leading-12 text-[clamp(32px,2.86vw,40px)] mb-2">
          Recovery Pools
        </h1>
        <p className="text-[#9798A4] font-medium leading-8 text-[clamp(18px,0.28vw+18px,20px)]">
          Monitor recovery pool prices and token burn progress
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {dashboardData.map((card, index) => (
            <div
              key={index}
              className="bg-[#101012] backdrop-blur-md border border-[#23252A] rounded-lg p-6 hover:bg-[#23252A] flex flex-col gap-2"
            >
              <h3 className="text-[#9798A4] text-base">{card.title}</h3>
              <p className="text-white text-[32px] font-bold">{card.value}</p>
              {card.subtitle && (
                <p className="text-[#9798A4] text-base">{card.subtitle}</p>
              )}
              {card.change && (
                <p
                  className={`text-sm ${
                    card.changeType === "positive"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {card.change}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Recovery Tokens Section */}
      <section>
        <h1 className="text-white leading-12 text-[clamp(32px,2.86vw,40px)] font-bold mb-2">
          Recovery Tokens
        </h1>
        <p className="text-[#9798A4] leading-8 text-[clamp(18px,0.28vw+18px,20px)]">
          Monitor recovery token burn progress
        </p>

        <div className="bg-[#101012] border border-[#23252A] rounded-lg overflow-hidden mt-8">
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Table Header */}
              <div
                className="grid gap-4 px-6 py-3 bg-[#151618] border-b border-[#23252A] text-[#97979A] text-sm font-semibold"
                style={{
                  gridTemplateColumns: "clamp(60px, 15vw, 250px) 1fr 2fr",
                }}
              >
                {["Token", "Token Address", "Burn Progress"].map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </div>

              {/* Table Body */}
              {tokenData.map((item) => (
                <div
                  key={item.id}
                  className="grid gap-4 px-6 h-16 border-b border-[#23252A] last:border-b-0 lg:bg-transparent transition-colors items-center"
                  style={{
                    gridTemplateColumns: "clamp(60px, 15vw, 250px) 1fr 2fr",
                  }}
                >
                  {/* Token Name */}
                  <div className="text-[#7C3BED] truncate font-semibold text-sm whitespace-nowrap">
                    {item.token}
                  </div>

                  {/* Token Address */}
                  <div className="flex items-center gap-2">
                    <span className="text-[#EAECEF] font-mono text-sm">
                      {truncateAddress(item.tokenAddress)}
                    </span>
                    <button
                      onClick={() =>
                        handleCopyAddress(item.tokenAddress, item.id)
                      }
                      className="flex items-center justify-center cursor-pointer h-6 w-6 p-0"
                    >
                      {copiedId === item.id ? <CheckmarkIcon /> : <CopyIcon />}
                    </button>
                  </div>

                  {/* Burn Progress */}
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="text-[#97979A] text-sm mb-2">
                        {item.burnStatus}
                      </div>
                      <div className="w-full bg-[#23252A] rounded-full h-2">
                        <div
                          className="bg-[#7C3BED] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${item.burnProgress}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-[#7C3BED] font-semibold text-sm min-w-[50px] text-right">
                      {item.burnProgress}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recovery Pools Section with Pagination */}
      <section>
        <h1 className="text-white leading-12 text-[clamp(32px,2.86vw,40px)] font-bold mb-2">
          Recovery Pools
        </h1>
        <p className="text-[#9798A4] leading-8 text-[clamp(18px,0.28vw+18px,20px)]">
          View recovery pool prices and trading pairs
        </p>

        <div className="bg-[#151618] border-b border-[#23252A] rounded-lg overflow-hidden mt-8 p-6">
          {/* Search Bar */}
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9798A4]" />
            <input
              type="text"
              placeholder="Search pool by pair or address..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full max-w-lg bg-transparent border border-[#626366] rounded-lg pl-10 pr-4 py-2 text-[#9798A4] placeholder-[#9798A4] focus:outline-none"
            />
          </div>
        </div>

        <div className="bg-[#101012] border border-[#23252A] rounded-lg overflow-hidden mt-4 w-full">
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Table Header */}
              <div
                className="grid gap-8 px-6 py-3 bg-[#151618] border-b border-[#23252A] text-[#9798A4] text-left text-sm font-medium"
                style={{
                  gridTemplateColumns:
                    "clamp(60px, 23vw, 320px) clamp(150px, 43vw, 600px) 1fr",
                }}
              >
                {["Pair", "Pool Address", "Price"].map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </div>

              {/* Table Body */}
              {currentPools.length > 0 ? (
                currentPools.map((pool) => (
                  <div
                    key={pool.id}
                    className="grid gap-8 px-6 py-4 border-b border-[#23252A] last:border-b-0 lg:bg-transparent text-start"
                    style={{
                      gridTemplateColumns:
                        "clamp(60px, 23vw, 320px) clamp(150px, 43vw, 600px) 1fr",
                    }}
                  >
                    {/* Pair */}
                    <div className="text-[#7C3BED] truncate font-semibold text-sm whitespace-nowrap pr-4">
                      {pool.pair}
                    </div>

                    {/* Token Address */}
                    <div className="flex items-center gap-2">
                      <span className="text-[#EAECEF] font-mono text-sm">
                        {truncateAddress(pool.tokenAddress)}
                      </span>
                      <button
                        onClick={() =>
                          handleCopyAddress(pool.tokenAddress, pool.id)
                        }
                        className="flex items-center justify-center cursor-pointer h-6 w-6 p-0"
                      >
                        {copiedId === pool.id ? (
                          <CheckmarkIcon />
                        ) : (
                          <CopyIcon />
                        )}
                      </button>
                      <button
                        onClick={() => handleExternalLink(pool.tokenAddress)}
                        className="flex items-center justify-center cursor-pointer h-6 w-6 p-0 text-[#EAECEF]"
                        title="View on explorer"
                      >
                        <ExternalLinkIcon />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-[#EAECEF] font-medium text-sm whitespace-nowrap">
                      $
                      {pool.price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 4,
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-12 text-center">
                  <p className="text-gray-500 text-sm">
                    {`No pools found matching "${searchQuery}"`}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Pagination */}
          {filteredPools.length > 0 && (
            <div className="flex items-center justify-between text-sm md:px-6 bg-[#151618] border-t border-[#23252A]">
              {/* Left side - Items per page */}
              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center gap-2 py-3">
                  <span className="text-[#97979A]">Items per page:</span>
                  <select
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className="text-white bg-[#151618]"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
                <span className="text-[#97979A] border-r md:border-l border-[#23252a] px-4 py-3">
                  {startIndex + 1}-{Math.min(endIndex, filteredPools.length)} of{" "}
                  {filteredPools.length} items
                </span>
              </div>

              {/* Right side - Navigation */}
              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-3 text-white disabled:text-[#97979A] cursor-pointer disabled:cursor-not-allowed"
                  >
                    &lt; Previous
                  </button>
                  <span className="text-[#97979A]">
                    {currentPage} of {totalPages} pages
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="text-white disabled:text-[#97979A] cursor-pointer disabled:cursor-not-allowed px-3"
                  >
                    Next &gt;
                  </button>
                </div>
                <div className="flex items-center gap-4 md:hidden">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="border-r border-l border-[#23252a] py-3 px-4 text-white disabled:text-[#97979A] disabled:cursor-not-allowed cursor-pointer"
                  >
                    <BackwardIcon className="w-4 h-4 rotate-90" />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="py-3 pr-4 text-white disabled:text-[#97979A] cursor-pointer disabled:cursor-not-allowed"
                  >
                    <ForwardIcon className="w-4 h-4 rotate-270" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
