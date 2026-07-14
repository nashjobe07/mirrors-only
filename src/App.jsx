import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import { Toaster as SonnerToaster } from 'sonner';
import { CartProvider } from '@/lib/cartContext';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import Delivery from '@/pages/Delivery';
import Installation from '@/pages/Installation';
import Pickup from '@/pages/Pickup';
import Commercial from '@/pages/Commercial';
import HowItWorks from '@/pages/HowItWorks';
import Gallery from '@/pages/Gallery';
import ServiceArea from '@/pages/ServiceArea';
import FAQs from '@/pages/FAQs';
import Contact from '@/pages/Contact';
import Policies from '@/pages/Policies';
// Add page imports here

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Render the main app (public storefront)
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/installation" element={<Installation />} />
        <Route path="/pickup" element={<Pickup />} />
        <Route path="/commercial" element={<Commercial />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/service-area" element={<ServiceArea />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policies/:key" element={<Policies />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <CartProvider>
            <AuthenticatedApp />
          </CartProvider>
        </Router>
        <Toaster />
        <SonnerToaster position="bottom-right" toastOptions={{ style: { borderRadius: '2px', border: '1px solid #E2E8F0' } }} />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App