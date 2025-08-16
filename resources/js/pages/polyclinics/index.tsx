import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Clock, MapPin, Edit, Trash2, Plus } from 'lucide-react';

interface Polyclinic {
    id: number;
    name: string;
    room_number: string;
    description: string | null;
    opening_time: string;
    closing_time: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedPolyclinics {
    data: Polyclinic[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
}

interface Props {
    polyclinics: PaginatedPolyclinics;
    flash?: {
        success?: string;
        error?: string;
    };
    [key: string]: unknown;
}

export default function PolyclinicsIndex({ polyclinics, flash }: Props) {

    const handleDelete = (polyclinic: Polyclinic) => {
        if (confirm(`Apakah Anda yakin ingin menghapus ${polyclinic.name}?`)) {
            router.delete(route('polyclinics.destroy', polyclinic.id), {
                preserveState: false,
            });
        }
    };

    const toggleStatus = (polyclinic: Polyclinic) => {
        router.patch(route('polyclinics.update', polyclinic.id), {
            ...polyclinic,
            is_active: !polyclinic.is_active,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AppShell>
            <Head title="Kelola Poliklinik" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="border-b border-gray-200 pb-5">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-2xl font-bold leading-6 text-gray-900">
                                🏥 Kelola Poliklinik
                            </h3>
                            <p className="mt-2 max-w-4xl text-sm text-gray-500">
                                Tambah, edit, dan kelola semua poliklinik di Puskesmas Pracimantoro 1
                            </p>
                        </div>
                        <div className="flex space-x-3">
                            <Link
                                href={route('admin.dashboard')}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                ← Kembali ke Dashboard
                            </Link>
                            <Link
                                href={route('polyclinics.create')}
                                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-green-700"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Tambah Poliklinik
                            </Link>
                        </div>
                    </div>
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

                {/* Stats Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                            Total: <span className="font-medium">{polyclinics.total}</span> poliklinik
                        </div>
                        <div className="text-sm text-gray-600">
                            Halaman {polyclinics.current_page} dari {polyclinics.last_page}
                        </div>
                    </div>
                </div>

                {/* Polyclinics List */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {polyclinics.data.map((polyclinic) => (
                        <Card key={polyclinic.id} className={`transition-all hover:shadow-lg ${!polyclinic.is_active ? 'opacity-75' : ''}`}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <CardTitle className="text-lg flex items-center">
                                            <Building className="h-5 w-5 mr-2 text-blue-600" />
                                            {polyclinic.name}
                                        </CardTitle>
                                        <CardDescription className="mt-1">
                                            <div className="flex items-center">
                                                <MapPin className="h-4 w-4 mr-1" />
                                                Ruang {polyclinic.room_number}
                                            </div>
                                        </CardDescription>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <Badge className={polyclinic.is_active 
                                            ? "bg-green-100 text-green-800" 
                                            : "bg-red-100 text-red-800"}>
                                            {polyclinic.is_active ? "Aktif" : "Tidak Aktif"}
                                        </Badge>
                                    </div>
                                </div>
                            </CardHeader>
                            
                            <CardContent>
                                <div className="space-y-4">
                                    {/* Description */}
                                    {polyclinic.description && (
                                        <p className="text-sm text-gray-600">
                                            {polyclinic.description}
                                        </p>
                                    )}
                                    
                                    {/* Operating Hours */}
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Clock className="h-4 w-4 mr-1" />
                                        {polyclinic.opening_time} - {polyclinic.closing_time}
                                    </div>
                                    
                                    {/* Actions */}
                                    <div className="flex flex-wrap gap-2">
                                        <Link
                                            href={route('polyclinics.show', polyclinic.id)}
                                            className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                                        >
                                            👁️ Lihat Detail
                                        </Link>
                                        
                                        <Link
                                            href={route('polyclinics.edit', polyclinic.id)}
                                            className="inline-flex items-center justify-center px-3 py-2 bg-yellow-600 text-white rounded-md text-sm font-medium hover:bg-yellow-700"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Link>
                                        
                                        <Button
                                            onClick={() => toggleStatus(polyclinic)}
                                            variant="outline"
                                            size="sm"
                                            className={polyclinic.is_active 
                                                ? "text-red-600 hover:text-red-700 hover:bg-red-50" 
                                                : "text-green-600 hover:text-green-700 hover:bg-green-50"}
                                        >
                                            {polyclinic.is_active ? "🔴 Nonaktifkan" : "🟢 Aktifkan"}
                                        </Button>
                                        
                                        <Button
                                            onClick={() => handleDelete(polyclinic)}
                                            variant="outline"
                                            size="sm"
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    {/* Quick Actions for Active Polyclinics */}
                                    {polyclinic.is_active && (
                                        <div className="pt-2 border-t">
                                            <Link
                                                href={route('admin.manage-queues', polyclinic.id)}
                                                className="w-full inline-flex items-center justify-center px-3 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700"
                                            >
                                                📋 Kelola Antrian
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {polyclinics.data.length === 0 && (
                    <div className="text-center py-12">
                        <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Belum ada poliklinik
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Mulai dengan menambahkan poliklinik pertama Anda.
                        </p>
                        <Link
                            href={route('polyclinics.create')}
                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-green-700"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Tambah Poliklinik
                        </Link>
                    </div>
                )}

                {/* Pagination */}
                {polyclinics.last_page > 1 && (
                    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                        <div className="flex flex-1 justify-between sm:hidden">
                            {polyclinics.links.find(link => link.label.includes('Previous'))?.url && (
                                <Link
                                    href={polyclinics.links.find(link => link.label.includes('Previous'))?.url || '#'}
                                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Previous
                                </Link>
                            )}
                            {polyclinics.links.find(link => link.label.includes('Next'))?.url && (
                                <Link
                                    href={polyclinics.links.find(link => link.label.includes('Next'))?.url || '#'}
                                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Next
                                </Link>
                            )}
                        </div>
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing{' '}
                                    <span className="font-medium">
                                        {(polyclinics.current_page - 1) * polyclinics.per_page + 1}
                                    </span>{' '}
                                    to{' '}
                                    <span className="font-medium">
                                        {Math.min(polyclinics.current_page * polyclinics.per_page, polyclinics.total)}
                                    </span>{' '}
                                    of{' '}
                                    <span className="font-medium">{polyclinics.total}</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                    {polyclinics.links.map((link, index) => {
                                        if (link.label.includes('Previous') || link.label.includes('Next')) {
                                            return link.url ? (
                                                <Link
                                                    key={index}
                                                    href={link.url}
                                                    className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                                >
                                                    <span className="sr-only">{link.label}</span>
                                                    {link.label.includes('Previous') ? '←' : '→'}
                                                </Link>
                                            ) : null;
                                        }
                                        
                                        return link.url ? (
                                            <Link
                                                key={index}
                                                href={link.url}
                                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                                    link.active
                                                        ? 'bg-green-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600'
                                                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                                }`}
                                            >
                                                {link.label}
                                            </Link>
                                        ) : (
                                            <span
                                                key={index}
                                                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                                            >
                                                {link.label}
                                            </span>
                                        );
                                    })}
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}