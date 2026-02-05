import LoadingSpinner from './LoadingSpinner';

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

function LoadingOverlay({ isLoading, message = 'Loading...' }: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 dark:bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 sm:p-8 flex flex-col items-center gap-4 min-w-[200px]">
        <LoadingSpinner size="lg" />
        <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
          {message}
        </p>
      </div>
    </div>
  );
}

export default LoadingOverlay;
