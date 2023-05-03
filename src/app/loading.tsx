import CircularProgress from "@/components/CircularProgress";

export default function RootLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <CircularProgress />
    </div>
  );
}
