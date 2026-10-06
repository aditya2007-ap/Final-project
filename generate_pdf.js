import fs from 'fs';
import path from 'path';
import { execSync, execFileSync } from 'child_process';

const artifactDir = 'C:\\Users\\dell\\.gemini\\antigravity-ide\\brain\\e2da56c3-bc5d-4830-806d-4be201473a31';
const outputHtml = path.resolve('synopsis.html');
const outputPdf = path.resolve('ZENTORA_PROJECT_SYNOPSIS.pdf');
const artifactPdf = path.join(artifactDir, 'ZENTORA_PROJECT_SYNOPSIS.pdf');

// Helper to read and convert image to base64
function getBase64Image(filename) {
  const filePath = path.join(artifactDir, filename);
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    return `data:image/png;base64,${data.toString('base64')}`;
  }
  return '';
}

const imgHero = getBase64Image('zentora_home_1791015251861.png');
const imgCategories = getBase64Image('zentora_home_middle_1791015267021.png');
const imgProjects = getBase64Image('zentora_home_freelancers_1791015283576.png');
const imgStats = getBase64Image('zentora_home_footer_1791015306418.png');
const imgServices = getBase64Image('zentora_services_page_1791015482999.png');
const imgPricing = getBase64Image('zentora_pricing_plans_1791015616300.png');
const imgLogin = getBase64Image('zentora_login_page_1791015720407.png');
const imgRegister = getBase64Image('zentora_register_page_1791015804728.png');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Zentora Freelance Marketplace - Comprehensive Project Synopsis</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

    :root {
      --primary: #ee4a03;
      --primary-dark: #c83c00;
      --primary-light: #fff2ed;
      --secondary: #181818;
      --text: #2d3748;
      --text-muted: #718096;
      --border: #e2e8f0;
      --bg-light: #f8fafc;
      --success: #10b981;
      --info: #0ea5e9;
      --purple: #8b5cf6;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: var(--text);
      line-height: 1.6;
      background: #ffffff;
      font-size: 13.5px;
    }

    @page {
      size: A4;
      margin: 18mm 16mm 18mm 16mm;
      @bottom-right {
        content: counter(page);
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 9pt;
        color: #a0aec0;
      }
    }

    .page-break {
      page-break-after: always;
      break-after: page;
    }

    .avoid-break {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    /* COVER PAGE */
    .cover-page {
      min-height: 940px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 30px 10px;
      border-top: 8px solid var(--primary);
      position: relative;
    }

    .brand-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 40px;
    }

    .brand-logo-icon {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #181818 0%, #ee4a03 100%);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 800;
      font-size: 24px;
      box-shadow: 0 4px 14px rgba(238, 74, 3, 0.3);
    }

    .brand-name {
      font-size: 32px;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: var(--secondary);
    }

    .brand-name span {
      color: var(--primary);
    }

    .doc-badge {
      display: inline-block;
      background: var(--primary-light);
      color: var(--primary-dark);
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 18px;
      border: 1px solid rgba(238, 74, 3, 0.2);
    }

    .cover-title {
      font-size: 36px;
      font-weight: 800;
      line-height: 1.2;
      color: var(--secondary);
      margin-bottom: 14px;
      letter-spacing: -1px;
    }

    .cover-subtitle {
      font-size: 16px;
      color: var(--text-muted);
      line-height: 1.5;
      margin-bottom: 30px;
      max-width: 680px;
    }

    .tech-pill-container {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 40px;
    }

    .tech-pill {
      background: var(--bg-light);
      border: 1px solid var(--border);
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      color: #4a5568;
    }

    .meta-card {
      background: var(--bg-light);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 24px;
      margin-bottom: 30px;
    }

    .meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .meta-item {
      display: flex;
      flex-direction: column;
    }

    .meta-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      color: var(--text-muted);
      font-weight: 700;
      margin-bottom: 3px;
    }

    .meta-value {
      font-size: 13.5px;
      font-weight: 600;
      color: var(--secondary);
    }

    .cover-footer {
      border-top: 1px solid var(--border);
      padding-top: 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11.5px;
      color: var(--text-muted);
    }

    /* SECTION HEADERS */
    h2 {
      font-size: 20px;
      font-weight: 800;
      color: var(--secondary);
      margin-top: 24px;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 2px solid var(--border);
      display: flex;
      align-items: center;
      gap: 10px;
      letter-spacing: -0.3px;
    }

    h2::before {
      content: '';
      display: inline-block;
      width: 6px;
      height: 20px;
      background: var(--primary);
      border-radius: 4px;
    }

    h3 {
      font-size: 15px;
      font-weight: 700;
      color: #2d3748;
      margin-top: 18px;
      margin-bottom: 8px;
    }

    p {
      margin-bottom: 10px;
      color: #4a5568;
    }

    /* TABLES */
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
      margin-bottom: 18px;
      font-size: 12px;
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 8px;
      overflow: hidden;
    }

    th {
      background: #f1f5f9;
      color: var(--secondary);
      font-weight: 700;
      text-align: left;
      padding: 9px 12px;
      border-bottom: 2px solid var(--border);
      font-size: 11.5px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    td {
      padding: 8px 12px;
      border-bottom: 1px solid var(--border);
      color: #334155;
      vertical-align: top;
    }

    tr:nth-child(even) td {
      background: #fafafa;
    }

    tr:last-child td {
      border-bottom: none;
    }

    .badge {
      display: inline-block;
      padding: 2px 7px;
      border-radius: 4px;
      font-size: 10.5px;
      font-weight: 700;
      font-family: 'JetBrains Mono', monospace;
    }

    .badge-get { background: #e0f2fe; color: #0369a1; }
    .badge-post { background: #dcfce7; color: #15803d; }
    .badge-put { background: #fef3c7; color: #b45309; }
    .badge-delete { background: #fee2e2; color: #b91c1c; }

    .type-string { color: #0284c7; font-weight: 600; font-family: 'JetBrains Mono', monospace; }
    .type-number { color: #d97706; font-weight: 600; font-family: 'JetBrains Mono', monospace; }
    .type-boolean { color: #16a34a; font-weight: 600; font-family: 'JetBrains Mono', monospace; }
    .type-date { color: #9333ea; font-weight: 600; font-family: 'JetBrains Mono', monospace; }
    .type-id { color: #dc2626; font-weight: 600; font-family: 'JetBrains Mono', monospace; }

    /* CODE BOX */
    code, pre {
      font-family: 'JetBrains Mono', monospace;
    }

    .code-block {
      background: #0f172a;
      color: #e2e8f0;
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 11px;
      overflow-x: auto;
      margin-bottom: 14px;
      line-height: 1.5;
      border: 1px solid #1e293b;
    }

    /* DIAGRAM BOXES */
    .diagram-container {
      background: #f8fafc;
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 16px;
      margin: 14px 0 20px 0;
      text-align: center;
    }

    .diagram-svg {
      width: 100%;
      max-height: 380px;
    }

    /* SCREENSHOT SECTION */
    .screenshot-card {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 18px;
      box-shadow: 0 3px 10px rgba(0,0,0,0.04);
    }

    .screenshot-header {
      padding: 10px 14px;
      background: #f8fafc;
      border-bottom: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .screenshot-title {
      font-weight: 700;
      font-size: 12.5px;
      color: var(--secondary);
    }

    .screenshot-route {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      color: var(--primary);
      background: var(--primary-light);
      padding: 2px 8px;
      border-radius: 4px;
      font-weight: 600;
    }

    .screenshot-img {
      width: 100%;
      height: auto;
      display: block;
      border-bottom: 1px solid var(--border);
    }

    .screenshot-desc {
      padding: 10px 14px;
      font-size: 12px;
      color: #64748b;
      line-height: 1.5;
    }

    /* GRID FOR COMPACT IMAGES */
    .screenshot-grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }

    /* CALLOUT BOXES */
    .callout {
      border-left: 4px solid var(--primary);
      background: #fff8f5;
      padding: 12px 16px;
      border-radius: 0 8px 8px 0;
      margin-bottom: 16px;
      font-size: 12.5px;
    }

    .callout-title {
      font-weight: 700;
      color: var(--primary-dark);
      margin-bottom: 4px;
      font-size: 13px;
    }
  </style>
</head>
<body>

  <!-- COVER PAGE -->
  <div class="cover-page page-break">
    <div>
      <div class="brand-header">
        <div class="brand-logo-icon">Z</div>
        <div class="brand-name">Zentora<span>.</span></div>
      </div>

      <div class="doc-badge">Official Project Synopsis &amp; Architecture Specification</div>
      <h1 class="cover-title">Full-Stack Multi-Tenant Freelance Marketplace &amp; Talent Platform</h1>
      <p class="cover-subtitle">
        A production-grade web application built to connect enterprise clients and independent professionals through role-segregated portals, a credit-metered bidding economy, real-time status management, and automated HTML email notifications.
      </p>

      <div class="tech-pill-container">
        <div class="tech-pill">React 19</div>
        <div class="tech-pill">Vite</div>
        <div class="tech-pill">Node.js (ESM)</div>
        <div class="tech-pill">Express.js 5</div>
        <div class="tech-pill">MongoDB NoSQL</div>
        <div class="tech-pill">Mongoose 9</div>
        <div class="tech-pill">Nodemailer HTML Engine</div>
        <div class="tech-pill">Bootstrap 5</div>
        <div class="tech-pill">Bcryptjs Security</div>
      </div>

      <div class="meta-card">
        <div class="meta-grid">
          <div class="meta-item">
            <span class="meta-label">Project Title</span>
            <span class="meta-value">Zentora Freelance Marketplace</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Domain</span>
            <span class="meta-value">Gig Economy &amp; Talent Acquisition</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Architecture</span>
            <span class="meta-value">Client-Server RESTful Micro-SPA</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Target Roles</span>
            <span class="meta-value">Client (Employer), Freelancer, Platform Admin</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Database Instance</span>
            <span class="meta-value">mongodb://localhost:27017/zentora</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Backend Port</span>
            <span class="meta-value">RESTful API on Port 9000</span>
          </div>
        </div>
      </div>
    </div>

    <div class="cover-footer">
      <span>Zentora Software Engineering Major Project Report</span>
      <span>Confidential &amp; Proprietary &bull; Academic &amp; Industry Evaluation</span>
    </div>
  </div>

  <!-- SECTION 1: ABSTRACT & OBJECTIVES -->
  <h2>1. Executive Summary &amp; Problem Statement</h2>
  
  <p>
    <strong>Zentora</strong> is a full-stack digital marketplace created to solve critical operational bottlenecks in modern talent acquisition. Traditional gig platforms suffer from high middleman commissions, proposal spamming, delayed communications, and a lack of transparency between contract negotiation and execution.
  </p>

  <div class="callout">
    <div class="callout-title">Core Value Innovation</div>
    Zentora introduces a <strong>Credit-Metered Proposal Economy</strong> where freelancers must possess bidding credits to submit proposals, thereby deterring automated bot spam and encouraging high-intent, tailored bids. On proposal acceptance by a client, the backend automatically triggers a rich HTML email dispatch containing verified employer coordinates directly to the freelancer's Gmail inbox.
  </div>

  <h3>Key Functional Objectives</h3>
  <table>
    <thead>
      <tr>
        <th style="width: 25%;">Pillar</th>
        <th>System Implementation</th>
        <th style="width: 25%;">Target User Role</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Role Segregation</strong></td>
        <td>Strict route protection with role verification preventing cross-portal privilege escalation.</td>
        <td>All Roles (Admin / Client / User)</td>
      </tr>
      <tr>
        <td><strong>Project Lifecycle</strong></td>
        <td>End-to-end status pipeline from open marketplace bidding to contract assignment and closure.</td>
        <td>Client &amp; Freelancer</td>
      </tr>
      <tr>
        <td><strong>Credit Economy</strong></td>
        <td>Freelancers procure Master Plans; every submitted proposal deducts 1 credit from their live balance.</td>
        <td>Freelancer</td>
      </tr>
      <tr>
        <td><strong>Direct Messaging</strong></td>
        <td>Dedicated project-scoped chat trail allowing client and hired freelancer to exchange requirements.</td>
        <td>Client &amp; Freelancer</td>
      </tr>
      <tr>
        <td><strong>Platform Governance</strong></td>
        <td>Instant user status toggle (active/blocked), soft/hard project moderation, and plan publishing.</td>
        <td>Administrator</td>
      </tr>
    </tbody>
  </table>

  <!-- SECTION 2: SYSTEM ARCHITECTURE -->
  <div class="page-break"></div>
  <h2>2. System Architecture &amp; Data Flow</h2>
  <p>
    The system follows a decoupled Client-Server architecture. The frontend Single-Page Application (SPA) communicates asynchronously with Express 5 RESTful endpoints, while MongoDB persists documents via Mongoose schemas.
  </p>

  <div class="diagram-container avoid-break">
    <svg class="diagram-svg" viewBox="0 0 780 340" xmlns="http://www.w3.org/2000/svg">
      <!-- Background groups -->
      <rect x="10" y="10" width="220" height="320" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
      <text x="120" y="35" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="13" fill="#1e293b">1. PRESENTATION (UI)</text>
      
      <rect x="260" y="10" width="260" height="320" rx="10" fill="#fff7ed" stroke="#fed7aa" stroke-width="1.5" />
      <text x="390" y="35" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="13" fill="#c2410c">2. EXPRESS API LAYER</text>

      <rect x="540" y="10" width="230" height="320" rx="10" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1.5" />
      <text x="655" y="35" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="13" fill="#15803d">3. PERSISTENCE &amp; SERVICES</text>

      <!-- UI Boxes -->
      <rect x="25" y="55" width="190" height="45" rx="6" fill="#ffffff" stroke="#94a3b8" />
      <text x="120" y="82" text-anchor="middle" font-size="11" font-weight="600" fill="#334155">Public Marketplace &amp; Home</text>

      <rect x="25" y="115" width="190" height="45" rx="6" fill="#ffffff" stroke="#94a3b8" />
      <text x="120" y="142" text-anchor="middle" font-size="11" font-weight="600" fill="#334155">Client Employer Portal</text>

      <rect x="25" y="175" width="190" height="45" rx="6" fill="#ffffff" stroke="#94a3b8" />
      <text x="120" y="202" text-anchor="middle" font-size="11" font-weight="600" fill="#334155">Freelancer Talent Portal</text>

      <rect x="25" y="235" width="190" height="45" rx="6" fill="#ffffff" stroke="#94a3b8" />
      <text x="120" y="262" text-anchor="middle" font-size="11" font-weight="600" fill="#334155">Admin Governance Console</text>

      <!-- API Boxes -->
      <rect x="280" y="55" width="220" height="40" rx="6" fill="#ffffff" stroke="#fb923c" />
      <text x="390" y="80" text-anchor="middle" font-size="11" font-weight="600" fill="#7c2d12">AuthController (Bcrypt Hash)</text>

      <rect x="280" y="110" width="220" height="40" rx="6" fill="#ffffff" stroke="#fb923c" />
      <text x="390" y="135" text-anchor="middle" font-size="11" font-weight="600" fill="#7c2d12">ClientController (Job &amp; Bid Ops)</text>

      <rect x="280" y="165" width="220" height="40" rx="6" fill="#ffffff" stroke="#fb923c" />
      <text x="390" y="190" text-anchor="middle" font-size="11" font-weight="600" fill="#7c2d12">UserController (Bids &amp; Credits)</text>

      <rect x="280" y="220" width="220" height="40" rx="6" fill="#ffffff" stroke="#fb923c" />
      <text x="390" y="245" text-anchor="middle" font-size="11" font-weight="600" fill="#7c2d12">AdminController (Governance)</text>

      <rect x="280" y="275" width="220" height="40" rx="6" fill="#ffffff" stroke="#fb923c" />
      <text x="390" y="300" text-anchor="middle" font-size="11" font-weight="600" fill="#7c2d12">Chat &amp; Testimonial Controllers</text>

      <!-- DB Boxes -->
      <rect x="555" y="55" width="200" height="60" rx="6" fill="#ffffff" stroke="#4ade80" />
      <text x="655" y="80" text-anchor="middle" font-size="11" font-weight="700" fill="#166534">MongoDB Database</text>
      <text x="655" y="100" text-anchor="middle" font-size="10" fill="#4b5563">users &bull; projects &bull; bids</text>

      <rect x="555" y="135" width="200" height="60" rx="6" fill="#ffffff" stroke="#4ade80" />
      <text x="655" y="160" text-anchor="middle" font-size="11" font-weight="700" fill="#166534">Plans &amp; Subscriptions</text>
      <text x="655" y="180" text-anchor="middle" font-size="10" fill="#4b5563">plans &bull; subscriptions &bull; chats</text>

      <rect x="555" y="215" width="200" height="60" rx="6" fill="#ffffff" stroke="#38bdf8" />
      <text x="655" y="240" text-anchor="middle" font-size="11" font-weight="700" fill="#0369a1">Nodemailer SMTP Engine</text>
      <text x="655" y="260" text-anchor="middle" font-size="10" fill="#4b5563">Automatic HTML Email Alerts</text>

      <!-- Connecting Lines -->
      <line x1="215" y1="135" x2="280" y2="135" stroke="#f97316" stroke-width="2" marker-end="url(#arrow)" />
      <line x1="215" y1="195" x2="280" y2="185" stroke="#f97316" stroke-width="2" />
      <line x1="215" y1="255" x2="280" y2="240" stroke="#f97316" stroke-width="2" />
      <line x1="500" y1="130" x2="555" y2="85" stroke="#22c55e" stroke-width="2" />
      <line x1="500" y1="140" x2="555" y2="240" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="4" />
      <line x1="500" y1="185" x2="555" y2="165" stroke="#22c55e" stroke-width="2" />
    </svg>
  </div>

  <!-- SECTION 3: DATABASE SCHEMA & DATA DICTIONARY -->
  <div class="page-break"></div>
  <h2>3. Complete Database Schema &amp; Data Dictionary</h2>
  <p>The persistent layer runs on MongoDB via Mongoose 9 ODM schemas in <code>API/Module/module.js</code>.</p>

  <h3>3.1 Users Collection (<code>users</code>)</h3>
  <table>
    <thead>
      <tr>
        <th>Field Name</th>
        <th>Data Type</th>
        <th>Constraints / Defaults</th>
        <th>Functional Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>_id</code></td>
        <td><span class="type-id">ObjectId</span></td>
        <td>Primary Key</td>
        <td>Unique user document identifier</td>
      </tr>
      <tr>
        <td><code>name</code></td>
        <td><span class="type-string">String</span></td>
        <td>Required</td>
        <td>Full personal name or company name</td>
      </tr>
      <tr>
        <td><code>email</code></td>
        <td><span class="type-string">String</span></td>
        <td>Required, Unique, Indexed</td>
        <td>Primary login and notification coordinate</td>
      </tr>
      <tr>
        <td><code>password</code></td>
        <td><span class="type-string">String</span></td>
        <td>Required</td>
        <td>Bcrypt salted hash with cost factor 10</td>
      </tr>
      <tr>
        <td><code>type</code></td>
        <td><span class="type-string">String</span></td>
        <td><code>'client' | 'user' | 'admin'</code></td>
        <td>Role discriminator determining portal access</td>
      </tr>
      <tr>
        <td><code>credit</code></td>
        <td><span class="type-number">Number</span></td>
        <td>Default: 0</td>
        <td>Available bidding balance for freelancers</td>
      </tr>
      <tr>
        <td><code>status</code></td>
        <td><span class="type-string">String / Bool</span></td>
        <td>Default: <code>'active'</code></td>
        <td>Account governance (<code>'active'</code> or <code>'blocked'</code>)</td>
      </tr>
      <tr>
        <td><code>headline, bio, rate, skill</code></td>
        <td><span class="type-string">String</span></td>
        <td>Optional, Defaults: <code>""</code></td>
        <td>Freelancer professional profile and rate card</td>
      </tr>
      <tr>
        <td><code>company, department</code></td>
        <td><span class="type-string">String</span></td>
        <td>Optional, Defaults: <code>""</code></td>
        <td>Employer business organization metadata</td>
      </tr>
      <tr>
        <td><code>createdAt</code></td>
        <td><span class="type-date">Date</span></td>
        <td>Default: <code>Date.now</code></td>
        <td>Account registration timestamp</td>
      </tr>
    </tbody>
  </table>

  <h3>3.2 Projects Collection (<code>projects</code>)</h3>
  <table>
    <thead>
      <tr>
        <th>Field Name</th>
        <th>Data Type</th>
        <th>Constraints / Defaults</th>
        <th>Functional Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>_id</code></td>
        <td><span class="type-id">ObjectId</span></td>
        <td>Primary Key</td>
        <td>Unique project vacancy identifier</td>
      </tr>
      <tr>
        <td><code>clientId</code></td>
        <td><span class="type-id">String (FK)</span></td>
        <td>References <code>users._id</code></td>
        <td>Foreign reference to the client posting the job</td>
      </tr>
      <tr>
        <td><code>title</code></td>
        <td><span class="type-string">String</span></td>
        <td>Required</td>
        <td>Project heading / contract title</td>
      </tr>
      <tr>
        <td><code>desc / description</code></td>
        <td><span class="type-string">String</span></td>
        <td>Required</td>
        <td>Scope of work, deliverables, and technical requirements</td>
      </tr>
      <tr>
        <td><code>budget</code></td>
        <td><span class="type-string">String</span></td>
        <td>Required</td>
        <td>Project budget range or fixed cost (e.g. ₹85,000)</td>
      </tr>
      <tr>
        <td><code>duration / time</code></td>
        <td><span class="type-string">String</span></td>
        <td>Optional</td>
        <td>Estimated delivery timeframe (e.g. 1 Month)</td>
      </tr>
      <tr>
        <td><code>status</code></td>
        <td><span class="type-string">Mixed</span></td>
        <td>Default: <code>false</code> (Open)</td>
        <td>Values: <code>false</code> (Open), <code>'closed'</code>, <code>'rejected by admin'</code></td>
      </tr>
      <tr>
        <td><code>assignedTo</code></td>
        <td><span class="type-id">String (FK)</span></td>
        <td>References <code>users._id</code></td>
        <td>Freelancer awarded the project contract</td>
      </tr>
      <tr>
        <td><code>closedAt</code></td>
        <td><span class="type-date">Date</span></td>
        <td>Optional</td>
        <td>Timestamp when proposal was accepted and closed</td>
      </tr>
    </tbody>
  </table>

  <div class="page-break"></div>
  <h3>3.3 Bids Collection (<code>bids</code>)</h3>
  <table>
    <thead>
      <tr>
        <th>Field Name</th>
        <th>Data Type</th>
        <th>Constraints / Defaults</th>
        <th>Functional Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>_id</code></td>
        <td><span class="type-id">ObjectId</span></td>
        <td>Primary Key</td>
        <td>Unique bid submission identifier</td>
      </tr>
      <tr>
        <td><code>userId</code></td>
        <td><span class="type-id">String (FK)</span></td>
        <td>References <code>users._id</code></td>
        <td>Freelancer tendering the proposal</td>
      </tr>
      <tr>
        <td><code>projectId</code></td>
        <td><span class="type-id">String (FK)</span></td>
        <td>References <code>projects._id</code></td>
        <td>Target project vacancy receiving the proposal</td>
      </tr>
      <tr>
        <td><code>amount</code></td>
        <td><span class="type-string">String</span></td>
        <td>Required</td>
        <td>Proposed contract financial quote</td>
      </tr>
      <tr>
        <td><code>message</code></td>
        <td><span class="type-string">String</span></td>
        <td>Default: <code>""</code></td>
        <td>Cover pitch, strategy, and deliverable commitments</td>
      </tr>
      <tr>
        <td><code>status</code></td>
        <td><span class="type-string">String</span></td>
        <td>Default: <code>'pending'</code></td>
        <td>Lifecycle: <code>'pending' | 'accepted' | 'rejected'</code></td>
      </tr>
      <tr>
        <td><code>createdAt</code></td>
        <td><span class="type-date">Date</span></td>
        <td>Default: <code>Date.now</code></td>
        <td>Bid submission timestamp</td>
      </tr>
    </tbody>
  </table>

  <h3>3.4 Master Plans (<code>plans</code>) &amp; Subscriptions (<code>subscriptions</code>)</h3>
  <table>
    <thead>
      <tr>
        <th>Collection</th>
        <th>Key Attributes</th>
        <th>Data Types</th>
        <th>Functional Purpose</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong><code>plans</code></strong></td>
        <td><code>name, price, credits, tagline, features, popular, status</code></td>
        <td>String, String, String, String, String, Boolean, Boolean</td>
        <td>Admin-configured proposal credit bundles (e.g. Starter 10 Credits @ ₹99)</td>
      </tr>
      <tr>
        <td><strong><code>subscriptions</code></strong></td>
        <td><code>userId (FK), planId (FK), status, createdAt</code></td>
        <td>String, String, Boolean, Date</td>
        <td>Transaction audit ledger tracking user plan procurements</td>
      </tr>
    </tbody>
  </table>

  <h3>3.5 Direct Chat Messages (<code>chatMessages</code>)</h3>
  <table>
    <thead>
      <tr>
        <th>Field Name</th>
        <th>Data Type</th>
        <th>Constraints / Defaults</th>
        <th>Functional Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>projectId</code></td>
        <td><span class="type-id">String (FK)</span></td>
        <td>Required</td>
        <td>Project context linking client and freelancer</td>
      </tr>
      <tr>
        <td><code>senderId</code></td>
        <td><span class="type-id">String (FK)</span></td>
        <td>Required</td>
        <td>Author user ID</td>
      </tr>
      <tr>
        <td><code>senderName, senderRole</code></td>
        <td><span class="type-string">String</span></td>
        <td>Defaults: <code>'User'</code>, <code>'user'</code></td>
        <td>Display credentials and role badge</td>
      </tr>
      <tr>
        <td><code>message</code></td>
        <td><span class="type-string">String</span></td>
        <td>Required, Trimmed</td>
        <td>Message body payload</td>
      </tr>
      <tr>
        <td><code>createdAt</code></td>
        <td><span class="type-date">Date</span></td>
        <td>Default: <code>Date.now</code></td>
        <td>Message delivery timestamp</td>
      </tr>
    </tbody>
  </table>

  <!-- SECTION 4: REST API SPECIFICATION -->
  <div class="page-break"></div>
  <h2>4. Comprehensive RESTful API Reference</h2>
  <p>The Express 5 server exposes structured endpoints grouped by operational domain on port <code>9000</code>.</p>

  <h3>4.1 Authentication &amp; Profile Endpoints</h3>
  <table>
    <thead>
      <tr>
        <th style="width: 12%;">Method</th>
        <th style="width: 28%;">Endpoint</th>
        <th>Payload / Parameters</th>
        <th>Response &amp; Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span class="badge badge-post">POST</span></td>
        <td><code>/register</code></td>
        <td><code>{ name, email, password, type }</code></td>
        <td>Registers user with Bcrypt hash; returns created document without password.</td>
      </tr>
      <tr>
        <td><span class="badge badge-post">POST</span></td>
        <td><code>/login</code></td>
        <td><code>{ email, password }</code></td>
        <td>Verifies hash with <code>bcrypt.compare</code>; returns user object for session storage.</td>
      </tr>
      <tr>
        <td><span class="badge badge-get">GET</span></td>
        <td><code>/get-profile</code></td>
        <td><code>?userId={id}</code></td>
        <td>Fetches full user profile details excluding sensitive password hash.</td>
      </tr>
      <tr>
        <td><span class="badge badge-put">PUT</span></td>
        <td><code>/update-profile</code></td>
        <td><code>{ userId, name, headline, rate, skill... }</code></td>
        <td>Updates profile metadata or rotates account password.</td>
      </tr>
    </tbody>
  </table>

  <h3>4.2 Client Employer Endpoints</h3>
  <table>
    <thead>
      <tr>
        <th style="width: 12%;">Method</th>
        <th style="width: 28%;">Endpoint</th>
        <th>Payload / Parameters</th>
        <th>Response &amp; Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span class="badge badge-get">GET</span></td>
        <td><code>/client-stats</code></td>
        <td><code>?clientId={id}</code></td>
        <td>Returns <code>totalProjects</code>, <code>totalBids</code>, and <code>acceptedBids</code>.</td>
      </tr>
      <tr>
        <td><span class="badge badge-post">POST</span></td>
        <td><code>/client-post-project</code></td>
        <td><code>{ clientId, title, desc, budget, duration }</code></td>
        <td>Publishes a new project into the open marketplace.</td>
      </tr>
      <tr>
        <td><span class="badge badge-get">GET</span></td>
        <td><code>/client-project-list</code></td>
        <td><code>?clientId={id}</code></td>
        <td>Fetches all projects posted by the specific client.</td>
      </tr>
      <tr>
        <td><span class="badge badge-get">GET</span></td>
        <td><code>/client-biding-list</code></td>
        <td><code>?projectId={id}</code></td>
        <td>Fetches all received proposals along with full bidder profile details.</td>
      </tr>
      <tr>
        <td><span class="badge badge-put">PUT</span></td>
        <td><code>/client-biding-action</code></td>
        <td><code>{ projectId, userId, status }</code></td>
        <td>Accepts proposal, auto-closes project, rejects rivals, and sends HTML acceptance email.</td>
      </tr>
      <tr>
        <td><span class="badge badge-delete">DELETE</span></td>
        <td><code>/client-delete-project/:id</code></td>
        <td>Route param <code>:id</code></td>
        <td>Cascading delete for project and associated proposals.</td>
      </tr>
    </tbody>
  </table>

  <h3>4.3 Freelancer Talent Endpoints</h3>
  <table>
    <thead>
      <tr>
        <th style="width: 12%;">Method</th>
        <th style="width: 28%;">Endpoint</th>
        <th>Payload / Parameters</th>
        <th>Response &amp; Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span class="badge badge-get">GET</span></td>
        <td><code>/user-stats</code></td>
        <td><code>?userId={id}</code></td>
        <td>Returns credits balance, valid bids count, accepted projects, and total earnings.</td>
      </tr>
      <tr>
        <td><span class="badge badge-get">GET</span></td>
        <td><code>/user-projects-list</code></td>
        <td>None</td>
        <td>Fetches open marketplace contracts excluding projects rejected by admin.</td>
      </tr>
      <tr>
        <td><span class="badge badge-post">POST</span></td>
        <td><code>/user-create-bids</code></td>
        <td><code>{ userId, projectId, amount, message }</code></td>
        <td>Validates credit &gt; 0, deducts 1 credit, and logs proposal in <code>bids</code>.</td>
      </tr>
      <tr>
        <td><span class="badge badge-get">GET</span></td>
        <td><code>/user-get-bids</code></td>
        <td><code>?userId={id}</code></td>
        <td>Retrieves all proposals placed by the user with real-time status and client names.</td>
      </tr>
      <tr>
        <td><span class="badge badge-post">POST</span></td>
        <td><code>/user-purchase-plan</code></td>
        <td><code>{ userId, planId }</code></td>
        <td>Credits account balance with plan quota and creates audit subscription record.</td>
      </tr>
    </tbody>
  </table>

  <h3>4.4 Admin Governance Endpoints</h3>
  <table>
    <thead>
      <tr>
        <th style="width: 12%;">Method</th>
        <th style="width: 28%;">Endpoint</th>
        <th>Payload / Parameters</th>
        <th>Response &amp; Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span class="badge badge-get">GET</span></td>
        <td><code>/admin-stats</code></td>
        <td>None</td>
        <td>Aggregate platform counts: total users, clients, and projects.</td>
      </tr>
      <tr>
        <td><span class="badge badge-get">GET</span></td>
        <td><code>/admin-users-list</code></td>
        <td>None</td>
        <td>Lists all registered freelancer profiles without sensitive passwords.</td>
      </tr>
      <tr>
        <td><span class="badge badge-put">PUT</span></td>
        <td><code>/admin-toggle-user-status/:id</code></td>
        <td>Route param <code>:id</code></td>
        <td>Toggles account status between <code>'active'</code> and <code>'blocked'</code>.</td>
      </tr>
      <tr>
        <td><span class="badge badge-put">PUT</span></td>
        <td><code>/admin-reject-project/:id</code></td>
        <td>Route param <code>:id</code></td>
        <td>Sets project to <code>'rejected by admin'</code>, shielding marketplace from spam.</td>
      </tr>
      <tr>
        <td><span class="badge badge-post">POST</span></td>
        <td><code>/admin-create-plans</code></td>
        <td><code>{ name, price, credits, tagline... }</code></td>
        <td>Creates new master pricing tier for freelancer proposal credit acquisition.</td>
      </tr>
    </tbody>
  </table>

  <!-- SECTION 5: LIVE OUTPUT & SCREENSHOT GALLERY -->
  <div class="page-break"></div>
  <h2>5. Live Application Output &amp; Interface Gallery</h2>
  <p>Screenshots captured from the running Zentora application on <code>http://localhost:5173</code>.</p>

  <!-- Screenshot 1 -->
  <div class="screenshot-card avoid-break">
    <div class="screenshot-header">
      <span class="screenshot-title">1. Public Marketplace Landing Page &amp; Hero Section</span>
      <span class="screenshot-route">URL: /</span>
    </div>
    <img class="screenshot-img" src="${imgHero}" alt="Zentora Homepage" />
    <div class="screenshot-desc">
      The landing view presents brand identity, full-service navigation header, responsive CTA buttons, and high-visibility community counters showcasing 10k+ vetted experts.
    </div>
  </div>

  <!-- Screenshot 2 -->
  <div class="screenshot-card avoid-break">
    <div class="screenshot-header">
      <span class="screenshot-title">2. Browse Talent by Categories &amp; Platform Trust Pillars</span>
      <span class="screenshot-route">URL: /#categories</span>
    </div>
    <img class="screenshot-img" src="${imgCategories}" alt="Talent Categories" />
    <div class="screenshot-desc">
      Nine professional talent sectors (Web &amp; Software, Design, Writing, Data Science, Marketing, etc.) accompanied by core trust pillars: Expert Freelancers, Safe Escrow, and 24x7 Support.
    </div>
  </div>

  <div class="page-break"></div>
  <!-- Screenshot 3 -->
  <div class="screenshot-card avoid-break">
    <div class="screenshot-header">
      <span class="screenshot-title">3. Trending Contracts &amp; Marketplace Open Project Feed</span>
      <span class="screenshot-route">URL: /#projects</span>
    </div>
    <img class="screenshot-img" src="${imgProjects}" alt="Trending Projects" />
    <div class="screenshot-desc">
      Live job opportunities showing employer parameters including contract heading, duration tags, budget quotations, and instant proposal submission triggers.
    </div>
  </div>

  <!-- Screenshot 4 -->
  <div class="screenshot-card avoid-break">
    <div class="screenshot-header">
      <span class="screenshot-title">4. Platform Growth Metrics &amp; Verified Client Reviews</span>
      <span class="screenshot-route">URL: /#testimonials</span>
    </div>
    <img class="screenshot-img" src="${imgStats}" alt="Metrics and Testimonials" />
    <div class="screenshot-desc">
      Production KPI counters (32k+ Freelancers, 8,768+ Contracts, 100% Satisfaction) paired with dynamic client and service provider testimonials.
    </div>
  </div>

  <div class="page-break"></div>
  <!-- Screenshot 5 & 6 Grid -->
  <div class="screenshot-grid-2 avoid-break">
    <div class="screenshot-card">
      <div class="screenshot-header">
        <span class="screenshot-title">5. Services Catalog</span>
        <span class="screenshot-route">/services</span>
      </div>
      <img class="screenshot-img" src="${imgServices}" alt="Services Directory" />
      <div class="screenshot-desc">
        Specialized service categories for web development, UX/UI, digital marketing, and DevOps.
      </div>
    </div>

    <div class="screenshot-card">
      <div class="screenshot-header">
        <span class="screenshot-title">6. Credit Pricing Packages</span>
        <span class="screenshot-route">/pricing</span>
      </div>
      <img class="screenshot-img" src="${imgPricing}" alt="Pricing Plans" />
      <div class="screenshot-desc">
        Freelancer credit tiers (e.g. Starter Plan: 10 Credits @ ₹99) enforcing proposal intent.
      </div>
    </div>
  </div>

  <!-- Screenshot 7 & 8 Grid -->
  <div class="screenshot-grid-2 avoid-break" style="margin-top: 14px;">
    <div class="screenshot-card">
      <div class="screenshot-header">
        <span class="screenshot-title">7. User Sign-In Portal</span>
        <span class="screenshot-route">/login</span>
      </div>
      <img class="screenshot-img" src="${imgLogin}" alt="Login Screen" />
      <div class="screenshot-desc">
        Secure authentication with real-time validation and automatic role-based redirect.
      </div>
    </div>

    <div class="screenshot-card">
      <div class="screenshot-header">
        <span class="screenshot-title">8. Registration &amp; Role Choice</span>
        <span class="screenshot-route">/register</span>
      </div>
      <img class="screenshot-img" src="${imgRegister}" alt="Register Screen" />
      <div class="screenshot-desc">
        Account creation interface supporting role segregation between Client and Freelancer.
      </div>
    </div>
  </div>

  <!-- SECTION 6: CONCLUSION & ROADMAP -->
  <div class="page-break"></div>
  <h2>6. Technical Roadmap &amp; Conclusion</h2>
  
  <h3>Planned Enhancements</h3>
  <table>
    <thead>
      <tr>
        <th style="width: 25%;">Enhancement</th>
        <th>Technical Roadmap Strategy</th>
        <th style="width: 20%;">Target Milestone</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Payment Escrow</strong></td>
        <td>Integration with Razorpay / Stripe Webhooks for automated INR/USD milestone deposits and fund releases.</td>
        <td>v2.1 Release</td>
      </tr>
      <tr>
        <td><strong>WebSocket Chat</strong></td>
        <td>Migrate HTTP chat polling to bidirectional Socket.io with live typing indicators and presence detection.</td>
        <td>v2.2 Release</td>
      </tr>
      <tr>
        <td><strong>AI Proposal Assistant</strong></td>
        <td>Embedding LLM capability to help freelancers draft tailored proposal pitches based on job specifications.</td>
        <td>v2.3 Release</td>
      </tr>
      <tr>
        <td><strong>Mobile App</strong></td>
        <td>Deploying React Native cross-platform mobile apps for iOS and Android consuming existing REST APIs.</td>
        <td>v3.0 Release</td>
      </tr>
    </tbody>
  </table>

  <h3>Conclusion</h3>
  <p>
    The <strong>Zentora Freelance Marketplace</strong> provides an end-to-end, dependable, and visually captivating talent ecosystem. By uniting strict role-based routing, spam-deterrent credit bidding, automated HTML email dispatch via Nodemailer, project-scoped collaboration hubs, and administrative governance, Zentora establishes a reliable foundation for modern online freelancing.
  </p>

  <div style="margin-top: 30px; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid var(--border); text-align: center; font-size: 11.5px; color: #64748b;">
    <strong>End of Document &bull; Zentora Project Synopsis</strong><br>
    Compiled using React 19 &bull; Vite &bull; Node.js &bull; Express 5 &bull; MongoDB &bull; Nodemailer
  </div>

</body>
</html>`;

fs.writeFileSync(outputHtml, htmlContent, 'utf-8');
console.log('Generated synopsis.html successfully!');

// Run Edge Headless to print to PDF
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const htmlUrl = 'file:///' + outputHtml.replace(/\\/g, '/');

console.log('Running Edge headless print-to-pdf...');
try {
  execFileSync(edgePath, [
    '--headless=new',
    '--disable-gpu',
    '--run-all-compositor-stages-before-draw',
    `--print-to-pdf=${outputPdf}`,
    '--no-pdf-header-footer',
    htmlUrl
  ], { stdio: 'inherit' });
} catch (e) {
  console.log('Edge process completed with:', e.message);
}

if (fs.existsSync(outputPdf)) {
  const stats = fs.statSync(outputPdf);
  console.log(`PDF created successfully: ${outputPdf} (${stats.size} bytes)`);
  fs.copyFileSync(outputPdf, artifactPdf);
  console.log(`Copied to artifact directory: ${artifactPdf}`);
} else {
  console.error('PDF generation failed.');
}

