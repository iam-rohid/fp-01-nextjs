const AppBar = ({ title }: { title: string }) => {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center border-b border-slate-200 bg-background px-4">
      <h1 className="text-xl font-semibold">{title}</h1>
    </header>
  );
};

export default AppBar;
