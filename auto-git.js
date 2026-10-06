import { execSync } from 'child_process';

const CHECK_INTERVAL_SECONDS = 30; // Checks for changes every 30 seconds
const BRANCH = 'main';

console.log('====================================================');
console.log('🚀 Zentora Auto-Git Sync Daemon Started');
console.log(`⏱️  Monitoring repository every ${CHECK_INTERVAL_SECONDS} seconds...`);
console.log(`🌿 Target branch: ${BRANCH}`);
console.log('💡 Press Ctrl + C anytime to stop auto-sync.');
console.log('====================================================\n');

function syncWithGit() {
  try {
    // Check if there are modified, added, or untracked files
    const status = execSync('git status --porcelain', { encoding: 'utf-8' }).trim();

    if (!status) {
      // Working tree clean, nothing to commit
      return;
    }

    const changedFiles = status
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);

    const now = new Date();
    const timeStr = now.toLocaleTimeString();
    const dateStr = now.toLocaleDateString();
    const commitMessage = `Auto-sync: ${dateStr} ${timeStr} (${changedFiles.length} files)`;

    console.log(`[${timeStr}] 🔄 ${changedFiles.length} changed file(s) detected:`);
    changedFiles.slice(0, 5).forEach(f => console.log(`   • ${f}`));
    if (changedFiles.length > 5) {
      console.log(`   ... and ${changedFiles.length - 5} more`);
    }

    // 1. Stage all changes
    execSync('git add .', { stdio: 'pipe' });

    // 2. Commit changes
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'pipe' });
    console.log(`[${timeStr}] 💾 Committed: "${commitMessage}"`);

    // 3. Push to remote
    console.log(`[${timeStr}] ⬆️  Pushing to GitHub (origin/${BRANCH})...`);
    execSync(`git push origin ${BRANCH}`, { stdio: 'pipe' });
    console.log(`[${timeStr}] ✅ Successfully pushed to GitHub!\n`);

  } catch (err) {
    const errorMsg = err.stderr ? err.stderr.toString() : err.message;
    console.error(`[${new Date().toLocaleTimeString()}] ⚠️ Auto-sync notice:`, errorMsg.trim());
    console.log('Will retry on next interval...\n');
  }
}

// Initial check on start
syncWithGit();

// Periodic timer
setInterval(syncWithGit, CHECK_INTERVAL_SECONDS * 1000);
