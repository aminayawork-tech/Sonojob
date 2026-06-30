export default function JobsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="h-8 w-48 rounded-lg mb-2 animate-pulse" style={{ background: '#f1f5f9' }} />
      <div className="h-4 w-64 rounded mb-8 animate-pulse" style={{ background: '#f1f5f9' }} />
      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="lg:w-64 flex-shrink-0">
          <div className="card p-4 h-[440px] animate-pulse" style={{ background: '#f8fafc' }} />
        </aside>
        <div className="flex-1 flex flex-col gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="card p-5 animate-pulse" style={{ background: '#f8fafc' }}>
              <div className="flex gap-2 mb-3">
                <div className="h-5 w-16 rounded-full" style={{ background: '#e2e8f0' }} />
                <div className="h-5 w-20 rounded-full ml-auto" style={{ background: '#e2e8f0' }} />
              </div>
              <div className="h-5 w-3/4 rounded mb-1.5" style={{ background: '#e2e8f0' }} />
              <div className="h-4 w-1/3 rounded mb-4" style={{ background: '#f1f5f9' }} />
              <div className="flex gap-3 mb-3">
                <div className="h-3 w-24 rounded" style={{ background: '#f1f5f9' }} />
                <div className="h-3 w-20 rounded" style={{ background: '#f1f5f9' }} />
                <div className="h-3 w-16 rounded" style={{ background: '#f1f5f9' }} />
              </div>
              <div className="flex gap-1.5 mb-3">
                <div className="h-5 w-20 rounded-full" style={{ background: '#e0f2fe' }} />
                <div className="h-5 w-16 rounded-full" style={{ background: '#f1f5f9' }} />
              </div>
              <div className="flex justify-between pt-2 border-t" style={{ borderColor: '#f1f5f9' }}>
                <div className="h-4 w-20 rounded" style={{ background: '#e2e8f0' }} />
                <div className="h-4 w-16 rounded" style={{ background: '#f1f5f9' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
