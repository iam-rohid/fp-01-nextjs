const ErrorBox = ({ error }: { error?: string }) => {
  if (!error) {
    return null;
  }
  return (
    <div className="my-4 w-full rounded-lg border border-red-400 bg-red-500/5 px-4 py-2.5 text-red-400">
      <p>{error}</p>
    </div>
  );
};

export default ErrorBox;
