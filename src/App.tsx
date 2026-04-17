export function App() {
  const appTitle = import.meta.env.VITE_APP_TITLE || 'Athena Default Template';

  return (
    <div className="app-shell">
      <main className="app-frame">
        <section className="hero-card">
          <svg
            className="logo-mark"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M310.29 278.425L334.532 319.287H310.29H286.047L310.29 278.425Z" fill="currentColor" />
            <path d="M74.2426 278.425L98.4852 319.287H50L74.2426 278.425Z" fill="currentColor" />
            <rect x="74.2749" y="278.425" width="236.049" height="40.8621" fill="currentColor" />
            <rect x="93.4932" y="181.718" width="37.4384" height="89.8965" fill="currentColor" />
            <rect x="147.405" y="181.718" width="37.4384" height="89.8965" fill="currentColor" />
            <rect x="201.316" y="181.718" width="37.4384" height="89.8965" fill="currentColor" />
            <rect x="255.227" y="181.718" width="37.4384" height="89.8965" fill="currentColor" />
            <rect x="69.0771" y="147.202" width="245.628" height="24.7484" fill="currentColor" />
            <rect x="69.0771" y="147.35" width="137.972" height="27.8419" transform="rotate(-27 69.0771 147.35)" fill="currentColor" />
            <rect x="191.847" y="84.7123" width="137.972" height="27.8419" transform="rotate(27 191.847 84.7123)" fill="currentColor" />
          </svg>

          <h1>{appTitle}</h1>

          <div className="status-row">
            <span className="status-dot" />
            <span className="status-label">Environment ready</span>
          </div>
        </section>
      </main>
    </div>
  );
}
