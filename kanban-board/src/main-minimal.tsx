// Minimal test - this should definitely work
console.log('MINIMAL TEST STARTING');

const root = document.getElementById('root');
if (root) {
  root.innerHTML = `
    <div style="padding: 20px; background: #4CAF50; color: white; font-family: Arial;">
      <h1>✅ JavaScript is Working!</h1>
      <p>If you see this green box, JavaScript is executing.</p>
      <p>Now testing React...</p>
    </div>
  `;
  
  // Try to load React
  import('react').then((React) => {
    console.log('React loaded:', React);
    root.innerHTML += '<p style="color: white;">✅ React module loaded successfully</p>';
  }).catch((err) => {
    console.error('React failed to load:', err);
    root.innerHTML += `<p style="color: yellow;">❌ React failed: ${err.message}</p>`;
  });
} else {
  console.error('Root element not found');
  document.body.innerHTML = '<div style="padding: 20px; color: red;">ERROR: Root element not found!</div>';
}
