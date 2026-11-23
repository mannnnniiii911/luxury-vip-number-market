'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { VipNumber } from '@luxury-vip/shared-types';

// Layout
import { BrandHeader } from '@/components/layout/BrandHeader';
import { BottomNav } from '@/components/layout/BottomNav';
import { SideDrawer } from '@/components/layout/SideDrawer';
import { Toast } from '@/components/layout/Toast';

// Home sections
import { HeroBanner } from '@/components/home/HeroBanner';
import { CategoryPills } from '@/components/home/CategoryPills';
import { NumerologyFinder } from '@/components/home/NumerologyFinder';
import { NumbersGrid } from '@/components/home/NumbersGrid';
import { LoadMoreButton } from '@/components/home/LoadMoreButton';
import { TrendingCollections } from '@/components/home/TrendingCollections';
import { HowItWorks } from '@/components/home/HowItWorks';
import { TrustGuarantees } from '@/components/home/TrustGuarantees';
import { SocialProof } from '@/components/home/SocialProof';
import { ConciergeCTA } from '@/components/home/ConciergeCTA';
import { SiteFooter } from '@/components/home/SiteFooter';

// Modals
import { BuyModal } from '@/components/modals/BuyModal';
import { EnquireModal } from '@/components/modals/EnquireModal';
import { FilterModal } from '@/components/modals/FilterModal';
import { InfoModal } from '@/components/modals/InfoModal';

// API
import { fetchNumbers, matchNumerology, prefetchInventory } from '@/lib/api';
import { openConciergeWhatsApp, openBuyNowWhatsApp, openEnquireWhatsApp } from '@/lib/whatsapp';
import initialCatalogData from '@/data/initial-catalog.json';

const PAGE_SIZE = 30;

type ActiveTab = 'catalog' | 'wishlist' | 'account' | 'concierge' | 'home' | 'vip';

export default function HomePage() {
  // ── State ──────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<ActiveTab>('catalog');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortFilter, setSortFilter] = useState('default');

  const [items, setItems] = useState<VipNumber[]>(initialCatalogData as VipNumber[]);
  const [totalCount, setTotalCount] = useState(1187);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const isFirstRender = useRef(true);

  // Wishlist
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());

  // Modals
  const [enquireItem, setEnquireItem] = useState<VipNumber | null>(null);
  const [buyItem, setBuyItem] = useState<VipNumber | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [infoModal, setInfoModal] = useState<{ title: string; content: string } | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Numerology
  const [birthDay, setBirthDay] = useState(1);
  const [targetSum, setTargetSum] = useState('');
  const [matchCount, setMatchCount] = useState<number | null>(null);
  const [numerologyActive, setNumerologyActive] = useState(false);

  // ── Helpers ────────────────────────────────────────────────────────
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToastMessage(null), 2800);
  }, []);

  // ── Load numbers from API / fallback ──────────────────────────────
  const loadNumbers = useCallback(
    async (pg: number, append: boolean) => {
      setLoading(true);
      try {
        const result = await fetchNumbers({
          category: selectedCategory,
          search: searchQuery,
          price: priceFilter,
          sort: sortFilter,
          page: pg,
          limit: PAGE_SIZE,
        });
        setTotalCount(result.meta.total);
        if (append) {
          setItems((prev) => [...prev, ...result.data]);
        } else {
          setItems(result.data);
        }
      } catch (err) {
        console.error('Failed to load numbers:', err);
        showToast('Error loading numbers. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    [selectedCategory, searchQuery, priceFilter, sortFilter, showToast]
  );

  // ── Initial load & filter changes ─────────────────────────────────
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prefetchInventory();
      if (selectedCategory === 'All' && !searchQuery && priceFilter === 'all' && sortFilter === 'default') {
        return;
      }
    }
    setPage(1);
    loadNumbers(1, false);
  }, [selectedCategory, searchQuery, priceFilter, sortFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Load more ────────────────────────────────────────────────────
  const handleLoadMore = useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadNumbers(nextPage, true);
  }, [page, loadNumbers]);

  // ── Wishlist persistence ──────────────────────────────────────────
  useEffect(() => {
    try {
      const stored = localStorage.getItem('vip_wishlist');
      if (stored) {
        setWishlist(new Set(JSON.parse(stored)));
      }
    } catch {}
  }, []);

  const handleToggleWishlist = useCallback(
    (id: number) => {
      setWishlist((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
          showToast('Removed from wishlist');
        } else {
          next.add(id);
          showToast('Added to wishlist ❤️');
        }
        try {
          localStorage.setItem('vip_wishlist', JSON.stringify([...next]));
        } catch {}
        return next;
      });
    },
    [showToast]
  );

  // ── Numerology ────────────────────────────────────────────────────
  const handleApplyNumerology = useCallback(async () => {
    if (!targetSum) {
      setNumerologyActive(false);
      setMatchCount(null);
      return;
    }
    try {
      const result = await matchNumerology(birthDay, targetSum);
      setMatchCount(result.matchingCount);
      setNumerologyActive(true);
      showToast(`${result.matchingCount} lucky numbers matched!`);
    } catch {
      showToast('Numerology match failed. Try again.');
    }
  }, [birthDay, targetSum, showToast]);

  // ── Reset ─────────────────────────────────────────────────────────
  const handleReset = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('All');
    setPriceFilter('all');
    setSortFilter('default');
    setNumerologyActive(false);
    setMatchCount(null);
    setTargetSum('');
    setPage(1);
  }, []);

  // ── Category select ───────────────────────────────────────────────
  const handleSelectCategory = useCallback((cat: string) => {
    setSelectedCategory(cat);
    setIsDrawerOpen(false);
    setActiveTab('catalog');
  }, []);

  // ── Tab change ────────────────────────────────────────────────────
  const handleTabChange = useCallback(
    (tab: string) => {
      if (tab === 'support' || tab === 'concierge') {
        openConciergeWhatsApp();
        return;
      }
      if (tab === 'home') {
        setActiveTab('catalog');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (tab === 'vip' || tab === 'collection') {
        setActiveTab('catalog');
        const el = document.getElementById('catalog-heading');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      if (tab === 'account' || tab === 'wishlist') {
        setActiveTab('wishlist');
        if (wishlist.size === 0) {
          showToast('Wishlist is empty. Tap the heart icon on any number to save!');
        } else {
          showToast(`Showing ${wishlist.size} saved VIP numbers ❤️`);
        }
        return;
      }
      setActiveTab(tab as ActiveTab);
    },
    [wishlist, showToast]
  );

  // ── Direct Buy Now via WhatsApp ──────────────────────────────────
  const handleBuyNow = useCallback(
    (item: VipNumber) => {
      showToast(`Opening WhatsApp for ${item.number}...`);
      openBuyNowWhatsApp(item.number, item.badge || item.title, item.price);
    },
    [showToast]
  );

  // ── Direct Enquire via WhatsApp ──────────────────────────────────
  const handleEnquire = useCallback(
    (item: VipNumber) => {
      showToast(`Opening WhatsApp enquiry for ${item.number}...`);
      openEnquireWhatsApp(item.number, item.badge || item.title, item.price);
    },
    [showToast]
  );

  // ── Buy success (from modal if needed) ───────────────────────────
  const handleBuySuccess = useCallback(
    (item: VipNumber, carrier: string) => {
      showToast(`Escrow reservation started for ${item.number} on ${carrier}!`);
    },
    [showToast]
  );

  // ── Info modal ────────────────────────────────────────────────────
  const handleShowInfo = useCallback((title: string, content: string) => {
    setInfoModal({ title, content });
  }, []);

  // ── Filter apply ──────────────────────────────────────────────────
  const handleApplyFilters = useCallback(
    (cat: string, price: string, sort: string) => {
      setSelectedCategory(cat);
      setPriceFilter(price);
      setSortFilter(sort);
      setPage(1);
    },
    []
  );

  // ── Enquire submit success ────────────────────────────────────────
  const handleEnquireSuccess = useCallback(
    (msg: string) => {
      showToast(msg);
    },
    [showToast]
  );

  // ── Determine which items to show (wishlist tab filters) ──────────
  const isWishlistTab = activeTab === 'wishlist' || activeTab === 'account';
  const displayItems = isWishlistTab
    ? items.filter((i) => wishlist.has(i.id))
    : items;

  const displayTotal = isWishlistTab ? displayItems.length : totalCount;

  // ── Render ────────────────────────────────────────────────────────
  return (
    <>
      {/* App Shell */}
      <div
        id="app-shell"
        className="relative w-full max-w-[420px] min-h-screen bg-[#F6F3EC] flex flex-col overflow-x-hidden pb-28 shadow-2xl transition-all duration-300 desktop-mode"
      >
        {/* Fixed Header */}
        <BrandHeader onReset={handleReset} onOpenMenu={() => setIsDrawerOpen(true)} />

        {/* Main Scroll Area */}
        <main className="flex-1 overflow-y-auto" id="main-content">
          {/* Hero / Search */}
          <HeroBanner
            searchQuery={searchQuery}
            onSearch={setSearchQuery}
            onOpenFilter={() => setFilterOpen(true)}
          />

          {/* Category Pills */}
          <CategoryPills
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />

          {/* Numerology Finder */}
          <NumerologyFinder
            birthDay={birthDay}
            targetSum={targetSum}
            matchCount={matchCount ?? 0}
            onChangeBirthDay={setBirthDay}
            onChangeTargetSum={setTargetSum}
            onApply={handleApplyNumerology}
          />

          {/* Numbers Grid */}
          <NumbersGrid
            items={displayItems}
            totalCount={displayTotal}
            category={selectedCategory}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onEnquire={handleEnquire}
            onBuy={handleBuyNow}
            onReset={handleReset}
            loading={loading}
          />

          {/* Load More */}
          {activeTab !== 'wishlist' && (
            <LoadMoreButton
              loaded={items.length}
              total={totalCount}
              onLoadMore={handleLoadMore}
            />
          )}

          {/* Discovery sections (catalog tab only) */}
          {activeTab === 'catalog' && (
            <>
              <TrendingCollections onSelectCategory={handleSelectCategory} />
              <HowItWorks />
              <TrustGuarantees />
              <SocialProof />
              <ConciergeCTA />
            </>
          )}

          {/* Footer */}
          <SiteFooter onShowInfo={handleShowInfo} />
        </main>

        {/* Bottom Nav */}
        <BottomNav
          activeTab={activeTab}
          wishlistCount={wishlist.size}
          onTabChange={handleTabChange}
        />
      </div>

      {/* Side Drawer */}
      <SideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onResetCatalog={handleReset}
        onSelectCategory={handleSelectCategory}
        onOpenWishlist={() => {
          setIsDrawerOpen(false);
          handleTabChange('account');
        }}
        onShowInfo={handleShowInfo}
      />

      {/* Modals */}
      {enquireItem && (
        <EnquireModal
          item={enquireItem}
          onClose={() => setEnquireItem(null)}
          onSubmitSuccess={handleEnquireSuccess}
        />
      )}

      {buyItem && (
        <BuyModal
          item={buyItem}
          onClose={() => setBuyItem(null)}
          onSuccess={handleBuySuccess}
        />
      )}

      <FilterModal
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        category={selectedCategory}
        priceFilter={priceFilter}
        sortFilter={sortFilter}
        onApply={handleApplyFilters}
      />

      {infoModal && (
        <InfoModal
          isOpen={!!infoModal}
          title={infoModal.title}
          content={infoModal.content}
          onClose={() => setInfoModal(null)}
        />
      )}

      {/* Toast */}
      <Toast message={toastMessage} />
    </>
  );
}
