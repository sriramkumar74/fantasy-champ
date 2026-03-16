import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DraftRoom from "./pages/DraftRoom";
import TeamCreation from "./pages/TeamCreation";
import Leaderboard from "./pages/Leaderboard";
import CreateLeague from "./pages/CreateLeague";
import JoinLeague from "./pages/JoinLeague";
import WeeklyModification from "./pages/WeeklyModification";
import PlayerTrade from "./pages/PlayerTrade";
import PlayerProfile from "./pages/PlayerProfile";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/draft" element={<DraftRoom />} />
          <Route path="/teams" element={<TeamCreation />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/leagues/create" element={<CreateLeague />} />
          <Route path="/leagues/join" element={<JoinLeague />} />
          <Route path="/weekly-modification" element={<WeeklyModification />} />
          <Route path="/trades" element={<PlayerTrade />} />
          <Route path="/player/:id" element={<PlayerProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
