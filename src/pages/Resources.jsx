
import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import ResourceCard from '../components/resources/ResourceCard';
import ResourceFilters from '../components/resources/ResourceFilters';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Pagination from '../components/common/Pagination';

const Resources = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sectionSearchTerms, setSectionSearchTerms] = useState({
    article: '',
    'case-study': '',
    announcement: '',
  });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;

  const getActiveFilter = useCallback(() => {
    const path = location.pathname;
    if (path.includes('/articles')) return 'article';
    if (path.includes('/case-studies')) return 'case-study';
    if (path.includes('/announcements')) return 'announcement';
    
    const type = searchParams.get('type');
    return type || 'all';
  }, [location.pathname, searchParams]);

  const [activeFilter, setActiveFilter] = useState(getActiveFilter());

  // Get page from URL
  useEffect(() => {
    const page = parseInt(searchParams.get('page')) || 1;
    setCurrentPage(page);
  }, [searchParams]);

  const fetchPosts = async (type = 'all', page = 1) => {
    setLoading(true);
    setError('');
    try {
      let url;
      if (type === 'all') {
        url = `${import.meta.env.VITE_API_URL}/posts?status=published&page=${page}&limit=${itemsPerPage}`;
      } else {
        url = `${import.meta.env.VITE_API_URL}/posts?type=${type}&status=published&page=${page}&limit=${itemsPerPage}`;
      }
      const response = await axios.get(url);
      setAllPosts(response.data.data || []);
      setPosts(response.data.data || []);
      setTotalPages(response.data.pagination?.pages || 1);
      setTotalItems(response.data.pagination?.total || 0);
    } catch (err) {
      setError('Failed to load resources');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Check if a post matches the search criteria
  const matchesSearch = (post, searchTerm) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase().trim();
    return post.title.toLowerCase().includes(term) ||
           post.excerpt?.toLowerCase().includes(term) ||
           post.content?.toLowerCase().includes(term) ||
           post.tags?.some(tag => tag.toLowerCase().includes(term));
  };

  // Get filtered posts with section-specific searches applied
  const getFilteredPosts = useCallback(() => {
    let filtered = [...allPosts];

    // Apply general search
    if (searchTerm.trim()) {
      filtered = filtered.filter(post => matchesSearch(post, searchTerm));
    }

    // Apply section-specific searches (only when "All" is selected)
    if (activeFilter === 'all') {
      filtered = filtered.filter(post => {
        const sectionTerm = sectionSearchTerms[post.type] || '';
        if (sectionTerm.trim()) {
          return matchesSearch(post, sectionTerm);
        }
        return true;
      });
    } else {
      // When a specific section is selected, apply its dedicated search
      const sectionTerm = sectionSearchTerms[activeFilter] || '';
      if (sectionTerm.trim()) {
        filtered = filtered.filter(post => matchesSearch(post, sectionTerm));
      }
    }

    return filtered;
  }, [allPosts, activeFilter, searchTerm, sectionSearchTerms]);

  // Get posts grouped by type with their filtered status
  const getGroupedPosts = useCallback(() => {
    const filteredPosts = getFilteredPosts();
    
    const grouped = {
      article: [],
      'case-study': [],
      'announcement': [],
    };

    const allArticles = allPosts.filter(p => p.type === 'article');
    const allCaseStudies = allPosts.filter(p => p.type === 'case-study');
    const allAnnouncements = allPosts.filter(p => p.type === 'announcement');

    grouped.article = allArticles.map(post => ({
      ...post,
      isVisible: filteredPosts.some(p => p._id === post._id)
    }));
    grouped['case-study'] = allCaseStudies.map(post => ({
      ...post,
      isVisible: filteredPosts.some(p => p._id === post._id)
    }));
    grouped.announcement = allAnnouncements.map(post => ({
      ...post,
      isVisible: filteredPosts.some(p => p._id === post._id)
    }));

    return grouped;
  }, [allPosts, getFilteredPosts]);

  useEffect(() => {
    const filter = getActiveFilter();
    setActiveFilter(filter);
    const page = parseInt(searchParams.get('page')) || 1;
    fetchPosts(filter, page);
  }, [getActiveFilter, location.pathname, searchParams]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    if (filter === 'all') {
      setSearchParams({ page: 1 });
    } else {
      setSearchParams({ type: filter, page: 1 });
    }
    setSectionSearchTerms({
      article: '',
      'case-study': '',
      announcement: '',
    });
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('page', page);
      return newParams;
    });
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSectionSearchChange = (type, value) => {
    setSectionSearchTerms(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSectionSearchTerms({
      article: '',
      'case-study': '',
      announcement: '',
    });
  };

  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'article', label: 'Articles' },
    { value: 'case-study', label: 'Case Studies' },
    { value: 'announcement', label: 'Announcements' },
  ];

  const getFilterLabel = (value) => {
    const option = filterOptions.find(opt => opt.value === value);
    return option ? option.label : 'All';
  };

  const getVisibleCount = (type) => {
    const grouped = getGroupedPosts();
    return grouped[type]?.filter(p => p.isVisible).length || 0;
  };

  const groupedPosts = getGroupedPosts();

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-4">
            RESOURCES
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
            {activeFilter === 'all' ? 'Insights & Resources' : `${getFilterLabel(activeFilter)}`}
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">
            {activeFilter === 'all' 
              ? 'Stay ahead of the curve with our latest research, case studies, and announcements.'
              : `Explore our collection of ${getFilterLabel(activeFilter).toLowerCase()}.`
            }
          </p>
        </motion.div>

        {/* Filters */}
        <ResourceFilters 
          options={filterOptions}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />

        {/* General Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search all resources by title, content, or tags..."
              className="w-full pl-12 pr-12 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-gray-900 placeholder-gray-400 shadow-sm"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            )}
          </div>
          {searchTerm && (
            <p className="text-sm text-gray-500 text-center mt-2">
              Showing results for: <span className="font-medium text-primary-500">"{searchTerm}"</span>
            </p>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500">{error}</p>
            <button 
              onClick={() => fetchPosts(activeFilter, currentPage)}
              className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : allPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-900">No resources found</h3>
            <p className="text-gray-500 mt-2">Check back later for new content.</p>
          </motion.div>
        ) : activeFilter === 'all' ? (
          // Show grouped sections when "All" is selected
          <>
            <div className="space-y-12">
              {/* Articles Section */}
              {groupedPosts.article.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">📄 Articles</h2>
                    <span className="text-sm text-gray-500">
                      {getVisibleCount('article')} of {groupedPosts.article.length} articles
                    </span>
                  </div>
                  <div className="relative mb-4 max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="text-gray-400 w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={sectionSearchTerms.article}
                      onChange={(e) => handleSectionSearchChange('article', e.target.value)}
                      placeholder="Search articles..."
                      className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupedPosts.article.map((post) => (
                      <div key={post._id} className={post.isVisible ? 'block' : 'hidden'}>
                        <ResourceCard post={post} index={0} />
                      </div>
                    ))}
                    {getVisibleCount('article') === 0 && sectionSearchTerms.article && (
                      <div className="col-span-full text-center py-8 text-gray-500">
                        No articles match your search
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Case Studies Section */}
              {groupedPosts['case-study'].length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">📊 Case Studies</h2>
                    <span className="text-sm text-gray-500">
                      {getVisibleCount('case-study')} of {groupedPosts['case-study'].length} case studies
                    </span>
                  </div>
                  <div className="relative mb-4 max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="text-gray-400 w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={sectionSearchTerms['case-study']}
                      onChange={(e) => handleSectionSearchChange('case-study', e.target.value)}
                      placeholder="Search case studies..."
                      className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupedPosts['case-study'].map((post) => (
                      <div key={post._id} className={post.isVisible ? 'block' : 'hidden'}>
                        <ResourceCard post={post} index={0} />
                      </div>
                    ))}
                    {getVisibleCount('case-study') === 0 && sectionSearchTerms['case-study'] && (
                      <div className="col-span-full text-center py-8 text-gray-500">
                        No case studies match your search
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Announcements Section */}
              {groupedPosts.announcement.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">📢 Announcements</h2>
                    <span className="text-sm text-gray-500">
                      {getVisibleCount('announcement')} of {groupedPosts.announcement.length} announcements
                    </span>
                  </div>
                  <div className="relative mb-4 max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="text-gray-400 w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={sectionSearchTerms.announcement}
                      onChange={(e) => handleSectionSearchChange('announcement', e.target.value)}
                      placeholder="Search announcements..."
                      className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupedPosts.announcement.map((post) => (
                      <div key={post._id} className={post.isVisible ? 'block' : 'hidden'}>
                        <ResourceCard post={post} index={0} />
                      </div>
                    ))}
                    {getVisibleCount('announcement') === 0 && sectionSearchTerms.announcement && (
                      <div className="col-span-full text-center py-8 text-gray-500">
                        No announcements match your search
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Pagination - Only when "All" is selected */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
              />
            </div>
          </>
        ) : (
          // Single section view when a specific filter is selected
          <div>
            <div className="relative mb-6 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400 w-4 h-4" />
              </div>
              <input
                type="text"
                value={sectionSearchTerms[activeFilter] || ''}
                onChange={(e) => handleSectionSearchChange(activeFilter, e.target.value)}
                placeholder={`Search ${getFilterLabel(activeFilter).toLowerCase()}...`}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
              />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {posts.map((post, index) => (
                  <ResourceCard key={post._id} post={post} index={index} />
                ))}
              </AnimatePresence>
            </motion.div>
            {posts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No results found</p>
              </div>
            )}

            {/* Pagination - For single section view */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;