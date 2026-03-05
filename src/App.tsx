import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Settings, 
  ChevronDown, 
  ChevronRight, 
  Menu,
  Grid,
  ChevronUp,
  Bookmark,
  ClipboardList,
  User,
  FileText,
  RefreshCw,
  Shuffle,
  List,
  Star,
  AlertCircle
} from 'lucide-react';

const workQueueData = [
  { name: 'AccountHolderCount', available: 0, checkedOut: 0, failed: 0, executors: 10, state: 'Started', writerStatus: 'Never executed' },
  { name: 'AccountPurgeWorkQueue', available: 0, checkedOut: 0, failed: 0, executors: 10, state: 'Started', writerStatus: 'Never executed' },
  { name: 'AccountWithdraw', available: 0, checkedOut: 0, failed: 0, executors: 10, state: 'Started', writerStatus: 'Last executed at 02/24/2026 2:01 AM' },
  { name: 'ActivityEsc', available: 0, checkedOut: 0, failed: 0, executors: 10, state: 'Started', writerStatus: 'Last executed at 02/24/2026 11:00 PM' },
  { name: 'ActivityRetire', available: 0, checkedOut: 0, failed: 0, executors: 10, state: 'Started', writerStatus: 'Last executed at 02/24/2026 12:30 AM' },
  { name: 'AgentPreviewFlagUpdateWorkqueue', available: 0, checkedOut: 0, failed: 0, executors: 10, state: 'Started', writerStatus: 'Last executed at 02/24/2026 8:00 PM' },
  { name: 'ApplyPendingAccountDataUpdates', available: 0, checkedOut: 0, failed: 0, executors: 10, state: 'Started', writerStatus: 'Never executed' },
  { name: 'ArchivePolicyTerm', available: 0, checkedOut: 0, failed: 0, executors: 0, state: 'Stopped', writerStatus: 'Never executed' },
  { name: 'ArchiveReferenceTrackingSync', available: 0, checkedOut: 0, failed: 0, executors: 0, state: 'Stopped', writerStatus: 'Never executed' },
  { name: 'AsyncQuoting', available: 0, checkedOut: 0, failed: 0, executors: 0, state: 'Stopped', writerStatus: 'Never executed' },
  { name: 'AsyncRating', available: 0, checkedOut: 0, failed: 0, executors: 10, state: 'Started', writerStatus: 'Never executed' },
  { name: 'AuditTask', available: 0, checkedOut: 0, failed: 0, executors: 10, state: 'Started', writerStatus: 'Last executed at 02/24/2026 5:06 AM' },
  { name: 'AutoBrokerInbound_Ext', available: 0, checkedOut: 0, failed: 0, executors: 10, state: 'Started', writerStatus: 'Never executed' },
  { name: 'AutomaticBindWorkQueue', available: 0, checkedOut: 0, failed: 0, executors: 10, state: 'Started', writerStatus: 'Last executed at 02/24/2026 11:00 PM' },
  { name: 'BizRulesValidator', available: 0, checkedOut: 0, failed: 0, executors: 10, state: 'Started', writerStatus: 'Last executed at 02/21/2026 6:41 PM' },
  { name: 'BoundPolicyException', available: 0, checkedOut: 0, failed: 0, executors: 10, state: 'Started', writerStatus: 'Never executed' },
  { name: 'BRTRenewalWorkqueue_Ext', available: 0, checkedOut: 0, failed: 0, executors: 10, state: 'Started', writerStatus: 'Never executed' },
  { name: 'BRTSubmissionWorkqueue_Ext', available: 0, checkedOut: 0, failed: 0, executors: 10, state: 'Started', writerStatus: 'Never executed' },
  { name: 'BulkDataChangeWorkQueue', available: 0, checkedOut: 0, failed: 0, executors: 10, state: 'Started', writerStatus: 'Never executed' },
  { name: 'CEADatamigration_Ext', available: 0, checkedOut: 0, failed: 0, executors: 10, state: 'Started', writerStatus: 'Never executed' },
];

const clusterMembersData = Array.from({ length: 63 }).map((_, i) => {
  const status = i % 5 === 0 ? 'Shutdown' : i % 7 === 0 ? 'Unknown' : 'Running';
  const runLevel = i % 3 === 0 ? 'Daemons' : 'Multiuser';
  return {
    serverId: `server-${1000 + i}`,
    status,
    host: `host-${10 + (i % 5)}.internal.net`,
    userSessions: status === 'Running' ? Math.floor(Math.random() * 100) : 0,
    runLevel,
    version: '10.0.2',
    serverRoles: i % 2 === 0 ? 'ui, batch' : 'ui',
    serverStarted: '02/24/2026 1:00 AM',
    connectionStarted: '02/24/2026 1:05 AM',
    lastUpdate: '02/24/2026 10:00 AM',
    plannedShutdown: 'None',
  };
});

export default function App() {
  const [currentPage, setCurrentPage] = useState<'users' | 'activities' | 'serverTools'>('users');
  const [serverToolsPage, setServerToolsPage] = useState<'workQueue' | 'clusterMembers'>('workQueue');
  const [isClusterExpanded, setIsClusterExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  
  const [clusterPage, setClusterPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(clusterMembersData.length / rowsPerPage);
  const currentClusterData = clusterMembersData.slice((clusterPage - 1) * rowsPerPage, clusterPage * rowsPerPage);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.shiftKey && e.key.toLowerCase() === 't') {
        if (currentPage !== 'users') {
          setCurrentPage('serverTools');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchValue.toLowerCase() === 'admin') {
      setCurrentPage('activities');
      setSearchValue('');
    }
  };

  return (
    <div className="flex flex-col h-screen font-sans bg-white overflow-hidden text-gray-800">
      {/* Header */}
      <header className="bg-[#1d3654] text-white flex items-center justify-between px-4 py-1.5 text-xs">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 font-bold text-base">
            <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center relative overflow-hidden border border-white/20">
               <div className="absolute bottom-0 w-full h-[45%] bg-blue-800"></div>
               <div className="w-2 h-2 bg-white rounded-full z-10 shadow-sm"></div>
               <div className="absolute top-0.5 w-0.5 h-1.5 bg-white z-10"></div>
               <div className="absolute top-1.5 left-0.5 w-1.5 h-0.5 bg-white z-10 rotate-45"></div>
               <div className="absolute top-1.5 right-0.5 w-1.5 h-0.5 bg-white z-10 -rotate-45"></div>
            </div>
            <span className="tracking-wider">FARMERS <span className="text-[10px] font-normal tracking-normal align-middle">INSURANCE</span></span>
          </div>
          <nav className="flex items-center space-x-4">
            {currentPage === 'serverTools' ? (
              <div className="flex items-center cursor-pointer hover:text-gray-300 font-medium">
                Server Tools <ChevronDown size={12} className="ml-1 opacity-70" />
              </div>
            ) : (
              <>
                <a href="#" className="hover:text-gray-300 font-medium">Tab-1</a>
                <a href="#" className="hover:text-gray-300">My Worklist</a>
                <a href="#" className="hover:text-gray-300">Desktop</a>
                <div className="flex items-center cursor-pointer hover:text-gray-300">
                  Account <ChevronDown size={12} className="ml-1 opacity-70" />
                </div>
                <div className="flex items-center cursor-pointer hover:text-gray-300">
                  Policy <ChevronDown size={12} className="ml-1 opacity-70" />
                </div>
                <div className="flex items-center cursor-pointer hover:text-gray-300">
                  Contact <ChevronDown size={12} className="ml-1 opacity-70" />
                </div>
                <a href="#" className="hover:text-gray-300">Search</a>
                <div className="flex items-center cursor-pointer hover:text-gray-300">
                  Farmers Links <ChevronDown size={12} className="ml-1 opacity-70" />
                </div>
              </>
            )}
          </nav>
        </div>
        <div className="flex items-center space-x-3">
          <Bookmark size={14} className="cursor-pointer hover:text-gray-300" />
          <Settings size={14} className="cursor-pointer hover:text-gray-300" />
          <div className="relative">
            <input 
              type="text" 
              placeholder="Go to (Alt+/)" 
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="text-black px-2 py-0.5 text-xs w-48 rounded-sm focus:outline-none border border-gray-400"
            />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 bg-[#1d3654] text-white flex flex-col overflow-y-auto text-xs select-none">
          {currentPage === 'serverTools' ? (
            <>
              <div className="bg-[#005b9f] px-2 py-1.5 font-semibold flex items-center justify-between cursor-pointer border-b border-[#1d3654]">
                <div className="flex items-center">
                  <Menu size={14} className="mr-1.5" />
                  Actions
                </div>
                <ChevronRight size={14} className="opacity-80" />
              </div>
              
              <div className="flex flex-col font-medium">
                <div className="px-2 py-1.5 flex items-center cursor-pointer hover:bg-[#2a4a6d] border-b border-[#2a4a6d]">
                  Batch Process Info
                </div>
                <div 
                  className={`${serverToolsPage === 'workQueue' ? 'bg-[#3a5b82]' : 'hover:bg-[#2a4a6d]'} px-2 py-1.5 flex items-center cursor-pointer border-b border-[#2a4a6d]`}
                  onClick={() => setServerToolsPage('workQueue')}
                >
                  Work Queue Info
                </div>
                <div className="px-2 py-1.5 flex items-center cursor-pointer hover:bg-[#2a4a6d] border-b border-[#2a4a6d]">
                  Set Log Level
                </div>
                <div className="px-2 py-1.5 flex items-center cursor-pointer hover:bg-[#2a4a6d] border-b border-[#2a4a6d]">
                  View Logs
                </div>
                <div className="px-2 py-1.5 flex items-center cursor-pointer hover:bg-[#2a4a6d] border-b border-[#2a4a6d]">
                  Intentional Logging
                </div>
                <div className="px-2 py-1.5 flex items-center justify-between cursor-pointer hover:bg-[#2a4a6d] border-b border-[#2a4a6d]">
                  Info Pages <ChevronDown size={14} className="opacity-80" />
                </div>
                <div className="px-2 py-1.5 flex items-center cursor-pointer hover:bg-[#2a4a6d] border-b border-[#2a4a6d]">
                  Management Beans
                </div>
                <div className="px-2 py-1.5 flex items-center cursor-pointer hover:bg-[#2a4a6d] border-b border-[#2a4a6d]">
                  Startable Services
                </div>
                <div 
                  className="px-2 py-1.5 flex items-center justify-between cursor-pointer hover:bg-[#2a4a6d] border-b border-[#2a4a6d]"
                  onClick={() => setIsClusterExpanded(!isClusterExpanded)}
                >
                  Cluster <ChevronDown size={14} className={`opacity-80 transition-transform ${isClusterExpanded ? 'rotate-180' : ''}`} />
                </div>
                {isClusterExpanded && (
                  <div className="pl-5 flex flex-col text-gray-200 bg-[#152840]">
                    <div 
                      className={`py-1 flex items-center cursor-pointer hover:text-white ${serverToolsPage === 'clusterMembers' ? 'text-white font-bold' : ''}`}
                      onClick={() => setServerToolsPage('clusterMembers')}
                    >
                      <ChevronRight size={12} className="mr-1 opacity-70"/> Members
                    </div>
                    <div className="py-1 flex items-center cursor-pointer hover:text-white">
                      <ChevronRight size={12} className="mr-1 opacity-70"/> Components
                    </div>
                  </div>
                )}
                <div className="px-2 py-1.5 flex items-center cursor-pointer hover:bg-[#2a4a6d] border-b border-[#2a4a6d]">
                  Upgrade and Versions
                </div>
                <div className="px-2 py-1.5 flex items-center justify-between cursor-pointer hover:bg-[#2a4a6d] border-b border-[#2a4a6d]">
                  Cache Info <ChevronDown size={14} className="opacity-80" />
                </div>
                <div className="px-2 py-1.5 flex items-center justify-between cursor-pointer hover:bg-[#2a4a6d] border-b border-[#2a4a6d]">
                  Guidewire Profiler <ChevronDown size={14} className="opacity-80" />
                </div>
                <div className="px-2 py-1.5 flex items-center cursor-pointer hover:bg-[#2a4a6d] border-b border-[#2a4a6d]">
                  Product Model Info
                </div>
                <div className="px-2 py-1.5 flex items-center cursor-pointer hover:bg-[#2a4a6d] border-b border-[#2a4a6d]">
                  Support Queries
                </div>
                <div className="px-2 py-1.5 flex items-center cursor-pointer hover:bg-[#2a4a6d] border-b border-[#2a4a6d]">
                  Migration Payload Tester
                </div>
              </div>
            </>
          ) : currentPage === 'users' ? (
            <>
              <div className="bg-[#005b9f] px-2 py-1.5 font-semibold flex items-center justify-between cursor-pointer border-b border-[#1d3654]">
                <div className="flex items-center">
                  <Menu size={14} className="mr-1.5" />
                  Actions
                </div>
              </div>
              
              <div className="flex flex-col">
                {/* Internal Organization */}
                <div className="px-2 py-1.5 flex items-center cursor-pointer hover:bg-[#2a4a6d] border-b border-[#2a4a6d]">
                  <ChevronDown size={14} className="mr-1 opacity-80" />
                  Internal Organization
                </div>
                <div className="pl-5 flex flex-col text-gray-200 bg-[#152840]">
                  <div className="py-1 flex items-center cursor-pointer hover:text-white"><ChevronRight size={12} className="mr-1 opacity-70"/> Administrative</div>
                  <div className="py-1 flex items-center cursor-pointer hover:text-white"><ChevronRight size={12} className="mr-1 opacity-70"/> Claims</div>
                  <div className="py-1 flex items-center cursor-pointer hover:text-white"><ChevronRight size={12} className="mr-1 opacity-70"/> Finance</div>
                  <div className="py-1 flex items-center cursor-pointer hover:text-white"><ChevronRight size={12} className="mr-1 opacity-70"/> Information Technology</div>
                  <div className="py-1 flex items-center cursor-pointer hover:text-white"><ChevronRight size={12} className="mr-1 opacity-70"/> Legal</div>
                  <div className="py-1 flex items-center cursor-pointer hover:text-white"><ChevronRight size={12} className="mr-1 opacity-70"/> Personal Lines</div>
                  <div className="py-1 flex items-center cursor-pointer hover:text-white"><ChevronRight size={12} className="mr-1 opacity-70"/> University of Farmers</div>
                </div>

                {/* Users & Security */}
                <div className="bg-[#3a5b82] px-2 py-1.5 flex items-center cursor-pointer border-b border-[#2a4a6d]">
                  <ChevronDown size={14} className="mr-1 opacity-80" />
                  Users & Security
                </div>
                <div className="pl-5 flex flex-col text-white font-medium bg-[#152840]">
                  <div className="py-1.5 flex items-center cursor-pointer bg-[#2a4a6d]">
                    <div className="w-1 h-1 rounded-full bg-white mr-2 ml-1"></div>
                    Users
                  </div>
                  <div className="py-1.5 flex items-center cursor-pointer hover:bg-[#2a4a6d] text-gray-300">
                    <div className="w-1 h-1 rounded-full bg-gray-400 mr-2 ml-1"></div>
                    Agent Numbers
                  </div>
                  <div className="py-1.5 flex items-center cursor-pointer hover:bg-[#2a4a6d] text-gray-300">
                    <div className="w-1 h-1 rounded-full bg-gray-400 mr-2 ml-1"></div>
                    Affinity Groups
                  </div>
                  <div className="py-1.5 flex items-center cursor-pointer hover:bg-[#2a4a6d] text-gray-300">
                    <div className="w-1 h-1 rounded-full bg-gray-400 mr-2 ml-1"></div>
                    User Profiles
                  </div>
                </div>

                {/* Other sections */}
                <div className="px-2 py-1.5 flex items-center justify-between cursor-pointer hover:bg-[#2a4a6d] border-b border-[#2a4a6d]">
                  Business Settings <ChevronRight size={14} className="opacity-80" />
                </div>
                <div className="px-2 py-1.5 flex items-center justify-between cursor-pointer hover:bg-[#2a4a6d] border-b border-[#2a4a6d]">
                  Monitoring <ChevronRight size={14} className="opacity-80" />
                </div>
                <div className="px-2 py-1.5 flex items-center justify-between cursor-pointer hover:bg-[#2a4a6d] border-b border-[#2a4a6d]">
                  Utilities <ChevronRight size={14} className="opacity-80" />
                </div>
                <div className="px-2 py-1.5 flex items-center cursor-pointer hover:bg-[#2a4a6d] border-b border-[#2a4a6d]">
                  Product Management
                </div>
                <div className="px-2 py-1.5 flex items-center cursor-pointer hover:bg-[#2a4a6d] border-b border-[#2a4a6d]">
                  Rebill Main Page
                </div>
                <div className="px-2 py-1.5 flex items-center cursor-pointer hover:bg-[#2a4a6d] border-b border-[#2a4a6d]">
                  Bulk Manual Adjustment
                </div>
                <div className="px-2 py-1.5 flex items-center justify-between cursor-pointer hover:bg-[#2a4a6d] border-b border-[#2a4a6d]">
                  Policy Correction <ChevronRight size={14} className="opacity-80" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-[#005b9f] px-2 py-1.5 font-semibold flex items-center justify-between cursor-pointer border-b border-[#1d3654]">
                <div className="flex items-center">
                  <Menu size={14} className="mr-1.5" />
                  Actions
                </div>
                <ChevronRight size={14} className="opacity-80" />
              </div>
              
              <div className="flex flex-col font-medium">
                <div className="bg-[#3a5b82] px-2 py-1.5 flex items-center cursor-pointer border-b border-[#2a4a6d]">
                  <ClipboardList size={14} className="mr-2 opacity-80" />
                  My Activities
                </div>
                <div className="px-2 py-1.5 flex items-center cursor-pointer hover:bg-[#2a4a6d] border-b border-[#2a4a6d]">
                  <User size={14} className="mr-2 opacity-80" />
                  My Accounts
                </div>
                <div className="px-2 py-1.5 flex items-center cursor-pointer hover:bg-[#2a4a6d] border-b border-[#2a4a6d]">
                  <FileText size={14} className="mr-2 opacity-80" />
                  My Submissions
                </div>
                <div className="px-2 py-1.5 flex items-center cursor-pointer hover:bg-[#2a4a6d] border-b border-[#2a4a6d]">
                  <RefreshCw size={14} className="mr-2 opacity-80" />
                  My Renewals
                </div>
                <div className="px-2 py-1.5 flex items-center cursor-pointer hover:bg-[#2a4a6d] border-b border-[#2a4a6d]">
                  <Shuffle size={14} className="mr-2 opacity-80" />
                  Other Policy Transactions
                </div>
                <div className="px-2 py-1.5 flex items-center cursor-pointer hover:bg-[#2a4a6d] border-b border-[#2a4a6d]">
                  <List size={14} className="mr-2 opacity-80" />
                  My Queues
                </div>
              </div>
            </>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white flex flex-col overflow-y-auto">
          {currentPage === 'serverTools' ? (
            serverToolsPage === 'workQueue' ? (
              <>
                {/* Page Title */}
                <div className="px-4 py-2 border-b border-gray-200">
                  <h1 className="text-lg text-gray-700 font-serif">Work Queue Info</h1>
                </div>

                <div className="p-2">
                  {/* Stats Bar */}
                  <div className="flex items-center space-x-12 mb-4 text-xs text-gray-600 px-2">
                    <div className="flex items-center space-x-4">
                      <span>Maximum Pool Size</span>
                      <span className="font-semibold text-gray-800">50</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span>Pool Size</span>
                      <span className="font-semibold text-gray-800">0</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span>Active Threads Count</span>
                      <span className="font-semibold text-gray-800">0</span>
                    </div>
                  </div>

                  {/* Toolbar */}
                  <div className="flex items-center space-x-1.5 mb-2">
                    <button className="bg-[#006699] hover:bg-[#005580] text-white px-3 py-1 rounded-[2px] text-xs font-medium border border-[#004d73]">Refresh</button>
                    <button className="bg-[#006699] hover:bg-[#005580] text-white px-3 py-1 rounded-[2px] text-xs font-medium border border-[#004d73]">Download</button>
                    <button className="bg-[#006699] hover:bg-[#005580] text-white px-3 py-1 rounded-[2px] text-xs font-medium border border-[#004d73]">Download Raw Data</button>
                  </div>

                  {/* Table */}
                  <div className="border border-gray-300 rounded-[2px] overflow-x-auto">
                    <table className="w-full text-xs text-left whitespace-nowrap">
                      <thead className="bg-gradient-to-b from-white to-gray-100 border-b border-gray-300 text-gray-700">
                        <tr>
                          <th className="px-2 py-1 font-normal border-r border-gray-300 hover:bg-gray-200 cursor-pointer">
                            <div className="flex items-center justify-between">Work Queue <div className="flex flex-col opacity-50"><ChevronUp size={8} className="-mb-0.5"/><ChevronDown size={8}/></div></div>
                          </th>
                          <th className="px-2 py-1 font-normal border-r border-gray-300 hover:bg-gray-200 cursor-pointer text-right">Available</th>
                          <th className="px-2 py-1 font-normal border-r border-gray-300 hover:bg-gray-200 cursor-pointer text-right">Checked Out</th>
                          <th className="px-2 py-1 font-normal border-r border-gray-300 hover:bg-gray-200 cursor-pointer text-right">Failed</th>
                          <th className="px-2 py-1 font-normal border-r border-gray-300 hover:bg-gray-200 cursor-pointer text-right">Executors Running</th>
                          <th className="px-2 py-1 font-normal border-r border-gray-300 hover:bg-gray-200 cursor-pointer">
                            <div className="flex items-center justify-between">Cluster-Wide State <div className="flex flex-col opacity-50"><ChevronUp size={8} className="-mb-0.5"/><ChevronDown size={8}/></div></div>
                          </th>
                          <th className="px-2 py-1 font-normal border-r border-gray-300 hover:bg-gray-200 cursor-pointer">
                            <div className="flex items-center justify-between">Writer Status <div className="flex flex-col opacity-50"><ChevronUp size={8} className="-mb-0.5"/><ChevronDown size={8}/></div></div>
                          </th>
                          <th className="px-2 py-1 font-normal hover:bg-gray-200 cursor-pointer">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Rows */}
                        {workQueueData.map((row, i) => (
                          <tr key={i} className={i % 2 === 0 ? 'bg-[#e6f2f9]' : 'bg-white'}>
                            <td className="px-2 py-1 border-r border-gray-200 text-blue-700 hover:underline cursor-pointer">{row.name}</td>
                            <td className="px-2 py-1 border-r border-gray-200 text-right">{row.available}</td>
                            <td className="px-2 py-1 border-r border-gray-200 text-right">{row.checkedOut}</td>
                            <td className="px-2 py-1 border-r border-gray-200 text-right">{row.failed}</td>
                            <td className="px-2 py-1 border-r border-gray-200 text-right">{row.executors}</td>
                            <td className="px-2 py-1 border-r border-gray-200">{row.state}</td>
                            <td className="px-2 py-1 border-r border-gray-200">{row.writerStatus}</td>
                            <td className="px-2 py-1 flex space-x-1">
                              <button className={`px-2 py-0.5 rounded-[2px] text-[10px] font-medium border ${row.name === 'BizRulesValidator' ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-[#006699] hover:bg-[#005580] text-white border-[#004d73]'}`}>Run Writer</button>
                              <button className="bg-[#006699] hover:bg-[#005580] text-white px-2 py-0.5 rounded-[2px] text-[10px] font-medium border border-[#004d73]">Notify</button>
                              <button className="bg-[#006699] hover:bg-[#005580] text-white px-2 py-0.5 rounded-[2px] text-[10px] font-medium border border-[#004d73]">Stop</button>
                              <button className="bg-[#006699] hover:bg-[#005580] text-white px-2 py-0.5 rounded-[2px] text-[10px] font-medium border border-[#004d73]">Restart</button>
                              <button className="bg-[#006699] hover:bg-[#005580] text-white px-2 py-0.5 rounded-[2px] text-[10px] font-medium border border-[#004d73]">Download History</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="px-4 py-2 border-b border-gray-200">
                  <h1 className="text-lg text-gray-700 font-serif">Cluster Members</h1>
                </div>

                <div className="p-2">
                  {/* Toolbar */}
                  <div className="flex items-center space-x-1.5 mb-2">
                    <button className="bg-[#006699] hover:bg-[#005580] text-white px-3 py-1 rounded-[2px] text-xs font-medium border border-[#004d73]">Refresh</button>
                    <button className="bg-[#006699] hover:bg-[#005580] text-white px-3 py-1 rounded-[2px] text-xs font-medium border border-[#004d73]">Download</button>
                  </div>

                  {/* Table */}
                  <div className="border border-gray-300 rounded-[2px] overflow-x-auto">
                    <table className="w-full text-xs text-left whitespace-nowrap">
                      <thead className="bg-gradient-to-b from-white to-gray-100 border-b border-gray-300 text-gray-700">
                        <tr>
                          <th className="px-2 py-1 font-normal border-r border-gray-300 hover:bg-gray-200 cursor-pointer">Server ID</th>
                          <th className="px-2 py-1 font-normal border-r border-gray-300 hover:bg-gray-200 cursor-pointer">Status</th>
                          <th className="px-2 py-1 font-normal border-r border-gray-300 hover:bg-gray-200 cursor-pointer">Host</th>
                          <th className="px-2 py-1 font-normal border-r border-gray-300 hover:bg-gray-200 cursor-pointer text-right">User Sessions</th>
                          <th className="px-2 py-1 font-normal border-r border-gray-300 hover:bg-gray-200 cursor-pointer">Run Level</th>
                          <th className="px-2 py-1 font-normal border-r border-gray-300 hover:bg-gray-200 cursor-pointer">Version</th>
                          <th className="px-2 py-1 font-normal border-r border-gray-300 hover:bg-gray-200 cursor-pointer">Server Roles</th>
                          <th className="px-2 py-1 font-normal border-r border-gray-300 hover:bg-gray-200 cursor-pointer">Server Started</th>
                          <th className="px-2 py-1 font-normal border-r border-gray-300 hover:bg-gray-200 cursor-pointer">Connection Started</th>
                          <th className="px-2 py-1 font-normal border-r border-gray-300 hover:bg-gray-200 cursor-pointer">Last Update</th>
                          <th className="px-2 py-1 font-normal border-r border-gray-300 hover:bg-gray-200 cursor-pointer">Planned Shutdown</th>
                          <th className="px-2 py-1 font-normal hover:bg-gray-200 cursor-pointer">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentClusterData.map((row, i) => (
                          <tr key={i} className={i % 2 === 0 ? 'bg-[#e6f2f9]' : 'bg-white'}>
                            <td className="px-2 py-1 border-r border-gray-200 text-blue-700 hover:underline cursor-pointer">{row.serverId}</td>
                            <td className="px-2 py-1 border-r border-gray-200">{row.status}</td>
                            <td className="px-2 py-1 border-r border-gray-200">{row.host}</td>
                            <td className="px-2 py-1 border-r border-gray-200 text-right">{row.userSessions}</td>
                            <td className="px-2 py-1 border-r border-gray-200">{row.runLevel}</td>
                            <td className="px-2 py-1 border-r border-gray-200">{row.version}</td>
                            <td className="px-2 py-1 border-r border-gray-200">{row.serverRoles}</td>
                            <td className="px-2 py-1 border-r border-gray-200">{row.serverStarted}</td>
                            <td className="px-2 py-1 border-r border-gray-200">{row.connectionStarted}</td>
                            <td className="px-2 py-1 border-r border-gray-200">{row.lastUpdate}</td>
                            <td className="px-2 py-1 border-r border-gray-200">{row.plannedShutdown}</td>
                            <td className="px-2 py-1">
                              <button className="bg-[#006699] hover:bg-[#005580] text-white px-2 py-0.5 rounded-[2px] text-[10px] font-medium border border-[#004d73]">
                                Start Planned Shutdown
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Pagination */}
                  <div className="flex items-center justify-between mt-2 text-xs">
                    <div className="text-gray-600">
                      Showing {(clusterPage - 1) * rowsPerPage + 1} to {Math.min(clusterPage * rowsPerPage, clusterMembersData.length)} of {clusterMembersData.length}
                    </div>
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={() => setClusterPage(1)}
                        disabled={clusterPage === 1}
                        className="px-2 py-1 border border-gray-300 rounded-[2px] bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >&lt;&lt;</button>
                      <button 
                        onClick={() => setClusterPage(p => Math.max(1, p - 1))}
                        disabled={clusterPage === 1}
                        className="px-2 py-1 border border-gray-300 rounded-[2px] bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >&lt;</button>
                      <span className="px-2">Page {clusterPage} of {totalPages}</span>
                      <button 
                        onClick={() => setClusterPage(p => Math.min(totalPages, p + 1))}
                        disabled={clusterPage === totalPages}
                        className="px-2 py-1 border border-gray-300 rounded-[2px] bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >&gt;</button>
                      <button 
                        onClick={() => setClusterPage(totalPages)}
                        disabled={clusterPage === totalPages}
                        className="px-2 py-1 border border-gray-300 rounded-[2px] bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >&gt;&gt;</button>
                    </div>
                  </div>
                </div>
              </>
            )
          ) : currentPage === 'users' ? (
            <>
              {/* Page Title */}
              <div className="px-4 py-2 border-b border-gray-200">
                <h1 className="text-lg text-gray-700 font-serif">Users</h1>
              </div>

              <div className="p-4 pl-6">
                {/* Search Form */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center">
                    <label className="w-48 text-gray-600">Username</label>
                    <input type="text" className="border border-gray-300 rounded-[2px] px-1.5 py-0.5 w-64 focus:outline-none focus:border-blue-400 shadow-inner" />
                  </div>
                  <div className="flex items-center">
                    <label className="w-48 text-gray-600">First name</label>
                    <input type="text" className="border border-gray-300 rounded-[2px] px-1.5 py-0.5 w-64 focus:outline-none focus:border-blue-400 shadow-inner" />
                  </div>
                  <div className="flex items-center">
                    <label className="w-48 text-gray-600">Last name</label>
                    <input type="text" className="border border-gray-300 rounded-[2px] px-1.5 py-0.5 w-64 focus:outline-none focus:border-blue-400 shadow-inner" />
                  </div>
                  <div className="flex items-center">
                    <label className="w-48 text-gray-600">Group Name</label>
                    <input type="text" className="border border-gray-300 rounded-[2px] px-1.5 py-0.5 w-64 focus:outline-none focus:border-blue-400 shadow-inner" />
                  </div>
                  <div className="flex items-center">
                    <label className="w-48 text-gray-600">Search Only Unassigned Users</label>
                    <input type="checkbox" className="border-gray-300 rounded-[2px]" />
                  </div>
                  <div className="flex items-center">
                    <label className="w-48 text-gray-600">User types</label>
                    <select className="border border-gray-300 rounded-[2px] px-1 py-0.5 w-64 focus:outline-none focus:border-blue-400 text-blue-700 bg-white shadow-inner">
                      <option>&lt;none&gt;</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <label className="w-48 text-gray-600">Role</label>
                    <select className="border border-gray-300 rounded-[2px] px-1 py-0.5 w-64 focus:outline-none focus:border-blue-400 text-blue-700 bg-white shadow-inner">
                      <option>&lt;none&gt;</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <label className="w-48 text-gray-600">Available Producer Code</label>
                    <input type="text" className="border border-gray-300 rounded-[2px] px-1.5 py-0.5 w-64 focus:outline-none focus:border-blue-400 shadow-inner" />
                  </div>
                  <div className="flex items-center">
                    <label className="w-48 text-gray-600">Organization</label>
                    <div className="flex items-center w-64">
                      <input type="text" className="border border-gray-300 rounded-l-[2px] px-1.5 py-0.5 flex-1 focus:outline-none focus:border-blue-400 shadow-inner" />
                      <button className="border border-l-0 border-gray-300 bg-gray-100 px-1 py-0.5 rounded-r-[2px] hover:bg-gray-200 flex items-center justify-center">
                        <Search size={12} className="text-blue-600" />
                      </button>
                    </div>
                  </div>

                  <div className="pt-3 flex space-x-1.5">
                    <button className="bg-[#006699] hover:bg-[#005580] text-white px-3 py-1 rounded-[2px] text-xs font-medium border border-[#004d73]">
                      Search
                    </button>
                    <button className="bg-[#006699] hover:bg-[#005580] text-white px-3 py-1 rounded-[2px] text-xs font-medium border border-[#004d73]">
                      Reset
                    </button>
                  </div>
                </div>

                {/* Search Results */}
                <div className="mt-6 max-w-3xl">
                  <div className="flex items-center space-x-2 mb-1">
                    <h2 className="text-xs text-gray-600">Search Results</h2>
                    <div className="flex items-center border border-gray-300 rounded-[2px] bg-white ml-auto">
                      <div className="px-1 py-0.5 border-r border-gray-300 hover:bg-gray-100 cursor-pointer">
                        <Grid size={12} className="text-gray-600" />
                      </div>
                      <div className="px-0.5 py-0.5 hover:bg-gray-100 cursor-pointer">
                        <ChevronDown size={12} className="text-gray-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-300 rounded-[2px] overflow-hidden">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-gradient-to-b from-white to-gray-100 border-b border-gray-300 text-gray-700">
                        <tr>
                          <th className="px-2 py-1 font-normal border-r border-gray-300 w-1/4 hover:bg-gray-200 cursor-pointer">
                            <div className="flex items-center justify-between">
                              Name 
                              <div className="flex flex-col opacity-50">
                                <ChevronUp size={8} className="-mb-0.5"/>
                                <ChevronDown size={8}/>
                              </div>
                            </div>
                          </th>
                          <th className="px-2 py-1 font-normal border-r border-gray-300 w-1/4 hover:bg-gray-200 cursor-pointer">
                            <div className="flex items-center justify-between">
                              Username 
                              <div className="flex flex-col opacity-50">
                                <ChevronUp size={8} className="-mb-0.5"/>
                                <ChevronDown size={8}/>
                              </div>
                            </div>
                          </th>
                          <th className="px-2 py-1 font-normal border-r border-gray-300 w-1/4 hover:bg-gray-200 cursor-pointer">
                            <div className="flex items-center justify-between">
                              Organization 
                              <div className="flex flex-col opacity-50">
                                <ChevronUp size={8} className="-mb-0.5"/>
                                <ChevronDown size={8}/>
                              </div>
                            </div>
                          </th>
                          <th className="px-2 py-1 font-normal w-1/4 hover:bg-gray-200 cursor-pointer">
                            <div className="flex items-center justify-between">
                              Group Name
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan={4} className="px-2 py-6 text-center text-gray-500 bg-white">
                            No data to display
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Page Title */}
              <div className="px-4 py-2 border-b border-gray-200">
                <h1 className="text-lg text-gray-700 font-serif">My Activities</h1>
              </div>

              <div className="p-2">
                {/* Toolbar */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 text-xs">
                    <button className="bg-gray-100 text-gray-400 px-3 py-1 rounded-[2px] border border-gray-200 cursor-not-allowed">Assign</button>
                    <button className="bg-gray-100 text-gray-400 px-3 py-1 rounded-[2px] border border-gray-200 cursor-not-allowed">Skip</button>
                    <button className="bg-gray-100 text-gray-400 px-3 py-1 rounded-[2px] border border-gray-200 cursor-not-allowed">Complete</button>
                    <select className="border border-gray-300 rounded-[2px] px-2 py-1 focus:outline-none focus:border-blue-400 text-blue-700 bg-white shadow-inner">
                      <option>All open</option>
                    </select>
                  </div>
                  <div className="flex items-center border border-gray-300 rounded-[2px] bg-white">
                    <div className="px-1 py-0.5 border-r border-gray-300 hover:bg-gray-100 cursor-pointer">
                      <Grid size={12} className="text-gray-600" />
                    </div>
                    <div className="px-0.5 py-0.5 hover:bg-gray-100 cursor-pointer">
                      <ChevronDown size={12} className="text-gray-600" />
                    </div>
                  </div>
                </div>

                {/* Table */}
                <div className="border border-gray-300 rounded-[2px] overflow-x-auto">
                  <table className="w-full text-xs text-left whitespace-nowrap">
                    <thead className="bg-gradient-to-b from-white to-gray-100 border-b border-gray-300 text-gray-700">
                      <tr>
                        <th className="px-2 py-1 font-normal border-r border-gray-300 hover:bg-gray-200 cursor-pointer w-6 text-center">
                          <Star size={12} className="inline-block text-gray-400" />
                        </th>
                        <th className="px-2 py-1 font-normal border-r border-gray-300 hover:bg-gray-200 cursor-pointer w-6 text-center">
                          <AlertCircle size={12} className="inline-block text-gray-400" />
                        </th>
                        <th className="px-2 py-1 font-normal border-r border-gray-300 hover:bg-gray-200 cursor-pointer">
                          <div className="flex items-center justify-between">Due Date <div className="flex flex-col opacity-50"><ChevronUp size={8} className="-mb-0.5"/><ChevronDown size={8}/></div></div>
                        </th>
                        <th className="px-2 py-1 font-normal border-r border-gray-300 hover:bg-gray-200 cursor-pointer">
                          <div className="flex items-center justify-between">Category <div className="flex flex-col opacity-50"><ChevronUp size={8} className="-mb-0.5"/><ChevronDown size={8}/></div></div>
                        </th>
                        <th className="px-2 py-1 font-normal border-r border-gray-300 hover:bg-gray-200 cursor-pointer">
                          <div className="flex items-center justify-between">Priority <div className="flex flex-col opacity-50"><ChevronUp size={8} className="-mb-0.5"/><ChevronDown size={8}/></div></div>
                        </th>
                        <th className="px-2 py-1 font-normal border-r border-gray-300 hover:bg-gray-200 cursor-pointer">
                          <div className="flex items-center justify-between">Status <div className="flex flex-col opacity-50"><ChevronUp size={8} className="-mb-0.5"/><ChevronDown size={8}/></div></div>
                        </th>
                        <th className="px-2 py-1 font-normal border-r border-gray-300 hover:bg-gray-200 cursor-pointer">
                          <div className="flex items-center justify-between">Subject <div className="flex flex-col opacity-50"><ChevronUp size={8} className="-mb-0.5"/><ChevronDown size={8}/></div></div>
                        </th>
                        <th className="px-2 py-1 font-normal border-r border-gray-300 hover:bg-gray-200 cursor-pointer">ID</th>
                        <th className="px-2 py-1 font-normal border-r border-gray-300 hover:bg-gray-200 cursor-pointer">Account Holder</th>
                        <th className="px-2 py-1 font-normal border-r border-gray-300 hover:bg-gray-200 cursor-pointer">Primary Insured</th>
                        <th className="px-2 py-1 font-normal border-r border-gray-300 hover:bg-gray-200 cursor-pointer">
                          <div className="flex items-center justify-between">Product <div className="flex flex-col opacity-50"><ChevronUp size={8} className="-mb-0.5"/><ChevronDown size={8}/></div></div>
                        </th>
                        <th className="px-2 py-1 font-normal border-r border-gray-300 hover:bg-gray-200 cursor-pointer">
                          <div className="flex items-center justify-between">Policy Type <div className="flex flex-col opacity-50"><ChevronUp size={8} className="-mb-0.5"/><ChevronDown size={8}/></div></div>
                        </th>
                        <th className="px-2 py-1 font-normal border-r border-gray-300 hover:bg-gray-200 cursor-pointer">
                          <div className="flex items-center justify-between">Assigned By <div className="flex flex-col opacity-50"><ChevronUp size={8} className="-mb-0.5"/><ChevronDown size={8}/></div></div>
                        </th>
                        <th className="px-2 py-1 font-normal border-r border-gray-300 hover:bg-gray-200 cursor-pointer">State</th>
                        <th className="px-2 py-1 font-normal hover:bg-gray-200 cursor-pointer">Agent Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={15} className="px-2 py-6 text-center text-gray-500 bg-white">
                          No data to display
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
