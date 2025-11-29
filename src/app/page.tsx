// "use client";
// import { dashboardData, poolData, tokenData } from "@/constants/data";
// import {
//   BackwardIcon,
//   CheckmarkIcon,
//   CopyIcon,
//   ExternalLinkIcon,
//   ForwardIcon,
//   SearchIcon,
//   SortArrowIcon,
// } from "@/icons";
// import { useState, useMemo } from "react";

// type SortField = "token" | "burnProgress" | "vault" | "pair" | "price" | null;
// type SortDirection = "asc" | "desc" | null;

// export default function Home() {
//   const [copiedId, setCopiedId] = useState<number | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPoolPage, setCurrentPoolPage] = useState(1);
//   const [poolItemsPerPage, setPoolItemsPerPage] = useState(5);

//   // Token pagination states
//   const [currentTokenPage, setCurrentTokenPage] = useState(1);
//   const [tokenItemsPerPage, setTokenItemsPerPage] = useState(5);

//   // Sort states for tokens
//   const [tokenSortField, setTokenSortField] = useState<SortField>(null);
//   const [tokenSortDirection, setTokenSortDirection] =
//     useState<SortDirection>(null);

//   // Sort states for pools
//   const [poolSortField, setPoolSortField] = useState<SortField>(null);
//   const [poolSortDirection, setPoolSortDirection] =
//     useState<SortDirection>(null);

//   // Sort handler for tokens
//   const handleTokenSort = (field: SortField) => {
//     if (tokenSortField === field) {
//       // Toggle direction or reset
//       if (tokenSortDirection === "asc") {
//         setTokenSortDirection("desc");
//       } else if (tokenSortDirection === "desc") {
//         setTokenSortField(null);
//         setTokenSortDirection(null);
//       }
//     } else {
//       setTokenSortField(field);
//       setTokenSortDirection("asc");
//     }
//     setCurrentTokenPage(1);
//   };

//   // Sort handler for pools
//   const handlePoolSort = (field: SortField) => {
//     if (poolSortField === field) {
//       // Toggle direction or reset
//       if (poolSortDirection === "asc") {
//         setPoolSortDirection("desc");
//       } else if (poolSortDirection === "desc") {
//         setPoolSortField(null);
//         setPoolSortDirection(null);
//       }
//     } else {
//       setPoolSortField(field);
//       setPoolSortDirection("asc");
//     }
//     setCurrentPoolPage(1);
//   };

//   // Sorted token data
//   const sortedTokenData = useMemo(() => {
//     if (!tokenSortField || !tokenSortDirection) return [...tokenData];

//     return [...tokenData].sort((a, b) => {
//       let aValue: string | number;
//       let bValue: string | number;

//       if (tokenSortField === "token") {
//         aValue = a.token.toLowerCase();
//         bValue = b.token.toLowerCase();
//       } else if (tokenSortField === "burnProgress") {
//         aValue = a.burnProgress;
//         bValue = b.burnProgress;
//       } else {
//         return 0;
//       }

//       if (typeof aValue === "string" && typeof bValue === "string") {
//         return tokenSortDirection === "asc"
//           ? aValue.localeCompare(bValue)
//           : bValue.localeCompare(aValue);
//       } else {
//         return tokenSortDirection === "asc"
//           ? (aValue as number) - (bValue as number)
//           : (bValue as number) - (aValue as number);
//       }
//     });
//   }, [tokenSortField, tokenSortDirection]);

//   // Filter pools based on search query
//   const filteredPools = poolData.filter((pool) => {
//     const query = searchQuery.trim().toLowerCase();
//     return (
//       pool.vault.toLowerCase().includes(query) ||
//       pool.pair.toLowerCase().includes(query) ||
//       pool.tokenAddress.toLowerCase().includes(query)
//     );
//   });

//   // Sorted pool data
//   const sortedPoolData = useMemo(() => {
//     if (!poolSortField || !poolSortDirection) return filteredPools;

//     return [...filteredPools].sort((a, b) => {
//       let aValue: string | number;
//       let bValue: string | number;

//       if (poolSortField === "vault") {
//         aValue = a.vault.toLowerCase();
//         bValue = b.vault.toLowerCase();
//       } else if (poolSortField === "pair") {
//         aValue = a.pair.toLowerCase();
//         bValue = b.pair.toLowerCase();
//       } else if (poolSortField === "price") {
//         aValue = a.price;
//         bValue = b.price;
//       } else {
//         return 0;
//       }

//       if (typeof aValue === "string" && typeof bValue === "string") {
//         return poolSortDirection === "asc"
//           ? aValue.localeCompare(bValue)
//           : bValue.localeCompare(aValue);
//       } else {
//         return poolSortDirection === "asc"
//           ? (aValue as number) - (bValue as number)
//           : (bValue as number) - (aValue as number);
//       }
//     });
//   }, [filteredPools, poolSortField, poolSortDirection]);

//   // Calculate pool pagination
//   const totalPoolPages = Math.ceil(sortedPoolData.length / poolItemsPerPage);
//   const poolStartIndex = (currentPoolPage - 1) * poolItemsPerPage;
//   const poolEndIndex = poolStartIndex + poolItemsPerPage;
//   const currentPools = sortedPoolData.slice(poolStartIndex, poolEndIndex);

//   // Calculate token pagination
//   const totalTokenPages = Math.ceil(sortedTokenData.length / tokenItemsPerPage);
//   const tokenStartIndex = (currentTokenPage - 1) * tokenItemsPerPage;
//   const tokenEndIndex = tokenStartIndex + tokenItemsPerPage;
//   const currentTokens = sortedTokenData.slice(tokenStartIndex, tokenEndIndex);

//   // Reset to page 1 when search query changes
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//     setCurrentPoolPage(1);
//   };

//   const handlePoolItemsPerPageChange = (
//     e: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     setPoolItemsPerPage(Number(e.target.value));
//     setCurrentPoolPage(1);
//   };

//   const handleTokenItemsPerPageChange = (
//     e: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     setTokenItemsPerPage(Number(e.target.value));
//     setCurrentTokenPage(1);
//   };

//   const truncateAddress = (address: string) => {
//     return `${address.slice(0, 6)}...${address.slice(-4)}`;
//   };

//   const handleCopyAddress = (address: string, id: number) => {
//     navigator.clipboard.writeText(address).then(() => {
//       setCopiedId(id);
//       setTimeout(() => setCopiedId(null), 2000);
//     });
//   };

//   const handleExternalLink = (address: string) => {
//     window.open(`https://etherscan.io/address/${address}`, "_blank");
//   };

//   return (
//     <div className="space-y-10">
//       {/* Dashboard Cards Section */}
//       <section>
//         <h1 className="text-white font-bold text-[clamp(30px,1vw+26px,38px)] leading-loose">
//           Recovery Pools
//         </h1>
//         <p className="text-[#9798A4] font-medium text-[clamp(14px,0.35vw+13px,16px)]">
//           Monitor recovery pool prices and token burn progress
//         </p>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
//           {dashboardData.map((card, index) => (
//             <div
//               key={index}
//               className="bg-[#101012] backdrop-blur-md border border-[#23252A] rounded-lg p-6 hover:bg-[#23252A] flex flex-col gap-2"
//             >
//               <h3 className="text-[#9798A4] text-base">{card.title}</h3>
//               <p className="text-white text-[32px] font-bold">{card.value}</p>
//               {card.subtitle && (
//                 <p className="text-[#9798A4] text-base">{card.subtitle}</p>
//               )}
//               {card.change && (
//                 <p
//                   className={`text-sm ${
//                     card.changeType === "positive"
//                       ? "text-green-500"
//                       : "text-red-500"
//                   }`}
//                 >
//                   {card.change}
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Recovery Tokens Section */}
//       <section>
//         <h1 className="text-white leading-loose text-[clamp(20px,0.5vw+19px,24px)] font-semibold">
//           Recovery Tokens
//         </h1>
//         <p className="text-[#9798A4] font-medium text-[clamp(14px,0.35vw+13px,16px)]">
//           Monitor recovery token burn progress
//         </p>

//         <div className="bg-[#101012] border border-[#23252A] rounded-lg overflow-hidden mt-4">
//           <div className="overflow-x-auto">
//             <div className="min-w-[600px]">
//               {/* Table Header */}
//               <div
//                 className="grid gap-4 px-6 py-3 bg-[#151618] border-b border-[#23252A] text-[#97979A] text-sm font-semibold"
//                 style={{
//                   gridTemplateColumns: "clamp(60px, 15vw, 250px) 1fr 2fr",
//                 }}
//               >
//                 <div className="flex items-center">
//                   <p>Token</p>
//                   <button
//                     onClick={() => handleTokenSort("token")}
//                     className="flex items-center cursor-pointer text-left"
//                   >
//                     <SortArrowIcon className="w-5 h-5 text-[#97979A] ml-1 shrink-0" />
//                   </button>
//                 </div>
//                 <div>Token Address</div>
//                 <div className="flex items-center">
//                   <p>Burn Progress</p>
//                   <button
//                     onClick={() => handleTokenSort("burnProgress")}
//                     className="flex items-center cursor-pointer text-left"
//                   >
//                     <SortArrowIcon className="w-5 h-5 text-[#97979A] ml-1 shrink-0" />
//                   </button>
//                 </div>
//               </div>

//               {/* Table Body */}
//               {currentTokens.map((item) => (
//                 <div
//                   key={item.id}
//                   className="grid gap-4 px-6 h-16 border-b border-[#23252A] last:border-b-0 lg:bg-transparent transition-colors items-center"
//                   style={{
//                     gridTemplateColumns: "clamp(60px, 15vw, 250px) 1fr 2fr",
//                   }}
//                 >
//                   {/* Token Name */}
//                   <div className="text-[#7C3BED] truncate font-semibold text-sm whitespace-nowrap">
//                     {item.token}
//                   </div>

//                   {/* Token Address */}
//                   <div className="flex items-center gap-2">
//                     <span className="text-[#EAECEF] font-mono text-sm">
//                       {truncateAddress(item.tokenAddress)}
//                     </span>
//                     <button
//                       onClick={() =>
//                         handleCopyAddress(item.tokenAddress, item.id)
//                       }
//                       className="flex items-center justify-center cursor-pointer h-6 w-6 p-0"
//                     >
//                       {copiedId === item.id ? <CheckmarkIcon /> : <CopyIcon />}
//                     </button>
//                   </div>

//                   {/* Burn Progress */}
//                   <div className="flex items-center gap-4">
//                     <div className="flex-1">
//                       <div className="text-[#97979A] text-sm mb-2">
//                         {item.burnStatus}
//                       </div>
//                       <div className="w-full bg-[#23252A] rounded-full h-2">
//                         <div
//                           className="bg-[#7C3BED] h-2 rounded-full transition-all duration-300"
//                           style={{ width: `${item.burnProgress}%` }}
//                         ></div>
//                       </div>
//                     </div>
//                     <span className="text-[#7C3BED] font-semibold text-sm min-w-[50px] text-right">
//                       {item.burnProgress}%
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Token Pagination */}
//           {sortedTokenData.length > 0 && (
//             <div className="flex items-center justify-between text-sm md:px-6 bg-[#151618] border-t border-[#23252A]">
//               {/* Left side - Items per page */}
//               <div className="flex items-center gap-2">
//                 <div className="hidden md:flex items-center gap-2 py-3">
//                   <span className="text-[#97979A]">Items per page:</span>
//                   <select
//                     value={tokenItemsPerPage}
//                     onChange={handleTokenItemsPerPageChange}
//                     className="text-white bg-[#151618] cursor-pointer"
//                   >
//                     <option value={5}>5</option>
//                     <option value={10}>10</option>
//                     <option value={20}>20</option>
//                     <option value={50}>50</option>
//                   </select>
//                 </div>
//                 <span className="text-[#97979A] border-r md:border-l border-[#23252a] px-4 py-3">
//                   {tokenStartIndex + 1}-
//                   {Math.min(tokenEndIndex, sortedTokenData.length)} of{" "}
//                   {sortedTokenData.length} items
//                 </span>
//               </div>

//               {/* Right side - Navigation */}
//               <div className="flex items-center gap-2">
//                 <div className="hidden md:flex items-center gap-2">
//                   <button
//                     onClick={() =>
//                       setCurrentTokenPage((prev) => Math.max(prev - 1, 1))
//                     }
//                     disabled={currentTokenPage === 1}
//                     className="px-3 text-white disabled:text-[#97979A] cursor-pointer disabled:cursor-not-allowed"
//                   >
//                     &lt; Previous
//                   </button>
//                   <span className="text-[#97979A]">
//                     {currentTokenPage} of {totalTokenPages} pages
//                   </span>
//                   <button
//                     onClick={() =>
//                       setCurrentTokenPage((prev) =>
//                         Math.min(prev + 1, totalTokenPages)
//                       )
//                     }
//                     disabled={currentTokenPage === totalTokenPages}
//                     className="text-white disabled:text-[#97979A] cursor-pointer disabled:cursor-not-allowed px-3"
//                   >
//                     Next &gt;
//                   </button>
//                 </div>
//                 <div className="flex items-center gap-4 md:hidden">
//                   <button
//                     onClick={() =>
//                       setCurrentTokenPage((prev) => Math.max(prev - 1, 1))
//                     }
//                     disabled={currentTokenPage === 1}
//                     className="border-r border-l border-[#23252a] py-3 px-4 text-white disabled:text-[#97979A] disabled:cursor-not-allowed cursor-pointer"
//                   >
//                     <BackwardIcon className="w-4 h-4 rotate-90" />
//                   </button>
//                   <button
//                     onClick={() =>
//                       setCurrentTokenPage((prev) =>
//                         Math.min(prev + 1, totalTokenPages)
//                       )
//                     }
//                     disabled={currentTokenPage === totalTokenPages}
//                     className="py-3 pr-4 text-white disabled:text-[#97979A] cursor-pointer disabled:cursor-not-allowed"
//                   >
//                     <ForwardIcon className="w-4 h-4 rotate-270" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Recovery Pools Section with Pagination */}
//       <section>
//         <h1 className="text-white leading-loose text-[clamp(20px,0.5vw+19px,24px)] font-semibold">
//           Recovery Pools
//         </h1>
//         <p className="text-[#9798A4] font-medium text-[clamp(14px,0.35vw+13px,16px)]">
//           View recovery pool prices and trading pairs
//         </p>

//         <div className="bg-[#151618] border-b border-[#23252A] rounded-lg overflow-hidden mt-4 p-6">
//           {/* Search Bar */}
//           <div className="relative">
//             <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9798A4]" />
//             <input
//               type="text"
//               placeholder="Search pool by valut, pair or address..."
//               value={searchQuery}
//               onChange={handleSearchChange}
//               className="w-full max-w-lg bg-transparent border border-[#626366] rounded-lg pl-10 pr-4 py-2 text-[#9798A4] placeholder-[#9798A4] focus:outline-none"
//             />
//           </div>
//         </div>

//         <div className="bg-[#101012] border border-[#23252A] rounded-lg overflow-hidden mt-4 w-full">
//           <div className="overflow-x-auto">
//             <div className="min-w-[600px]">
//               {/* Table Header */}
//               <div
//                 className="grid gap-8 px-6 py-3 bg-[#151618] border-b border-[#23252A] text-[#9798A4] text-left text-sm font-medium"
//                 style={{
//                   gridTemplateColumns:
//                     "clamp(90px, 12vw, 200px) clamp(80px, 12vw, 200px) clamp(150px, 25vw, 420px) 1fr",
//                 }}
//               >
//                 <div className="flex items-center">
//                   <p>Vault</p>
//                   <button
//                     onClick={() => handlePoolSort("vault")}
//                     className="flex items-center cursor-pointer transition-colors text-left"
//                   >
//                     <SortArrowIcon className="w-5 h-5 text-[#97979A] ml-1 shrink-0" />
//                   </button>
//                 </div>
//                 <div className="flex items-center">
//                   <p>Pair</p>
//                   <button
//                     onClick={() => handlePoolSort("pair")}
//                     className="flex items-center cursor-pointer text-left"
//                   >
//                     <SortArrowIcon className="w-5 h-5 text-[#97979A] ml-1 shrink-0" />
//                   </button>
//                 </div>
//                 <div>Pool Address</div>
//                 <div className="flex items-center">
//                   <p>Price</p>
//                   <button
//                     onClick={() => handlePoolSort("price")}
//                     className="flex items-center cursor-pointer text-left"
//                   >
//                     <SortArrowIcon className="w-5 h-5 text-[#97979A] ml-1 shrink-0" />
//                   </button>
//                 </div>
//               </div>

//               {/* Table Body */}
//               {currentPools.length > 0 ? (
//                 currentPools.map((pool) => (
//                   <div
//                     key={pool.id}
//                     className="grid gap-8 px-6 py-4 border-b border-[#23252A] last:border-b-0 lg:bg-transparent text-start"
//                     style={{
//                       gridTemplateColumns:
//                         "clamp(90px, 12vw, 200px) clamp(80px, 12vw, 200px) clamp(150px, 25vw, 420px) 1fr",
//                     }}
//                   >
//                     {/* Vault */}
//                     <div className="text-[#7C3BED] font-semibold text-sm whitespace-nowrap pr-4">
//                       {pool.vault}
//                     </div>

//                     {/* Pair */}
//                     <div className="text-[#7C3BED] font-semibold text-sm whitespace-nowrap pr-4">
//                       {pool.pair}
//                     </div>

//                     {/* Token Address */}
//                     <div className="flex items-center gap-2">
//                       <span className="text-[#EAECEF] font-mono text-sm">
//                         {truncateAddress(pool.tokenAddress)}
//                       </span>
//                       <button
//                         onClick={() =>
//                           handleCopyAddress(pool.tokenAddress, pool.id)
//                         }
//                         className="flex items-center justify-center cursor-pointer h-6 w-6 p-0"
//                       >
//                         {copiedId === pool.id ? (
//                           <CheckmarkIcon />
//                         ) : (
//                           <CopyIcon />
//                         )}
//                       </button>
//                       <button
//                         onClick={() => handleExternalLink(pool.tokenAddress)}
//                         className="flex items-center justify-center cursor-pointer h-6 w-6 p-0 text-[#EAECEF]"
//                         title="View on explorer"
//                       >
//                         <ExternalLinkIcon />
//                       </button>
//                     </div>

//                     {/* Price */}
//                     <div className="text-[#EAECEF] font-medium text-sm whitespace-nowrap">
//                       $
//                       {pool.price.toLocaleString("en-US", {
//                         minimumFractionDigits: 2,
//                         maximumFractionDigits: 4,
//                       })}
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="px-6 py-12 text-center">
//                   <p className="text-gray-500 text-sm">
//                     {`No pools found matching "${searchQuery}"`}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Pool Pagination */}
//           {sortedPoolData.length > 0 && (
//             <div className="flex items-center justify-between text-sm md:px-6 bg-[#151618] border-t border-[#23252A]">
//               {/* Left side - Items per page */}
//               <div className="flex items-center gap-2">
//                 <div className="hidden md:flex items-center gap-2 py-3">
//                   <span className="text-[#97979A]">Items per page:</span>
//                   <select
//                     value={poolItemsPerPage}
//                     onChange={handlePoolItemsPerPageChange}
//                     className="text-white bg-[#151618] cursor-pointer"
//                   >
//                     <option value={5}>5</option>
//                     <option value={10}>10</option>
//                     <option value={20}>20</option>
//                     <option value={50}>50</option>
//                   </select>
//                 </div>
//                 <span className="text-[#97979A] border-r md:border-l border-[#23252a] px-4 py-3">
//                   {poolStartIndex + 1}-
//                   {Math.min(poolEndIndex, sortedPoolData.length)} of{" "}
//                   {sortedPoolData.length} items
//                 </span>
//               </div>

//               {/* Right side - Navigation */}
//               <div className="flex items-center gap-2">
//                 <div className="hidden md:flex items-center gap-2">
//                   <button
//                     onClick={() =>
//                       setCurrentPoolPage((prev) => Math.max(prev - 1, 1))
//                     }
//                     disabled={currentPoolPage === 1}
//                     className="px-3 text-white disabled:text-[#97979A] cursor-pointer disabled:cursor-not-allowed"
//                   >
//                     &lt; Previous
//                   </button>
//                   <span className="text-[#97979A]">
//                     {currentPoolPage} of {totalPoolPages} pages
//                   </span>
//                   <button
//                     onClick={() =>
//                       setCurrentPoolPage((prev) =>
//                         Math.min(prev + 1, totalPoolPages)
//                       )
//                     }
//                     disabled={currentPoolPage === totalPoolPages}
//                     className="text-white disabled:text-[#97979A] cursor-pointer disabled:cursor-not-allowed px-3"
//                   >
//                     Next &gt;
//                   </button>
//                 </div>
//                 <div className="flex items-center gap-4 md:hidden">
//                   <button
//                     onClick={() =>
//                       setCurrentPoolPage((prev) => Math.max(prev - 1, 1))
//                     }
//                     disabled={currentPoolPage === 1}
//                     className="border-r border-l border-[#23252a] py-3 px-4 text-white disabled:text-[#97979A] disabled:cursor-not-allowed cursor-pointer"
//                   >
//                     <BackwardIcon className="w-4 h-4 rotate-90" />
//                   </button>
//                   <button
//                     onClick={() =>
//                       setCurrentPoolPage((prev) =>
//                         Math.min(prev + 1, totalPoolPages)
//                       )
//                     }
//                     disabled={currentPoolPage === totalPoolPages}
//                     className="py-3 pr-4 text-white disabled:text-[#97979A] cursor-pointer disabled:cursor-not-allowed"
//                   >
//                     <ForwardIcon className="w-4 h-4 rotate-270" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// }

"use client";
import { useCallback } from "react";
import { dashboardData, poolData, tokenData } from "@/constants/data";
import { DashboardGrid } from "@/components/dashboard/Dashboard";
import { SearchBar } from "@/components/search/SearchBar";
import {
  Table,
  TableHeader,
  TableRow,
  TableBody,
} from "@/components/table/Table";
import { TablePagination } from "@/components/table/TablePagination";
import { SortableHeader } from "@/components/table/SortableHeader";
import { AddressDisplay } from "@/components/shared/AddressDisplay";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { useSort } from "@/hooks/useSort";
import { usePagination } from "@/hooks/usePagination";
import { useSearch } from "@/hooks/useSearch";

export default function Home() {
  // Token sorting logic
  const { sortedData: sortedTokens, handleSort: handleTokenSort } = useSort(
    tokenData,
    (item, field) => {
      if (field === "token") return item.token.toLowerCase();
      if (field === "burnProgress") return item.burnProgress;
      return "";
    }
  );

  // Token pagination
  const {
    currentPage: tokenPage,
    setCurrentPage: setTokenPage,
    itemsPerPage: tokenItemsPerPage,
    setItemsPerPage: setTokenItemsPerPage,
    totalPages: tokenTotalPages,
    startIndex: tokenStartIndex,
    endIndex: tokenEndIndex,
    currentData: currentTokens,
  } = usePagination(sortedTokens, 5);

  // Pool search logic
  const poolSearchFields = useCallback(
    (pool: (typeof poolData)[0]) => [pool.vault, pool.pair, pool.tokenAddress],
    []
  );

  const {
    searchQuery,
    setSearchQuery,
    filteredData: filteredPools,
  } = useSearch(poolData, poolSearchFields);

  // Pool sorting logic
  const { sortedData: sortedPools, handleSort: handlePoolSort } = useSort(
    filteredPools,
    (item, field) => {
      if (field === "vault") return item.vault.toLowerCase();
      if (field === "pair") return item.pair.toLowerCase();
      if (field === "price") return item.price;
      return "";
    }
  );

  // Pool pagination
  const {
    currentPage: poolPage,
    setCurrentPage: setPoolPage,
    itemsPerPage: poolItemsPerPage,
    setItemsPerPage: setPoolItemsPerPage,
    totalPages: poolTotalPages,
    startIndex: poolStartIndex,
    endIndex: poolEndIndex,
    currentData: currentPools,
  } = usePagination(sortedPools, 5);

  // Grid column definitions
  const tokenGridColumns = "clamp(60px, 15vw, 250px) 1fr 2fr";
  const poolGridColumns =
    "clamp(90px, 12vw, 200px) clamp(80px, 12vw, 200px) clamp(150px, 25vw, 420px) 1fr";

  return (
    <div className="space-y-10">
      {/* Dashboard Cards Section */}
      <section>
        <h1 className="text-white font-bold text-[clamp(30px,1vw+26px,38px)] leading-loose">
          Recovery Pools
        </h1>
        <p className="text-[#9798A4] font-medium text-[clamp(14px,0.35vw+13px,16px)]">
          Monitor recovery pool prices and token burn progress
        </p>
        <DashboardGrid cards={dashboardData} />
      </section>

      {/* Recovery Tokens Section */}
      <section>
        <h1 className="text-white leading-loose text-[clamp(20px,0.5vw+19px,24px)] font-semibold">
          Recovery Tokens
        </h1>
        <p className="text-[#9798A4] font-medium text-[clamp(14px,0.35vw+13px,16px)]">
          Monitor recovery token burn progress
        </p>

        <div className="mt-4">
          <Table>
            <TableHeader gridColumns={tokenGridColumns}>
              <SortableHeader
                label="Token"
                onSort={() => handleTokenSort("token")}
              />
              <div>Token Address</div>
              <SortableHeader
                label="Burn Progress"
                onSort={() => handleTokenSort("burnProgress")}
              />
            </TableHeader>

            <TableBody isEmpty={currentTokens.length === 0}>
              {currentTokens.map((item) => (
                <TableRow key={item.id} gridColumns={tokenGridColumns}>
                  <div className="text-[#7C3BED] truncate font-semibold text-sm whitespace-nowrap">
                    {item.token}
                  </div>
                  <AddressDisplay
                    address={item.tokenAddress}
                    id={item.id}
                    showExternalLink={false}
                  />
                  <ProgressBar
                    label={item.burnStatus}
                    percentage={item.burnProgress}
                  />
                </TableRow>
              ))}
            </TableBody>

            {sortedTokens.length > 0 && (
              <TablePagination
                currentPage={tokenPage}
                totalPages={tokenTotalPages}
                itemsPerPage={tokenItemsPerPage}
                totalItems={sortedTokens.length}
                startIndex={tokenStartIndex}
                endIndex={tokenEndIndex}
                onPageChange={setTokenPage}
                onItemsPerPageChange={setTokenItemsPerPage}
              />
            )}
          </Table>
        </div>
      </section>

      {/* Recovery Pools Section */}
      <section>
        <h1 className="text-white leading-loose text-[clamp(20px,0.5vw+19px,24px)] font-semibold">
          Recovery Pools
        </h1>
        <p className="text-[#9798A4] font-medium text-[clamp(14px,0.35vw+13px,16px)]">
          View recovery pool prices and trading pairs
        </p>

        <div className="mt-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search pool by vault, pair or address..."
          />
        </div>

        <div className="mt-4">
          <Table>
            <TableHeader gridColumns={poolGridColumns}>
              <SortableHeader
                label="Vault"
                onSort={() => handlePoolSort("vault")}
              />
              <SortableHeader
                label="Pair"
                onSort={() => handlePoolSort("pair")}
              />
              <div>Pool Address</div>
              <SortableHeader
                label="Price"
                onSort={() => handlePoolSort("price")}
              />
            </TableHeader>

            <TableBody
              isEmpty={currentPools.length === 0}
              emptyMessage={`No pools found matching "${searchQuery}"`}
            >
              {currentPools.map((pool) => (
                <TableRow key={pool.id} gridColumns={poolGridColumns}>
                  <div className="text-[#7C3BED] font-semibold text-sm whitespace-nowrap pr-4">
                    {pool.vault}
                  </div>
                  <div className="text-[#7C3BED] font-semibold text-sm whitespace-nowrap pr-4">
                    {pool.pair}
                  </div>
                  <AddressDisplay address={pool.tokenAddress} id={pool.id} />
                  <div className="text-[#EAECEF] font-medium text-sm whitespace-nowrap">
                    $
                    {pool.price.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 4,
                    })}
                  </div>
                </TableRow>
              ))}
            </TableBody>

            {sortedPools.length > 0 && (
              <TablePagination
                currentPage={poolPage}
                totalPages={poolTotalPages}
                itemsPerPage={poolItemsPerPage}
                totalItems={sortedPools.length}
                startIndex={poolStartIndex}
                endIndex={poolEndIndex}
                onPageChange={setPoolPage}
                onItemsPerPageChange={setPoolItemsPerPage}
              />
            )}
          </Table>
        </div>
      </section>
    </div>
  );
}
