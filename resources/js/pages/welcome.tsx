import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Clock, Users, FileText, Settings } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Sistem Antrian Puskesmas">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-100">
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <h1 className="text-xl font-bold text-green-600">🏥 Puskesmas Pracimantoro 1</h1>
                                </div>
                            </div>
                            <nav className="flex items-center space-x-4">
                                {auth.user ? (
                                    <div className="flex items-center space-x-4">
                                        <span className="text-gray-700">Halo, {auth.user.name}</span>
                                        <Link
                                            href={route('dashboard')}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                                        >
                                            Dashboard
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-4">
                                        <Link
                                            href={route('login')}
                                            className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                        >
                                            Masuk
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                        >
                                            Daftar
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                <main>
                    {/* Hero Section */}
                    <div className="relative overflow-hidden bg-white">
                        <div className="max-w-7xl mx-auto">
                            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                                <svg
                                    className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
                                    fill="currentColor"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    aria-hidden="true"
                                >
                                    <polygon points="50,0 100,0 50,100 0,100" />
                                </svg>

                                <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                                    <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                                        <div className="sm:text-center lg:text-left">
                                            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                                <span className="block xl:inline">Sistem Antrian</span>
                                                <span className="block text-green-600 xl:inline"> Digital</span>
                                            </h1>
                                            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                                Ambil nomor antrian secara digital dan pantau status antrian Anda secara real-time. 
                                                Tidak perlu lagi menunggu lama di ruang tunggu!
                                            </p>
                                            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                                <div className="rounded-md shadow">
                                                    {auth.user ? (
                                                        <Link
                                                            href={route('queues.index')}
                                                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10 transition-colors"
                                                        >
                                                            📋 Ambil Nomor Antrian
                                                        </Link>
                                                    ) : (
                                                        <Link
                                                            href={route('register')}
                                                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10 transition-colors"
                                                        >
                                                            🚀 Mulai Sekarang
                                                        </Link>
                                                    )}
                                                </div>
                                                <div className="mt-3 sm:mt-0 sm:ml-3">
                                                    <Link
                                                        href={route('login')}
                                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 md:py-4 md:text-lg md:px-10 transition-colors"
                                                    >
                                                        👤 Masuk
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                            <div className="h-56 w-full bg-gradient-to-r from-green-400 to-blue-500 sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
                                <div className="text-center text-white">
                                    <div className="text-6xl mb-4">🏥</div>
                                    <div className="text-2xl font-bold mb-2">Puskesmas Modern</div>
                                    <div className="text-lg">Pelayanan Digital Terdepan</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="py-12 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="lg:text-center">
                                <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Fitur Unggulan</h2>
                                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                    Semua yang Anda Butuhkan
                                </p>
                                <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                                    Sistem antrian digital yang memudahkan pasien dan staff puskesmas
                                </p>
                            </div>

                            <div className="mt-10">
                                <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                                    {/* Feature 1 */}
                                    <div className="relative">
                                        <dt>
                                            <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                                                <Clock className="h-6 w-6" aria-hidden="true" />
                                            </div>
                                            <p className="ml-16 text-lg leading-6 font-medium text-gray-900">⏰ Antrian Real-time</p>
                                        </dt>
                                        <dd className="mt-2 ml-16 text-base text-gray-500">
                                            Pantau posisi antrian Anda secara real-time. Tidak perlu duduk berlama-lama di ruang tunggu.
                                        </dd>
                                    </div>

                                    {/* Feature 2 */}
                                    <div className="relative">
                                        <dt>
                                            <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                                                <Users className="h-6 w-6" aria-hidden="true" />
                                            </div>
                                            <p className="ml-16 text-lg leading-6 font-medium text-gray-900">👥 Multi Poliklinik</p>
                                        </dt>
                                        <dd className="mt-2 ml-16 text-base text-gray-500">
                                            Tersedia berbagai poliklinik: Umum, Anak, Gigi, Mata, KIA, dan lainnya.
                                        </dd>
                                    </div>

                                    {/* Feature 3 */}
                                    <div className="relative">
                                        <dt>
                                            <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                                                <FileText className="h-6 w-6" aria-hidden="true" />
                                            </div>
                                            <p className="ml-16 text-lg leading-6 font-medium text-gray-900">📊 Laporan Digital</p>
                                        </dt>
                                        <dd className="mt-2 ml-16 text-base text-gray-500">
                                            Cetak tiket antrian dan akses laporan harian untuk administrasi yang lebih baik.
                                        </dd>
                                    </div>

                                    {/* Feature 4 */}
                                    <div className="relative">
                                        <dt>
                                            <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                                                <Settings className="h-6 w-6" aria-hidden="true" />
                                            </div>
                                            <p className="ml-16 text-lg leading-6 font-medium text-gray-900">⚙️ Manajemen Admin</p>
                                        </dt>
                                        <dd className="mt-2 ml-16 text-base text-gray-500">
                                            Panel admin lengkap untuk mengelola poliklinik, memanggil pasien, dan generate laporan.
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="bg-green-50">
                        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
                            <div className="max-w-4xl mx-auto text-center">
                                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                    Dipercaya Ribuan Pasien
                                </h2>
                                <p className="mt-3 text-xl text-gray-500 sm:mt-4">
                                    Bergabunglah dengan sistem antrian digital yang efisien dan modern
                                </p>
                            </div>
                            <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
                                <div className="flex flex-col">
                                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                                        Pasien Terlayani
                                    </dt>
                                    <dd className="order-1 text-5xl font-extrabold text-green-600">
                                        1000+
                                    </dd>
                                </div>
                                <div className="flex flex-col mt-10 sm:mt-0">
                                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                                        Poliklinik Aktif
                                    </dt>
                                    <dd className="order-1 text-5xl font-extrabold text-green-600">
                                        5
                                    </dd>
                                </div>
                                <div className="flex flex-col mt-10 sm:mt-0">
                                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                                        Waktu Tunggu Rata-rata
                                    </dt>
                                    <dd className="order-1 text-5xl font-extrabold text-green-600">
                                        15min
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-green-600">
                        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                                <span className="block">Siap untuk memulai?</span>
                                <span className="block">Daftar sekarang juga.</span>
                            </h2>
                            <p className="mt-4 text-lg leading-6 text-green-100">
                                Nikmati kemudahan sistem antrian digital di Puskesmas Pracimantoro 1. Daftar gratis dan mulai ambil nomor antrian hari ini!
                            </p>
                            {!auth.user && (
                                <Link
                                    href={route('register')}
                                    className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50 sm:w-auto transition-colors"
                                >
                                    🎯 Daftar Sekarang
                                </Link>
                            )}
                        </div>
                    </div>
                </main>

                <footer className="bg-gray-800">
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                        <div className="text-center">
                            <h3 className="text-lg leading-6 font-medium text-white">
                                🏥 Puskesmas Pracimantoro 1
                            </h3>
                            <p className="mt-2 text-base text-gray-300">
                                Sistem Antrian Digital - Melayani dengan Hati, Berkomitmen untuk Kesehatan
                            </p>
                            <div className="mt-8">
                                <p className="text-base text-gray-400">
                                    &copy; 2024 Puskesmas Pracimantoro 1. All rights reserved.
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}