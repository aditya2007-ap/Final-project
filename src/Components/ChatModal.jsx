import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  FaTimes, FaPaperPlane, FaComments,
  FaCheckDouble, FaCircle, FaSyncAlt, FaBriefcase
} from 'react-icons/fa';

const ChatModal = ({
  show,
  onClose,
  projectId,
  projectTitle = 'Project Discussion',
  bidId = '',
  partnerName = 'Collaborator',
  partnerRole = 'Freelancer',
  receiverId = '',
  currentUserId,
  currentUserName = 'You',
  currentUserRole = 'user'
}) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const pollIntervalRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = async (isInitial = false) => {
    if (!projectId) return;
    try {
      if (isInitial) setLoading(true);
      const url = bidId
        ? `http://localhost:9000/chat-messages?projectId=${projectId}&bidId=${bidId}`
        : `http://localhost:9000/chat-messages?projectId=${projectId}`;
      const res = await axios.get(url);
      if (res?.data?.success) {
        setMessages(res.data.result || []);
      }
    } catch (err) {
      console.error('Error fetching chat messages:', err);
    } finally {
      if (isInitial) setLoading(false);
    }
  };

  useEffect(() => {
    if (show && projectId) {
      fetchMessages(true);

      // Poll every 3 seconds for real-time conversation sync
      pollIntervalRef.current = setInterval(() => {
        fetchMessages(false);
      }, 3000);
    }

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, [show, projectId]);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed || sending) return;

    setSending(true);
    try {
      const payload = {
        projectId,
        bidId,
        senderId: currentUserId || 'user',
        senderName: currentUserName || 'User',
        senderRole: currentUserRole || 'user',
        receiverId: receiverId || '',
        message: trimmed
      };

      const res = await axios.post('http://localhost:9000/chat-send-message', payload);
      if (res?.data?.success) {
        setInputText('');
        setMessages((prev) => [...prev, res.data.result]);
        setTimeout(scrollToBottom, 100);
      }
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setSending(false);
    }
  };

  if (!show) return null;

  return (
    <div className="chat-modal-backdrop" onClick={onClose}>
      <div className="chat-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="chat-modal-header d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <div className="position-relative">
              <div className={`avatar-circle ${currentUserRole === 'client' ? 'avatar-freelancer' : 'avatar-client'}`}>
                {(partnerName || 'U')[0].toUpperCase()}
              </div>
              <span className="status-dot-active" title="Active on Zentora" />
            </div>
            <div>
              <div className="d-flex align-items-center gap-2">
                <h6 className="mb-0 fw-bold text-dark">{partnerName}</h6>
                <span className={`badge rounded-pill ${currentUserRole === 'client' ? 'bg-primary-subtle text-primary' : 'bg-success-subtle text-success'} small px-2 py-0`}>
                  {partnerRole}
                </span>
                <span className="badge rounded-pill bg-light text-muted border small px-2 py-0" style={{ fontSize: '0.68rem' }}>
                  Live Chat
                </span>
              </div>
              <small className="text-muted text-truncate d-flex align-items-center gap-1 mt-1" style={{ maxWidth: '250px' }}>
                <FaBriefcase className="text-secondary flex-shrink-0" style={{ fontSize: '0.75rem' }} />
                <span className="text-truncate">{projectTitle}</span>
              </small>
            </div>
          </div>

          <div className="d-flex align-items-center gap-1">
            <button
              type="button"
              className="btn btn-sm btn-light border-0 rounded-circle p-2"
              onClick={() => fetchMessages(false)}
              title="Refresh messages"
            >
              <FaSyncAlt className="text-secondary small" />
            </button>
            <button
              type="button"
              className="btn btn-sm btn-light border-0 rounded-circle p-2"
              onClick={onClose}
              title="Close chat"
            >
              <FaTimes className="text-secondary fs-6" />
            </button>
          </div>
        </div>

        {/* Modal Message Body */}
        <div className="chat-modal-body">
          {loading ? (
            <div className="h-100 d-flex flex-column align-items-center justify-content-center text-muted">
              <div className="spinner-border spinner-border-sm text-primary mb-2" role="status" />
              <small className="fw-semibold">Syncing messages...</small>
            </div>
          ) : messages.length === 0 ? (
            <div className="h-100 d-flex flex-column align-items-center justify-content-center text-center p-3 text-muted">
              <div className="p-3 bg-white rounded-circle shadow-sm mb-3 text-primary fs-3 border">
                <FaComments />
              </div>
              <h6 className="fw-bold text-dark mb-1">Contract Started!</h6>
              <p className="small text-secondary mb-3" style={{ maxWidth: '290px' }}>
                Connect directly with <b>{partnerName}</b> to align on deliverables, schedules, and questions.
              </p>

              {/* Starter Suggestion Chips */}
              <div className="d-flex flex-column gap-2 w-100" style={{ maxWidth: '330px' }}>
                <span className="small text-muted fw-semibold" style={{ fontSize: '0.72rem' }}>
                  ⚡ Quick starter messages:
                </span>
                {currentUserRole === 'client' ? (
                  <>
                    <button
                      type="button"
                      className="chat-starter-chip"
                      onClick={() => setInputText("👋 Hello! I'm pleased to accept your bid. Looking forward to working together.")}
                    >
                      👋 Hello! Looking forward to working together.
                    </button>
                    <button
                      type="button"
                      className="chat-starter-chip"
                      onClick={() => setInputText("📋 When are you available to get started on the first milestone?")}
                    >
                      📋 When are you available to get started?
                    </button>
                    <button
                      type="button"
                      className="chat-starter-chip"
                      onClick={() => setInputText("⚡ Let's review the technical requirements and project timeline.")}
                    >
                      ⚡ Let's review the requirements &amp; timeline.
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="chat-starter-chip"
                      onClick={() => setInputText("👋 Hi! Excited to collaborate on this project.")}
                    >
                      👋 Hi! Excited to collaborate on this project.
                    </button>
                    <button
                      type="button"
                      className="chat-starter-chip"
                      onClick={() => setInputText("📋 I've reviewed the requirements and am ready to get started.")}
                    >
                      📋 I've reviewed the scope and am ready to start.
                    </button>
                    <button
                      type="button"
                      className="chat-starter-chip"
                      onClick={() => setInputText("⚡ When would you like to receive the first milestone preview?")}
                    >
                      ⚡ When would you like the first milestone preview?
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {messages.map((msg, idx) => {
                const isMine = String(msg.senderId) === String(currentUserId);
                const timeStr = msg.createdAt
                  ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  : '';

                return (
                  <div
                    key={msg._id || idx}
                    className={`d-flex align-items-end gap-2 ${isMine ? 'justify-content-end' : 'justify-content-start'}`}
                  >
                    {!isMine && (
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm flex-shrink-0"
                        style={{
                          width: '28px',
                          height: '28px',
                          fontSize: '0.72rem',
                          background: 'linear-gradient(135deg, #6366f1, #4f46e5)'
                        }}
                      >
                        {(msg.senderName || partnerName || 'U')[0].toUpperCase()}
                      </div>
                    )}

                    <div className={`d-flex flex-column ${isMine ? 'align-items-end' : 'align-items-start'}`} style={{ maxWidth: '82%' }}>
                      {!isMine && (
                        <span className="small text-muted fw-semibold mb-1 px-1" style={{ fontSize: '0.72rem' }}>
                          {msg.senderName || partnerName}
                        </span>
                      )}
                      <div className={`chat-bubble ${isMine ? 'chat-bubble-outgoing' : 'chat-bubble-incoming'}`}>
                        <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                          {msg.message}
                        </div>
                        <div className={`chat-bubble-time ${isMine ? 'text-white-50' : 'text-muted'}`}>
                          <span>{timeStr}</span>
                          {isMine && <FaCheckDouble style={{ fontSize: '0.62rem' }} />}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Modal Footer Input */}
        <div className="chat-modal-footer">
          <form onSubmit={handleSendMessage} className="d-flex align-items-center gap-2">
            <input
              type="text"
              className="form-control chat-input-pill"
              placeholder={`Write a message to ${partnerName}... (Press Enter)`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={sending}
              autoFocus
            />
            <button
              type="submit"
              className="chat-send-btn"
              disabled={!inputText.trim() || sending}
              title="Send message"
            >
              {sending ? (
                <span className="spinner-border spinner-border-sm text-white" />
              ) : (
                <FaPaperPlane style={{ fontSize: '0.92rem', marginLeft: '1px' }} />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
