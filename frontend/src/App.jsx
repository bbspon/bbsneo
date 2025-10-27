import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ForwardPasswordPage from "./pages/ForgetPasswordPage";
import MFA from "./pages/MFA";
import Profile from "./pages/Profile";
import DeviceManagement from "./pages/DeviceManagement";
import IntroPage from "./pages/Intro";
import OtpVerify from "./pages/OtpVerify";
import CatalogRights from "./pages/CatalogRightsPage";
import HomePage from "./pages/HomePage";
import LiveTv from "./pages/LiveTVPage";
import Header from "./pages/Header";
import UserProfilePage from "./pages/UserProfile";
import Footer from "./pages/Footer";
import MoviePlayScreen from "./pages/MoviePlayScreen";
import SearchRecommendationsPage from "./pages/SearchRecommendationsPage";
import MediaPipelinePage from "./pages/MediaPipelinePage";
import IngestUploadPage from "./pages/IngestUploadPage";
import TranscodePage from "./pages/TranscodePage";
import SubtitlesPage from "./pages/SubtitlesPage";
import DubbingPage from "./pages/DubbingPage";
import ThumbnailsTrailersPage from "./pages/ThumbnailsTrailersPage";
import PlaybackEntitlementPage from "./pages/PlaybackEntitlementPage";
import PlayerSDKPage from "./pages/PlayerSDKPage";
import HybridDeliveryPage from "./pages/HybridDeliveryPage";
import MonetizationPage from "./pages/MonetizationPage";
import CreatorStudioPage from "./pages/CreatorStudioPage";
import SocialCommunityPage from "./pages/SocialCommunityPage";
import AdminComplianceDashboard from "./pages/AdminComplianceDashboard";
import SettlementFinanceDashboard from "./pages/SettlementFinanceDashboard";
import DataAnalyticsPage from "./pages/DataAnalyticsPage";
import SecuritySafetyPage from "./pages/SecuritySafetyPage";
import ObservabilityReliabilityPage from "./pages/ObservabilityReliabilityPage";
import DownloadPage from "./pages/DownloadPage";
import PlatformExpansionPage from "./pages/PlatformExpansionPage";
import ImmersiveMediaPage from "./pages/ImmersiveMediaPage";
import VROriginalsPage from "./pages/VROriginals";
import ARShoppingPage from "./pages/ARShoppingPage";
import XREventsPage from "./pages/XREventsPage";
import HybridCompanionModePage from "./pages/HybridCompanionModePage";
import CreatorMonetizationPage from "./pages/CreatorMonetizationPage";
import CommerceEconomyPage from "./pages/CommerceEconomyPage";
import CommunityEngagementPage from "./pages/CommunityEngagementPage";
import OriginalsRegionalPage from "./pages/OriginalsRegionalPage";
import TechnicalEnhancements from "./pages/TechnicalEnhancements";
import AdditionalLayersPage from "./pages/AdditionalLayersPage";
import PlatformsBeyondScreens from "./pages/PlatformsBeyondScreens";
import ImmersiveStorytelling from "./pages/ImmersiveStorytelling";
import CreatorEconomyPage from "./pages/CreatorEconomyPage";
import CommerceEvolution from "./pages/CommerceEvolution";
import CommunitySocietyPage from "./pages/CommunitySocietyPage";
import OriginalsGlobalContent from "./pages/OriginalsGlobalContent";
import MoviesPage from "./pages/Movies";
import CategoriesPageBootstrap from "./pages/Categories";
import AboutUsModal from "./pages/AboutUsModal";
import CareersPage from "./pages/CareersPage";
import HelpCenterPage from "./pages/HelpCenterPage";
import FeedbackPage from "./pages/FeedbackPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfUsePage from "./pages/TermsOfUsePage";
import FAQPage from "./pages/FAQPage";
import HelpSettingsPage from "./pages/HelpSettingsPage";
import MessengerPage from "./pages/MessengerPage";
import ReelShortPage from "./pages/ReelShortPage";
import UnifiedIdentityPage from "./pages/UnifiedIdentityPage";
import OTTEntertainmentPage from "./pages/OTTEntertainmentPage";
import AIPersonalizationPage from "./pages/AIPersonalizationPage";
import FuturisticDifferentiatorsPage from "./pages/FuturisticDifferentiatorsPage";
import GovernanceSecurityTrustPage from "./pages/GovernanceSecurityTrustPage";
import HybridOfflineInfraPage from "./pages/HybridOfflineInfraPage";
import RevenueStreamsPage from "./pages/RevenueStreams";
import RevenueCMSModule from "./pages/RevenueCMSModule";
import RevenueModelsPage from "./pages/RevenueModelsPage";
import DashboardsCMSPage from "./pages/DashboardsCMSPage";
import { Wallet } from "react-bootstrap-icons";
import WalletTokenSystemPage from "./pages/WalletTokenSystemPage";
import YStudioPage from "./pages/YStudioPage";
import YStudioNotificationPage from "./pages/YStudioNotification";
import YStudioHomePage from "./pages/YStudioHome";
import MetaAIPage from "./pages/MetaAIPage";
import { Group } from "lucide-react";
import GroupsPage from "./pages/GroupsPage";
import MarketplacePage from "./pages/MarketplacePage";
import EventPage from "./pages/EventPage";
import AdManagerPage from "./pages/AdManagerPage";
import TrendingPage from "./pages/TrendingPage";
import Messenger from "./pages/Messenger";
import BusinessSuite from "./pages/BusinessSuite";
import CreatePost from "./pages/CreatePost";
import PromotePage from "./pages/CreateAd";
import CreateAd from "./pages/CreateAd";
import CreateReelPage from "./pages/CreateReelPage";
import CreateStory from "./pages/CreateStory";
import NotificationsPage from "./pages/NotificationsPage";
import AdsManagerPage from "./pages/AdsManagerPage";
import Content from "./pages/Content";
import PlannerPage from "./pages/PlannerPage";
import InsightsPage from "./pages/InsightsPage";
import BusinessSettings from "./pages/BusinessSettings";
import SubscriptionPage from "./pages/SubscriptionPage"
// Layout wrapper to handle header/footer
function AppLayout() {
  const location = useLocation();
  const noHeaderFooter = [
    "/",
    "/login",
    "/signup",
    "/otp-verify",
    "/forward-password",
    "/mfa",
    "/profile",
    "/search-recommendations",
    
  ];

  
  const showHeaderFooter = !noHeaderFooter.includes(location.pathname);

  return (
    <>
      {showHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/otp-verify" element={<OtpVerify />} />
        <Route path="/forward-password" element={<ForwardPasswordPage />} />
        <Route path="/mfa" element={<MFA />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about-us" element={<AboutUsModal />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/reel-short" element={<ReelShortPage />} />
        <Route path="/live" element={<LiveTv />} />
        <Route path="/user-profile" element={<UserProfilePage />} />
        <Route path="/categories" element={<CategoriesPageBootstrap />} />
        <Route path="/movie" element={<MoviePlayScreen />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/downloads" element={<DownloadPage />} />
        <Route path="/devices" element={<DeviceManagement />} />
        <Route path="/catalog" element={<CatalogRights />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/help-center" element={<HelpCenterPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-use" element={<TermsOfUsePage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/help-settings" element={<HelpSettingsPage />} />
        <Route path="/subscription" element={<SubscriptionPage />} />

        <Route
          path="/search-recommendations"
          element={<SearchRecommendationsPage />}
        />
        <Route path="/media-pipeline" element={<MediaPipelinePage />} />
        <Route path="/ingest" element={<IngestUploadPage />} />
        <Route path="/transcode" element={<TranscodePage />} />
        <Route path="/subtitles" element={<SubtitlesPage />} />
        <Route path="/dubbing" element={<DubbingPage />} />
        <Route path="/thumbnails" element={<ThumbnailsTrailersPage />} />
        <Route path="/playback" element={<PlaybackEntitlementPage />} />

        <Route path="/player-sdk" element={<PlayerSDKPage />} />
        <Route path="/hybrid-delivery" element={<HybridDeliveryPage />} />
        <Route path="/monetization" element={<MonetizationPage />} />
        <Route path="/creator" element={<CreatorStudioPage />} />

        <Route
          path="/admin-compliance"
          element={<AdminComplianceDashboard />}
        />
        <Route
          path="/selltement-finance"
          element={<SettlementFinanceDashboard />}
        />
        <Route path="/data-analytics" element={<DataAnalyticsPage />} />
        <Route path="/security-safety" element={<SecuritySafetyPage />} />

        {/* 230925 */}
        <Route
          path="/Observability"
          element={<ObservabilityReliabilityPage />}
        />
        <Route path="/platform-expansion" element={<PlatformExpansionPage />} />
        <Route path="/immersive" element={<ImmersiveMediaPage />} />
        <Route path="/vr" element={<VROriginalsPage />} />
        <Route path="/ar" element={<ARShoppingPage />} />
        <Route path="/xr" element={<XREventsPage />} />
        <Route path="/hybrid" element={<HybridCompanionModePage />} />
        <Route
          path="/creator-monetization"
          element={<CreatorMonetizationPage />}
        />
        <Route path="/commerce" element={<CommerceEconomyPage />} />
        <Route path="/community" element={<CommunityEngagementPage />} />
        <Route path="/originals" element={<OriginalsRegionalPage />} />
        <Route path="/tech" element={<TechnicalEnhancements />} />
        <Route path="/additional" element={<AdditionalLayersPage />} />

        {/* 230925 phase3*/}
        <Route path="/platform" element={<PlatformsBeyondScreens />} />
        <Route path="/immersive-story" element={<ImmersiveStorytelling />} />
        <Route path="/creator-economy" element={<CreatorEconomyPage />} />
        <Route path="/commerce-evolution" element={<CommerceEvolution />} />
        <Route path="/community-society" element={<CommunitySocietyPage />} />
        <Route path="/originals-global" element={<OriginalsGlobalContent />} />
        {/*phase4*/}
        <Route path="/unified-identity" element={<UnifiedIdentityPage />} />
        <Route path="/ott-entertainment" element={<OTTEntertainmentPage />} />
        <Route path="/social-community" element={<SocialCommunityPage />} />
        <Route path="/ai-personalization" element={<AIPersonalizationPage />} />
        <Route path="/futuristic" element={<FuturisticDifferentiatorsPage />} />
        <Route
          path="/governance-security"
          element={<GovernanceSecurityTrustPage />}
        />
        <Route path="/hybrid-offline" element={<HybridOfflineInfraPage />} />
        <Route path="/revenue-stream" element={<RevenueStreamsPage />} />
        <Route path="/revenue-cms" element={<RevenueCMSModule />} />
        <Route path="/revenue-model" element={<RevenueModelsPage />} />
        <Route path="/dashboards-cms" element={<DashboardsCMSPage />} />
        <Route path="/wallet-token" element={<WalletTokenSystemPage />} />
        <Route path="/ystudio-upload" element={<YStudioPage />} />
        <Route
          path="/ystudio-notification"
          element={<YStudioNotificationPage />}
        />
        <Route path="/ystudio" element={<YStudioHomePage />} />
        <Route path="/meta-ai" element={<MetaAIPage />} />
        <Route path="/groups" element={<GroupsPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/ad-manager" element={<AdManagerPage />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/messenger" element={<Messenger />} />
        <Route path="/business-suite" element={<BusinessSuite />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/create-ad" element={<CreateAd />} />
        <Route path="/create-reel" element={<CreateReelPage />} />
        <Route path="/create-story" element={<CreateStory />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/ads-manager" element={<AdsManagerPage />} />
        <Route path="/content" element={<Content />} />
        <Route path="/planner" element={<PlannerPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/settings" element={<BusinessSettings />} />
      </Routes>
      <MessengerPage />
      {showHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
