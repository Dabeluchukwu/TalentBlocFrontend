// src/pages/dashboard/MessagesView.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaEnvelope, 
  FaEnvelopeOpen, 
  FaReply, 
  FaTrash,
  FaSearch,
  FaTimes,
  FaCheck,
  FaUser,
  FaCalendar,
  FaReplyAll,
  FaChevronDown,
  FaChevronUp,
  FaExclamationTriangle,
  FaArrowLeft
} from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { format } from 'date-fns';

const MessagesView = () => {
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [replyContent, setReplyContent] = useState('');
  const [showReply, setShowReply] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showReplyContent, setShowReplyContent] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showMobileDetail, setShowMobileDetail] = useState(false);
  
  // Delete Modal State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingMessage, setDeletingMessage] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchMessages();
    
    // Check if mobile view
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setShowMobileDetail(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/messages`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/messages/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(messages.map(m => 
        m._id === id ? { ...m, status } : m
      ));
      if (selectedMessage?._id === id) {
        setSelectedMessage({ ...selectedMessage, status });
      }
    } catch (error) {
      console.error('Failed to update message status:', error);
    }
  };

  const handleDeleteClick = (message) => {
    setDeletingMessage(message);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingMessage) return;
    
    setIsDeleting(true);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/messages/${deletingMessage._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(messages.filter(m => m._id !== deletingMessage._id));
      if (selectedMessage?._id === deletingMessage._id) {
        setSelectedMessage(null);
        setShowMobileDetail(false);
      }
      setShowDeleteModal(false);
      setDeletingMessage(null);
    } catch (error) {
      console.error('Failed to delete message:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeletingMessage(null);
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    
    setSubmitting(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/messages/${selectedMessage._id}/reply`,
        { reply: replyContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const updatedMessage = { 
        ...selectedMessage, 
        status: 'replied',
        reply: replyContent,
        repliedAt: new Date().toISOString()
      };
      setSelectedMessage(updatedMessage);
      setMessages(messages.map(m => 
        m._id === selectedMessage._id ? updatedMessage : m
      ));
      
      setShowReply(false);
      setReplyContent('');
      setShowReplyContent(true);
    } catch (error) {
      console.error('Failed to send reply:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleMessageSelect = (msg) => {
    setSelectedMessage(msg);
    if (msg.status === 'unread') {
      handleStatusUpdate(msg._id, 'read');
    }
    if (msg.status === 'replied' && msg.reply) {
      setShowReplyContent(true);
    }
    if (isMobileView) {
      setShowMobileDetail(true);
    }
  };

  const handleBackToList = () => {
    setShowMobileDetail(false);
  };

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = 
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || msg.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const configs = {
      'unread': { bg: 'bg-red-50', text: 'text-red-600', label: 'Unread' },
      'read': { bg: 'bg-blue-50', text: 'text-blue-600', label: 'Read' },
      'replied': { bg: 'bg-green-50', text: 'text-green-600', label: 'Replied' }
    };
    return configs[status] || configs['unread'];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-500 mt-1">
          {messages.filter(m => m.status === 'unread').length} unread messages
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className={`lg:col-span-2 space-y-4 ${isMobileView && showMobileDetail ? 'hidden' : 'block'}`}>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm bg-white"
            >
              <option value="all">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
            </select>
          </div>

          {/* Message List */}
          <div className="space-y-3">
            {filteredMessages.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
                <FaEnvelope className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No messages found</p>
              </div>
            ) : (
              filteredMessages.map((msg) => {
                const statusBadge = getStatusBadge(msg.status);
                return (
                  <motion.div
                    key={msg._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-white rounded-xl p-4 border cursor-pointer hover:shadow-md transition-all duration-300 ${
                      selectedMessage?._id === msg._id && !isMobileView
                        ? 'border-primary-500 shadow-md' 
                        : 'border-gray-200 hover:border-gray-300'
                    } ${msg.status === 'unread' ? 'border-l-4 border-l-primary-500' : ''}`}
                    onClick={() => handleMessageSelect(msg)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center flex-wrap gap-2">
                          <p className="font-semibold text-gray-900 text-sm sm:text-base">{msg.name}</p>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge.bg} ${statusBadge.text}`}>
                            {statusBadge.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 truncate">{msg.subject}</p>
                        <p className="text-sm text-gray-500 truncate mt-1">{msg.message}</p>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 text-xs text-gray-400">
                          <span className="truncate max-w-[100px] sm:max-w-none">{msg.email}</span>
                          <span>•</span>
                          <span>{format(new Date(msg.createdAt), 'MMM d, yyyy')}</span>
                          {msg.status === 'replied' && (
                            <span className="text-green-500">• Replied ✓</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className={`lg:col-span-1 ${isMobileView && !showMobileDetail ? 'hidden' : 'block'}`}>
          {selectedMessage ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200 lg:sticky lg:top-6 max-h-[80vh] overflow-y-auto"
            >
              {/* Mobile Back Button */}
              {isMobileView && (
                <button
                  onClick={handleBackToList}
                  className="flex items-center space-x-2 text-gray-600 hover:text-primary-500 transition-colors duration-200 mb-4"
                >
                  <FaArrowLeft className="w-4 h-4" />
                  <span className="font-medium">Back to messages</span>
                </button>
              )}

              <div className="flex items-start justify-between mb-4">
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg truncate">{selectedMessage.name}</h3>
                  <p className="text-sm text-gray-500 truncate">{selectedMessage.email}</p>
                </div>
                <button
                  onClick={() => handleDeleteClick(selectedMessage)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200 flex-shrink-0 ml-2"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mb-4">
                <FaCalendar className="w-3 h-3 flex-shrink-0" />
                <span>{format(new Date(selectedMessage.createdAt), 'MMM d, yyyy h:mm a')}</span>
                {selectedMessage.status === 'replied' && selectedMessage.repliedAt && (
                  <>
                    <span>•</span>
                    <span>Replied: {format(new Date(selectedMessage.repliedAt), 'MMM d, yyyy h:mm a')}</span>
                  </>
                )}
              </div>

              <div className="p-3 sm:p-4 bg-gray-50 rounded-lg mb-4">
                <p className="text-xs font-medium text-gray-700 mb-1">Subject</p>
                <p className="text-sm text-gray-900 break-words">{selectedMessage.subject}</p>
              </div>

              <div className="p-3 sm:p-4 bg-gray-50 rounded-lg mb-4">
                <p className="text-xs font-medium text-gray-700 mb-1">Message</p>
                <p className="text-sm text-gray-900 whitespace-pre-wrap break-words">{selectedMessage.message}</p>
              </div>

              {/* Reply Content - Show if replied */}
              {selectedMessage.status === 'replied' && selectedMessage.reply && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4"
                >
                  <button
                    onClick={() => setShowReplyContent(!showReplyContent)}
                    className="flex items-center justify-between w-full p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-2 min-w-0">
                      <FaReplyAll className="text-green-500 flex-shrink-0" />
                      <span className="font-medium text-gray-700 text-sm truncate">Reply Sent</span>
                    </div>
                    {showReplyContent ? (
                      <FaChevronUp className="text-gray-400 flex-shrink-0" />
                    ) : (
                      <FaChevronDown className="text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {showReplyContent && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 p-3 sm:p-4 bg-green-50/50 rounded-lg border border-green-200"
                      >
                        <p className="text-xs font-medium text-gray-700 mb-2">Your Reply:</p>
                        <p className="text-sm text-gray-800 whitespace-pre-wrap break-words">{selectedMessage.reply}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              <div className="flex flex-wrap gap-2">
                {selectedMessage.status !== 'replied' && (
                  <button
                    onClick={() => setShowReply(!showReply)}
                    className="flex items-center px-3 sm:px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-200 text-sm"
                  >
                    <FaReply className="w-4 h-4 mr-2" />
                    Reply
                  </button>
                )}
                {selectedMessage.status === 'unread' && (
                  <button
                    onClick={() => handleStatusUpdate(selectedMessage._id, 'read')}
                    className="flex items-center px-3 sm:px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 text-sm"
                  >
                    <FaCheck className="w-4 h-4 mr-2" />
                    Mark as Read
                  </button>
                )}
              </div>

              {/* Reply Form */}
              <AnimatePresence>
                {showReply && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleReply}
                    className="mt-4 pt-4 border-t border-gray-200"
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Reply
                    </label>
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      rows="4"
                      placeholder="Write your reply..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none text-sm"
                      required
                    />
                    <div className="flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-3">
                      <button
                        type="button"
                        onClick={() => setShowReply(false)}
                        className="w-full sm:w-auto px-4 py-2 text-gray-600 hover:text-gray-700 transition-colors duration-200 text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full sm:w-auto px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-200 disabled:opacity-70 text-sm"
                      >
                        {submitting ? 'Sending...' : 'Send Reply'}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center">
              <FaEnvelopeOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Select a message to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            onClick={handleCancelDelete}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                {/* Icon */}
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaExclamationTriangle className="w-8 h-8 text-red-500" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Delete Message
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 text-sm sm:text-base">
                  Are you sure you want to delete the message from{' '}
                  <span className="font-semibold text-gray-900">
                    {deletingMessage?.name}
                  </span>?
                  <br />
                  <span className="text-sm text-gray-400">
                    This action cannot be undone.
                  </span>
                </p>

                {/* Message Preview */}
                {deletingMessage && (
                  <div className="mb-6 p-3 bg-gray-50 rounded-lg text-left">
                    <p className="text-xs text-gray-500 font-medium">Subject</p>
                    <p className="text-sm text-gray-700 truncate">{deletingMessage.subject}</p>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleCancelDelete}
                    className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm"
                    disabled={isDeleting}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    disabled={isDeleting}
                    className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center text-sm"
                  >
                    {isDeleting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Deleting...
                      </>
                    ) : (
                      'Delete Message'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MessagesView;