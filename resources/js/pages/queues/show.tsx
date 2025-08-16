import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Clock, Users, MapPin, Printer } from 'lucide-react';

interface Polyclinic {
    id: number;
    name: string;
    room_number: string;
    description: string | null;
    opening_time: string;
    closing_time: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface Queue {
    id: number;
    polyclinic_id: number;
    user_id: number;
    queue_number: number;
    queue_date: string;
    status: string;
    called_at: string | null;
    served_at: string | null;
    notes: string | null;
    polyclinic: Polyclinic;
    user: User;
}

interface Props {
    queue: Queue;
    position: number;
    flash?: {
        success?: string;
        error?: string;
    };
    [key: string]: unknown;
}

export default function QueueShow({ queue, position, flash }: Props) {

    const getStatusColor = (status: string): string => {
        const colors = {
            waiting: 'bg-yellow-100 text-yellow-800',
            called: 'bg-blue-100 text-blue-800',
            serving: 'bg-green-100 text-green-800',
            served: 'bg-gray-100 text-gray-800',
            skipped: 'bg-orange-100 text-orange-800',
            cancelled: 'bg-red-100 text-red-800',
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    const getStatusLabel = (status: string): string => {
        const labels = {
            waiting: 'Menunggu',
            called: 'Dipanggil',
            serving: 'Sedang Dilayani',
            served: 'Selesai',
            skipped: 'Dilewati',
            cancelled: 'Dibatalkan',
        };
        return labels[status as keyof typeof labels] || 'Unknown';
    };

    const handleCancel = () => {
        if (confirm('Apakah Anda yakin ingin membatalkan antrian ini?')) {
            router.delete(route('queues.destroy', queue.id), {
                preserveState: false,
            });
        }
    };

    const handlePrint = () => {
        
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Tiket Antrian #${queue.queue_number}</title>
                        <style>
                            body { font-family: monospace; margin: 20px; }
                            .ticket { max-width: 300px; margin: 0 auto; }
                            .center { text-align: center; }
                            .number { font-size: 24px; font-weight: bold; }
                        </style>
                    </head>
                    <body>
                        <div class="ticket">
                            <div class="center">
                                <h2>PUSKESMAS PRACIMANTORO 1</h2>
                                <h3>TIKET ANTRIAN</h3>
                                <div class="number">#${queue.queue_number.toString().padStart(3, '0')}</div>
                            </div>
                            <hr>
                            <p><strong>Poliklinik:</strong> ${queue.polyclinic.name}</p>
                            <p><strong>Ruangan:</strong> ${queue.polyclinic.room_number}</p>
                            <p><strong>Tanggal:</strong> ${new Date(queue.queue_date).toLocaleDateString('id-ID')}</p>
                            <p><strong>Waktu Ambil:</strong> ${new Date().toLocaleString('id-ID')}</p>
                            <p><strong>Status:</strong> ${getStatusLabel(queue.status)}</p>
                            <hr>
                            <p style="text-align: center; font-size: 12px;">
                                Harap simpan tiket ini dan datang<br>
                                sebelum nomor Anda dipanggil.<br><br>
                                Terima kasih!
                            </p>
                        </div>
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        }
    };

    const formatDateTime = (dateTime: string | null): string => {
        if (!dateTime) return '-';
        return new Date(dateTime).toLocaleString('id-ID');
    };

    return (
        <AppShell>
            <Head title={`Antrian #${queue.queue_number} - ${queue.polyclinic.name}`} />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Link
                            href={route('queues.index')}
                            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
                        >
                            <ArrowLeft className="h-4 w-4 mr-1" />
                            Kembali ke Daftar Antrian
                        </Link>
                    </div>
                    <div className="flex space-x-3">
                        <Button
                            onClick={handlePrint}
                            variant="outline"
                            className="inline-flex items-center"
                        >
                            <Printer className="h-4 w-4 mr-2" />
                            Cetak Tiket
                        </Button>
                        {queue.status === 'waiting' && (
                            <Button
                                onClick={handleCancel}
                                variant="outline"
                                className="text-red-600 hover:text-red-700"
                            >
                                Batalkan Antrian
                            </Button>
                        )}
                    </div>
                </div>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="rounded-md bg-green-50 p-4">
                        <div className="text-sm text-green-800">{flash.success}</div>
                    </div>
                )}

                {/* Main Queue Card */}
                <Card className="border-2 border-blue-200 bg-blue-50/30">
                    <CardHeader className="text-center">
                        <div className="flex justify-center items-center space-x-4">
                            <div>
                                <CardTitle className="text-2xl">
                                    {queue.polyclinic.name}
                                </CardTitle>
                                <CardDescription className="flex items-center justify-center mt-1">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    Ruang {queue.polyclinic.room_number}
                                </CardDescription>
                            </div>
                            <Badge className={`${getStatusColor(queue.status)} text-lg px-4 py-2`}>
                                {getStatusLabel(queue.status)}
                            </Badge>
                        </div>
                        
                        <div className="mt-6">
                            <div className="text-6xl font-bold text-blue-600 mb-2">
                                #{queue.queue_number.toString().padStart(3, '0')}
                            </div>
                            <div className="text-lg text-gray-600">
                                Nomor Antrian Anda
                            </div>
                        </div>
                    </CardHeader>
                    
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Queue Information */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg">📋 Informasi Antrian</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tanggal:</span>
                                        <span className="font-medium">
                                            {new Date(queue.queue_date).toLocaleDateString('id-ID', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Waktu Jam Kerja:</span>
                                        <span className="font-medium">
                                            {queue.polyclinic.opening_time} - {queue.polyclinic.closing_time}
                                        </span>
                                    </div>
                                    {queue.status === 'waiting' && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Posisi dalam Antrian:</span>
                                            <span className="font-medium text-blue-600">
                                                #{position}
                                            </span>
                                        </div>
                                    )}
                                    {queue.called_at && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Waktu Dipanggil:</span>
                                            <span className="font-medium">{formatDateTime(queue.called_at)}</span>
                                        </div>
                                    )}
                                    {queue.served_at && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Waktu Selesai:</span>
                                            <span className="font-medium">{formatDateTime(queue.served_at)}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Status Information */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg">📊 Status Saat Ini</h3>
                                <div className="space-y-3">
                                    {queue.status === 'waiting' && (
                                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                            <div className="flex items-center">
                                                <Clock className="h-5 w-5 text-yellow-600 mr-2" />
                                                <div>
                                                    <div className="font-medium text-yellow-800">
                                                        Sedang Menunggu
                                                    </div>
                                                    <div className="text-sm text-yellow-600">
                                                        Anda berada di posisi #{position} dalam antrian
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {queue.status === 'called' && (
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                            <div className="flex items-center">
                                                <Users className="h-5 w-5 text-blue-600 mr-2" />
                                                <div>
                                                    <div className="font-medium text-blue-800">
                                                        Nomor Anda Dipanggil!
                                                    </div>
                                                    <div className="text-sm text-blue-600">
                                                        Segera menuju ruang {queue.polyclinic.room_number}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {queue.status === 'serving' && (
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                            <div className="flex items-center">
                                                <Users className="h-5 w-5 text-green-600 mr-2" />
                                                <div>
                                                    <div className="font-medium text-green-800">
                                                        Sedang Dilayani
                                                    </div>
                                                    <div className="text-sm text-green-600">
                                                        Anda sedang mendapatkan pelayanan
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {queue.status === 'served' && (
                                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                            <div className="flex items-center">
                                                <Users className="h-5 w-5 text-gray-600 mr-2" />
                                                <div>
                                                    <div className="font-medium text-gray-800">
                                                        Pelayanan Selesai
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        Terima kasih atas kunjungan Anda
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {queue.notes && (
                                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                            <h4 className="text-sm font-medium text-gray-900 mb-1">Catatan:</h4>
                                            <p className="text-sm text-gray-600">{queue.notes}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Separator className="my-6" />

                        {/* Instructions */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-medium text-blue-900 mb-2">📢 Petunjuk:</h4>
                            <ul className="text-sm text-blue-800 space-y-1">
                                <li>• Pantau status antrian secara berkala</li>
                                <li>• Harap datang ke puskesmas sebelum nomor Anda dipanggil</li>
                                <li>• Jika nomor Anda terlewat, silakan ambil nomor baru</li>
                                <li>• Bawa dokumen identitas dan kartu BPJS/asuransi jika ada</li>
                                {queue.status === 'waiting' && (
                                    <li>• Estimasi waktu tunggu berdasarkan posisi dalam antrian</li>
                                )}
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-3">
                    <Link
                        href={route('queues.index')}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                        📋 Lihat Antrian Lain
                    </Link>
                    <Button
                        onClick={handlePrint}
                        variant="outline"
                        className="inline-flex items-center"
                    >
                        <Printer className="h-4 w-4 mr-2" />
                        Cetak Ulang Tiket
                    </Button>
                    {queue.status === 'waiting' && (
                        <Button
                            onClick={handleCancel}
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                        >
                            ❌ Batalkan Antrian
                        </Button>
                    )}
                </div>
            </div>
        </AppShell>
    );
}