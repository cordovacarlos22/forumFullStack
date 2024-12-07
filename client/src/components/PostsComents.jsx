import Post from "./Post"

function PostsComents() {
    return (
        <section className=" py-8 antialiased bg-gray-900 md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 ">
                <div className="w-full h-full" >
                    {/* posts */}

                    <Post />

                    {/* caja para hacer los comentarios  */}
                    <div className="mt-7 border-2 w-3/5 ml-64 p-4 rounded-xl border-gray-400">
                        <form className="mb-6">
                            <div className="py-2 px-4 mb-4  rounded-lg rounded-t-lg border  bg-gray-800 border-gray-700">
                                <label for="comment" className="sr-only">Your comment</label>
                                <textarea id="comment" rows="6"
                                    className="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none text-white placeholder-gray-400 bg-gray-800"
                                    placeholder="Comenta los piensas" required></textarea>
                            </div>
                            <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">
                                Comentar
                            </button>
                        </form>
                    </div>










                    {/* comentarios */}
                    <div className="mt-4 border-2  w-3/5 ml-64 rounded-xl border-gray-400">
                        <article className="p-6 text-base  rounded-lg bg-gray-900">
                            <footer className="flex justify-between items-center mb-2">

                                <div className="flex items-center">
                                    <p className="inline-flex items-center mr-3 text-lg text-white font-semibold">
                                        <img
                                            className="mr-2 w-8 h-8 rounded-full"
                                            src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                            alt="Michael Gough"
                                        />
                                        Michael Gough
                                    </p>
                                </div >
                            </footer>
                            <p className="text-gray-500 ">
                                Very straight-to-point article. Really worth time reading. Thank you! But
                                tools are just the instruments for the UX designers. The knowledge of the
                                design tools are as important as the creation of the design strategy.

                            </p>
                            <div className="flex items-center mt-4 space-x-4">
                                <div>
                                    <button>
                                        <svg className="w-[23px] h-[23px] text-white hover:text-orange-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" d="M7 11c.889-.086 1.416-.543 2.156-1.057a22.323 22.323 0 0 0 3.958-5.084 1.6 1.6 0 0 1 .582-.628 1.549 1.549 0 0 1 1.466-.087c.205.095.388.233.537.406a1.64 1.64 0 0 1 .384 1.279l-1.388 4.114M7 11H4v6.5A1.5 1.5 0 0 0 5.5 19v0A1.5 1.5 0 0 0 7 17.5V11Zm6.5-1h4.915c.286 0 .372.014.626.15.254.135.472.332.637.572a1.874 1.874 0 0 1 .215 1.673l-2.098 6.4C17.538 19.52 17.368 20 16.12 20c-2.303 0-4.79-.943-6.67-1.475" />
                                        </svg>

                                    </button>
                                </div>
                                <h1 className="text-white">+100k</h1>
                                <div>
                                    <button>
                                        <svg className="w-[23px] h-[23px] text-white hover:text-orange-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13c-.889.086-1.416.543-2.156 1.057a22.322 22.322 0 0 0-3.958 5.084 1.6 1.6 0 0 1-.582.628 1.549 1.549 0 0 1-1.466.087 1.587 1.587 0 0 1-.537-.406 1.666 1.666 0 0 1-.384-1.279l1.389-4.114M17 13h3V6.5A1.5 1.5 0 0 0 18.5 5v0A1.5 1.5 0 0 0 17 6.5V13Zm-6.5 1H5.585c-.286 0-.372-.014-.626-.15a1.797 1.797 0 0 1-.637-.572 1.873 1.873 0 0 1-.215-1.673l2.098-6.4C6.462 4.48 6.632 4 7.88 4c2.302 0 4.79.943 6.67 1.475" />
                                        </svg>

                                    </button>

                                </div>
                                <h1 className="text-white ml-0">-50k</h1>
                                <button type="button">
                                    <svg className="w-6 h-6 text-white hover:text-orange-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.556 8.5h8m-8 3.5H12m7.111-7H4.89a.896.896 0 0 0-.629.256.868.868 0 0 0-.26.619v9.25c0 .232.094.455.26.619A.896.896 0 0 0 4.89 16H9l3 4 3-4h4.111a.896.896 0 0 0 .629-.256.868.868 0 0 0 .26-.619v-9.25a.868.868 0 0 0-.26-.619.896.896 0 0 0-.63-.256Z" />
                                    </svg>
                                </button>
                                <h1 className="text-white">1</h1>
                            </div>

                        </article>




                        <div className="border-2 rounded-xl border-gray-400 ml-20 mt-3 m-3">
                            <article className="p-6 mb-3 ml-6 lg:ml-12 text-base  rounded-lg bg-gray-900">
                                <footer className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                        <p className="inline-flex items-center mr-3 text-lg  text-white font-semibold">
                                            <img
                                                className="mr-2 w-8 h-8 rounded-full"
                                                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                                alt="Jese Leos"
                                            />
                                            Jese Leos
                                        </p>
                                    </div>

                                </footer>
                                <p className="text-gray-400">
                                    Much appreciated! Glad you liked it ☺️
                                </p>
                                <div className="flex items-center mt-4 space-x-4">
                                    <div>
                                        <button>
                                            <svg className="w-[23px] h-[23px]  text-white hover:text-orange-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" d="M7 11c.889-.086 1.416-.543 2.156-1.057a22.323 22.323 0 0 0 3.958-5.084 1.6 1.6 0 0 1 .582-.628 1.549 1.549 0 0 1 1.466-.087c.205.095.388.233.537.406a1.64 1.64 0 0 1 .384 1.279l-1.388 4.114M7 11H4v6.5A1.5 1.5 0 0 0 5.5 19v0A1.5 1.5 0 0 0 7 17.5V11Zm6.5-1h4.915c.286 0 .372.014.626.15.254.135.472.332.637.572a1.874 1.874 0 0 1 .215 1.673l-2.098 6.4C17.538 19.52 17.368 20 16.12 20c-2.303 0-4.79-.943-6.67-1.475" />
                                            </svg>

                                        </button>
                                    </div>
                                    <h1 className="text-white">+100k</h1>
                                    <div>
                                        <button>
                                            <svg className="w-[23px] h-[23px]  text-white hover:text-orange-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13c-.889.086-1.416.543-2.156 1.057a22.322 22.322 0 0 0-3.958 5.084 1.6 1.6 0 0 1-.582.628 1.549 1.549 0 0 1-1.466.087 1.587 1.587 0 0 1-.537-.406 1.666 1.666 0 0 1-.384-1.279l1.389-4.114M17 13h3V6.5A1.5 1.5 0 0 0 18.5 5v0A1.5 1.5 0 0 0 17 6.5V13Zm-6.5 1H5.585c-.286 0-.372-.014-.626-.15a1.797 1.797 0 0 1-.637-.572 1.873 1.873 0 0 1-.215-1.673l2.098-6.4C6.462 4.48 6.632 4 7.88 4c2.302 0 4.79.943 6.67 1.475" />
                                            </svg>

                                        </button>

                                    </div>
                                    <h1 className="text-white ml-0">-50k</h1>
                                </div>
                            </article>

                        </div>
                    </div>












                    <div className="mt-7 border-2  w-3/5 ml-64 p-4 rounded-xl border-gray-400">
                        <article className="p-6 text-base  rounded-lg bg-gray-900">
                            <footer className="flex justify-between items-center mb-2">

                                <div className="flex items-center">
                                    <p className="inline-flex items-center mr-3 text-lg text-white font-semibold">
                                        <img
                                            className="mr-2 w-8 h-8 rounded-full"
                                            src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                            alt="Michael Gough"
                                        />
                                        Michael Gough
                                    </p>
                                </div>

                                {/* Dropdown menu */}
                            </footer>
                            <p className="text-gray-400">Very straight-to-point article. Really worth time reading. Thank you! But tools are just the
                                instruments for the UX designers. The knowledge of the design tools are as important as the
                                creation of the design strategy.</p>
                            <div className="flex items-center mt-4 space-x-4">
                                <div>
                                    <button>
                                        <svg className="w-[23px] h-[23px] text-white hover:text-orange-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" d="M7 11c.889-.086 1.416-.543 2.156-1.057a22.323 22.323 0 0 0 3.958-5.084 1.6 1.6 0 0 1 .582-.628 1.549 1.549 0 0 1 1.466-.087c.205.095.388.233.537.406a1.64 1.64 0 0 1 .384 1.279l-1.388 4.114M7 11H4v6.5A1.5 1.5 0 0 0 5.5 19v0A1.5 1.5 0 0 0 7 17.5V11Zm6.5-1h4.915c.286 0 .372.014.626.15.254.135.472.332.637.572a1.874 1.874 0 0 1 .215 1.673l-2.098 6.4C17.538 19.52 17.368 20 16.12 20c-2.303 0-4.79-.943-6.67-1.475" />
                                        </svg>

                                    </button>
                                </div>
                                <h1 className="text-white">+100k</h1>
                                <div>
                                    <button>
                                        <svg className="w-[23px] h-[23px] text-white hover:text-orange-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13c-.889.086-1.416.543-2.156 1.057a22.322 22.322 0 0 0-3.958 5.084 1.6 1.6 0 0 1-.582.628 1.549 1.549 0 0 1-1.466.087 1.587 1.587 0 0 1-.537-.406 1.666 1.666 0 0 1-.384-1.279l1.389-4.114M17 13h3V6.5A1.5 1.5 0 0 0 18.5 5v0A1.5 1.5 0 0 0 17 6.5V13Zm-6.5 1H5.585c-.286 0-.372-.014-.626-.15a1.797 1.797 0 0 1-.637-.572 1.873 1.873 0 0 1-.215-1.673l2.098-6.4C6.462 4.48 6.632 4 7.88 4c2.302 0 4.79.943 6.67 1.475" />
                                        </svg>

                                    </button>

                                </div>
                                <h1 className="text-white ml-0">-50k</h1>
                                <button type="button">
                                    <svg className="w-6 h-6 text-white hover:text-orange-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.556 8.5h8m-8 3.5H12m7.111-7H4.89a.896.896 0 0 0-.629.256.868.868 0 0 0-.26.619v9.25c0 .232.094.455.26.619A.896.896 0 0 0 4.89 16H9l3 4 3-4h4.111a.896.896 0 0 0 .629-.256.868.868 0 0 0 .26-.619v-9.25a.868.868 0 0 0-.26-.619.896.896 0 0 0-.63-.256Z" />
                                    </svg>
                                </button>
                                <h1 className="text-white">1</h1>
                            </div>
                        </article>

                    </div>
                </div>
            </div>
        </section>

    )
}

export default PostsComents
