import React from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, MapPin, Calendar } from 'lucide-react';

interface Polyclinic {
    id: number;
    name: string;
    room_number: string;
    description: string | null;
    opening_time: string;
    closing_time: string;
    is_active: boolean;
    queues?: Queue[];
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
    polyclinic?: Polyclinic;
}

interface Props {
    polyclinics: Polyclinic[];
    userQueues: Queue[];
    flash?: {
        success?: string;
        error?: string;
    };
    [key: string]: unknown;
}

export default function QueueIndex({ polyclinics, userQueues, flash }: Props) {

    const handleTakeQueue = (polyclinicId: number) => {
        router.post(route('queues.store'), {
            polyclinic_id: polyclinicId
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

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

    const getWaitingCount = (polyclinic: Polyclinic): number => {
        return polyclinic.queues?.filter(q => q.status === 'waiting').length || 0;
    };

    const getCurrentServing = (polyclinic: Polyclinic): number | null => {
        const serving = polyclinic.queues?.find(q => q.status === 'serving');
        return serving?.queue_number || null;
    };

    const hasActiveQueue = (polyclinicId: number): boolean => {
        return userQueues.some(q => q.polyclinic_id === polyclinicId);
    };

    return (
        <AppShell>
            <Head title="Sistem Antrian" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="border-b border-gray-200 pb-5">
                    <h3 className="text-2xl font-bold leading-6 text-gray-900">
                        📋 Sistem Antrian Digital
                    </h3>
                    <p className="mt-2 max-w-4xl text-sm text-gray-500">
                        Ambil nomor antrian untuk poliklinik yang tersedia. Pantau status antrian Anda secara real-time.
                    </p>
                </div>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="rounded-md bg-green-50 p-4">
                        <div className="text-sm text-green-800">{flash.success}</div>
                    </div>
                )}
                
                {flash?.error && (
                    <div className="rounded-md bg-red-50 p-4">
                        <div className="text-sm text-red-800">{flash.error}</div>
                    </div>
                )}

                {/* Current User Queues */}
                {userQueues.length > 0 && (
                    <div className="bg-blue-50 rounded-lg p-6">
                        <h4 className="text-lg font-medium text-blue-900 mb-4">
                            🎫 Antrian Anda Hari Ini
                        </h4>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {userQueues.map((queue) => (
                                <Card key={queue.id} className="border-blue-200">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-lg">
                                                {queue.polyclinic?.name}
                                            </CardTitle>
                                            <Badge className={getStatusColor(queue.status)}>
                                                {getStatusLabel(queue.status)}
                                            </Badge>
                                        </div>
                                        <CardDescription className="flex items-center">
                                            <MapPin className="h-4 w-4 mr-1" />
                                            Ruang {queue.polyclinic?.room_number}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-blue-600 mb-2">
                                                #{queue.queue_number.toString().padStart(3, '0')}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                Nomor Antrian Anda
                                            </div>
                                        </div>
                                        <div className="mt-4 flex justify-center">
                                            <Button
                                                onClick={() => router.visit(route('queues.show', queue.id))}
                                                className="w-full"
                                            >
                                                Lihat Detail
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* Available Polyclinics */}
                <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">
                        🏥 Poliklinik Tersedia
                    </h4>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {polyclinics.map((polyclinic) => {
                            const waitingCount = getWaitingCount(polyclinic);
                            const currentServing = getCurrentServing(polyclinic);
                            const userHasQueue = hasActiveQueue(polyclinic.id);

                            return (
                                <Card key={polyclinic.id} className={`transition-all hover:shadow-md ${!polyclinic.is_active ? 'opacity-60' : ''}`}>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-lg">
                                                {polyclinic.name}
                                            </CardTitle>
                                            {polyclinic.is_active ? (
                                                <Badge className="bg-green-100 text-green-800">
                                                    Buka
                                                </Badge>
                                            ) : (
                                                <Badge className="bg-red-100 text-red-800">
                                                    Tutup
                                                </Badge>
                                            )}
                                        </div>
                                        <CardDescription className="space-y-1">
                                            <div className="flex items-center">
                                                <MapPin className="h-4 w-4 mr-1" />
                                                Ruang {polyclinic.room_number}
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="h-4 w-4 mr-1" />
                                                {polyclinic.opening_time} - {polyclinic.closing_time}
                                            </div>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {polyclinic.description && (
                                            <p className="text-sm text-gray-600 mb-4">
                                                {polyclinic.description}
                                            </p>
                                        )}
                                        
                                        <div className="space-y-3">
                                            {/* Queue Stats */}
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center">
                                                    <Users className="h-4 w-4 mr-1" />
                                                    Menunggu: <span className="font-medium ml-1">{waitingCount}</span>
                                                </div>
                                                <div>
                                                    Melayani: <span className="font-medium">
                                                        {currentServing ? `#${currentServing.toString().padStart(3, '0')}` : '-'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Action Button */}
                                            <div className="pt-2">
                                                {userHasQueue ? (
                                                    <Button 
                                                        disabled 
                                                        variant="secondary"
                                                        className="w-full"
                                                    >
                                                        ✅ Sudah Mengambil Nomor
                                                    </Button>
                                                ) : polyclinic.is_active ? (
                                                    <Button
                                                        onClick={() => handleTakeQueue(polyclinic.id)}
                                                        className="w-full bg-green-600 hover:bg-green-700"
                                                    >
                                                        🎫 Ambil Nomor Antrian
                                                    </Button>
                                                ) : (
                                                    <Button 
                                                        disabled 
                                                        variant="secondary"
                                                        className="w-full"
                                                    >
                                                        🔒 Poliklinik Tutup
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* Information */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <Calendar className="h-5 w-5 text-yellow-400" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-800">
                                Informasi Penting
                            </h3>
                            <div className="mt-2 text-sm text-yellow-700">
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Nomor antrian berlaku untuk hari ini saja</li>
                                    <li>Harap datang sebelum nomor Anda dipanggil</li>
                                    <li>Jika nomor Anda terlewat, silakan ambil nomor baru</li>
                                    <li>Pantau status antrian secara real-time</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}