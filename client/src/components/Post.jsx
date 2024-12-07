import Aside from "./Aside"


function Post({ id, title, content, postImage }) {

    return (
        <>
            <section>
                <Aside />
            </section>
            <section
                key={id}
                className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16"
            >
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="w-full h-full">
                        {/* Card Container */}
                        <div className="p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl border border-stone-200">
                            {/* Header Section */}
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                                <div className="flex items-center space-x-3">
                                    <img
                                        className="w-10 h-10 rounded-full"
                                        src="https://i.pinimg.com/736x/d3/5f/70/d35f709f7ecd27747a231b0da3d5c55f.jpg"
                                        alt="User Avatar"
                                    />
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                        tech
                                    </p>
                                </div>
                                <div className="text-center md:text-left">
                                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {title}
                                    </h1>
                                    <p className="text-gray-600 dark:text-gray-400 mt-2">{content}</p>
                                </div>
                                <div className="text-right">
                                    <button
                                        type="button"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                                    >
                                        Follow
                                    </button>
                                </div>
                            </div>

                            {/* Image Section */}
                            <div className="flex items-center justify-center mt-6">
                                <img
                                    className="w-full max-w-lg h-auto object-cover rounded-lg shadow-md"
                                    src={postImage}
                                    alt={title}
                                />
                            </div>

                            {/* Footer Section */}
                            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center space-x-3">
                                    <button>
                                        <svg
                                            className="w-8 h-8 text-gray-800 dark:text-white hover:text-orange-600"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                d="M7 11c.889-.086 1.416-.543 2.156-1.057a22.323 22.323 0 0 0 3.958-5.084 1.6 1.6 0 0 1 .582-.628 1.549 1.549 0 0 1 1.466-.087c.205.095.388.233.537.406a1.64 1.64 0 0 1 .384 1.279l-1.388 4.114M7 11H4v6.5A1.5 1.5 0 0 0 5.5 19v0A1.5 1.5 0 0 0 7 17.5V11Zm6.5-1h4.915c.286 0 .372.014.626.15.254.135.472.332.637.572a1.874 1.874 0 0 1 .215 1.673l-2.098 6.4C17.538 19.52 17.368 20 16.12 20c-2.303 0-4.79-.943-6.67-1.475"
                                            />
                                        </svg>
                                    </button>
                                    <span className="text-white">+10k</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <button>
                                        <svg
                                            className="w-8 h-8 text-gray-800 dark:text-white hover:text-orange-600"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                d="M17 13c-.889.086-1.416.543-2.156 1.057a22.322 22.322 0 0 0-3.958 5.084 1.6 1.6 0 0 1-.582.628 1.549 1.549 0 0 1-1.466.087 1.587 1.587 0 0 1-.537-.406 1.666 1.666 0 0 1-.384-1.279l1.389-4.114M17 13h3V6.5A1.5 1.5 0 0 0 18.5 5v0A1.5 1.5 0 0 0 17 6.5V13Zm-6.5 1H5.585c-.286 0-.372-.014-.626-.15a1.797 1.797 0 0 1-.637-.572 1.873 1.873 0 0 1-.215-1.673l2.098-6.4C6.462 4.48 6.632 4 7.88 4c2.302 0 4.79.943 6.67 1.475"
                                            />
                                        </svg>
                                    </button>
                                    <span className="text-white">-10k</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Post
