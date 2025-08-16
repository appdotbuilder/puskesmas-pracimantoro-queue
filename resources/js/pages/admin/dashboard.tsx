import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Clock, CheckCircle, AlertCircle, Building, FileText } from 'lucide-react';

interface Polyclinic {
    id: number;
    name: string;
    room_number: string;
    today_queues_count: number;
    waiting_queues_count: number;
    served_queues_count: number;
}

interface Stats {
    total_polyclinics: number;
    total_queues_today: number;
    waiting_queues: number;
    served_queues: number;
}

interface Props {
    stats: Stats;
    polyclinics: Polyclinic[];
    [key: string]: unknown;
}

export default function AdminDashboard({ stats, polyclinics }: Props) {
    const handleCallNext = (polyclinicId: number) => {
        router.post(route('admin.call-next', polyclinicId), {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AppShell>
            <Head title="Dashboard Admin" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="border-b border-gray-200 pb-5">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-2xl font-bold leading-6 text-gray-900">
                                👨‍💼 Dashboard Admin
                            </h3>
                            <p className="mt-2 max-w-4xl text-sm text-gray-500">
                                Panel kontrol untuk mengelola sistem antrian Puskesmas Pracimantoro 1
                            </p>
                        </div>
                        <div className="flex space-x-3">
                            <Link
                                href={route('polyclinics.index')}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                🏥 Kelola Poliklinik
                            </Link>
                            <Button className="bg-green-600 hover:bg-green-700">
                                📊 Laporan Harian
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Poliklinik</CardTitle>
                            <Building className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{stats.total_polyclinics}</div>
                            <p className="text-xs text-muted-foreground">Poliklinik aktif</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Antrian Hari Ini</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{stats.total_queues_today}</div>
                            <p className="text-xs text-muted-foreground">Total pasien terdaftar</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Sedang Menunggu</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-600">{stats.waiting_queues}</div>
                            <p className="text-xs text-muted-foreground">Pasien dalam antrian</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Sudah Dilayani</CardTitle>
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{stats.served_queues}</div>
                            <p className="text-xs text-muted-foreground">Pasien selesai hari ini</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Polyclinic Management */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-medium text-gray-900">
                            🏥 Status Poliklinik Hari Ini
                        </h4>
                        <Link
                            href={route('polyclinics.create')}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-blue-700"
                        >
                            ➕ Tambah Poliklinik
                        </Link>
                    </div>
                    
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {polyclinics.map((polyclinic) => (
                            <Card key={polyclinic.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg">
                                            {polyclinic.name}
                                        </CardTitle>
                                        <Badge className="bg-green-100 text-green-800">
                                            Aktif
                                        </Badge>
                                    </div>
                                    <CardDescription>
                                        Ruang {polyclinic.room_number}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {/* Stats */}
                                        <div className="grid grid-cols-3 gap-4 text-center">
                                            <div>
                                                <div className="text-2xl font-bold text-blue-600">
                                                    {polyclinic.today_queues_count}
                                                </div>
                                                <div className="text-xs text-gray-500">Total</div>
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-yellow-600">
                                                    {polyclinic.waiting_queues_count}
                                                </div>
                                                <div className="text-xs text-gray-500">Menunggu</div>
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-green-600">
                                                    {polyclinic.served_queues_count}
                                                </div>
                                                <div className="text-xs text-gray-500">Selesai</div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="space-y-2">
                                            <Button className="w-full bg-green-600 hover:bg-green-700">
                                                📋 Kelola Antrian
                                            </Button>
                                            
                                            <div className="flex space-x-2">
                                                <Button
                                                    onClick={() => handleCallNext(polyclinic.id)}
                                                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                                                    size="sm"
                                                    disabled={polyclinic.waiting_queues_count === 0}
                                                >
                                                    📢 Panggil Berikutnya
                                                </Button>
                                                <Link
                                                    href={route('polyclinics.edit', polyclinic.id)}
                                                    className="inline-flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                                >
                                                    ✏️
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Queue Status Alert */}
                                        {polyclinic.waiting_queues_count > 0 ? (
                                            <div className="flex items-center p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                                                <AlertCircle className="h-4 w-4 text-yellow-600 mr-2" />
                                                <div className="text-sm text-yellow-800">
                                                    {polyclinic.waiting_queues_count} pasien menunggu
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex items-center p-2 bg-green-50 border border-green-200 rounded-lg">
                                                <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                                                <div className="text-sm text-green-800">
                                                    Semua pasien telah dilayani
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">
                        ⚡ Aksi Cepat
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center p-4 bg-white rounded-lg border hover:shadow-md transition-shadow">
                            <FileText className="h-8 w-8 text-green-600 mr-3" />
                            <div>
                                <div className="font-medium">Laporan Harian</div>
                                <div className="text-sm text-gray-500">Lihat statistik hari ini</div>
                            </div>
                        </div>
                        
                        <Link
                            href={route('polyclinics.index')}
                            className="flex items-center p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
                        >
                            <Building className="h-8 w-8 text-blue-600 mr-3" />
                            <div>
                                <div className="font-medium">Kelola Poliklinik</div>
                                <div className="text-sm text-gray-500">Tambah, edit, hapus poliklinik</div>
                            </div>
                        </Link>
                        
                        <Link
                            href={route('queues.index')}
                            className="flex items-center p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
                        >
                            <Users className="h-8 w-8 text-purple-600 mr-3" />
                            <div>
                                <div className="font-medium">Lihat Semua Antrian</div>
                                <div className="text-sm text-gray-500">Pantau status antrian real-time</div>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* System Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <CheckCircle className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-blue-800">
                                Sistem Antrian Digital - Puskesmas Pracimantoro 1
                            </h3>
                            <div className="mt-2 text-sm text-blue-700">
                                <p>
                                    Dashboard ini menampilkan status real-time dari semua poliklinik. 
                                    Gunakan tombol "Panggil Berikutnya" untuk melayani pasien atau 
                                    "Kelola Antrian" untuk kontrol lebih detail pada setiap poliklinik.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}