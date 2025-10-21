function MainFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Beauty Booking Hub. All rights reserved.</p>
        <p className="text-xs sm:text-sm">
          NestJS microservices · PostgreSQL · OAuth2 · Docker/Kubernetes ready
        </p>
      </div>
    </footer>
  );
}

export default MainFooter;
