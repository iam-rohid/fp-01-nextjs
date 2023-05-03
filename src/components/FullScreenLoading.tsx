import CircularProgress from "./CircularProgress";

export default function FullScreenLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <CircularProgress />
    </div>
  );
}
