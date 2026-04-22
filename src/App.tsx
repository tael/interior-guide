import { useQAStore } from '@/stores/qaStore'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { ScrollToTop } from '@/components/common/ScrollToTop'
import { AddFab } from '@/components/common/AddFab'
import { Header } from '@/components/layout/Header'
import { BottomNav } from '@/components/layout/BottomNav'
import { SearchPage } from '@/components/home/SearchPage'
import { BrowsePage } from '@/components/browse/BrowsePage'
import { AddPage } from '@/components/add/AddPage'
import { FavoritesPage } from '@/components/favorites/FavoritesPage'
import { QADetail } from '@/components/qa/QADetail'

export default function App() {
  const { activeTab, selectedItem } = useQAStore()

  const renderPage = () => {
    if (selectedItem) return <QADetail />
    switch (activeTab) {
      case 'search':
        return <SearchPage />
      case 'browse':
        return <BrowsePage />
      case 'add':
        return <AddPage />
      case 'favorites':
        return <FavoritesPage />
    }
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 flex justify-center">
        <div className="w-full max-w-[430px] relative">
          <Header />
          <main className="pt-14 pb-20 min-h-screen">
            <div key={activeTab + (selectedItem?.id ?? '')} className="py-4 fade-in">{renderPage()}</div>
          </main>
          <AddFab />
          <ScrollToTop />
          <BottomNav />
        </div>
      </div>
    </ErrorBoundary>
  )
}
