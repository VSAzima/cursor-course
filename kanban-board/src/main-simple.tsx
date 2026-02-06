// Simple test to verify React is working
console.log('Simple main.tsx loaded');

const root = document.getElementById('root');
if (root) {
  root.innerHTML = '<h1 style="color: red; padding: 20px;">React Test - If you see this, React is NOT working</h1>';
  console.log('Set innerHTML directly');
} else {
  console.error('Root not found');
}
