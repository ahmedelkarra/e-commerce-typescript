
function NotFound() {
    return (
        <div role="alert" className="w-[50%] m-auto rounded border-s-4 border-red-500 bg-red-50 p-4">
            <div className="flex items-center gap-2 text-red-800">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path
                        fillRule="evenodd"
                        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        clipRule="evenodd"
                    />
                </svg>

                <strong className="block font-medium"> Oops! Page Not Found </strong>
            </div>

            <p className="mt-2 text-sm text-red-700">
                We're sorry, but the page you're looking for doesn't exist.
                It might have been removed, had its name changed, or is temporarily unavailable. Don't worry, we're here to help you find your way back!
            </p>
        </div>

    )
}

export default NotFound