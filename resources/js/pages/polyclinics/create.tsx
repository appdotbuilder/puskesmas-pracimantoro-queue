import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

interface PolyclinicFormData {
    name: string;
    room_number: string;
    description: string;
    opening_time: string;
    closing_time: string;
    is_active: boolean;
    [key: string]: string | boolean;
}

export default function CreatePolyclinic() {
    const { data, setData, post, processing, errors } = useForm<PolyclinicFormData>({
        name: '',
        room_number: '',
        description: '',
        opening_time: '08:00',
        closing_time: '16:00',
        is_active: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('polyclinics.store'));
    };

    return (
        <AppShell>
            <Head title="Tambah Poliklinik" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center space-x-3">
                    <Link
                        href={route('polyclinics.index')}
                        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
                    >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Kembali ke Daftar Poliklinik
                    </Link>
                </div>

                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle className="text-2xl">🏥 Tambah Poliklinik Baru</CardTitle>
                        <CardDescription>
                            Isi form di bawah untuk menambahkan poliklinik baru ke sistem
                        </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nama Poliklinik <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="Contoh: Poli Umum"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                )}
                            </div>

                            {/* Room Number */}
                            <div>
                                <label htmlFor="room_number" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nomor Ruangan <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="room_number"
                                    type="text"
                                    value={data.room_number}
                                    onChange={(e) => setData('room_number', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="Contoh: R-01"
                                />
                                {errors.room_number && (
                                    <p className="mt-1 text-sm text-red-600">{errors.room_number}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Deskripsi
                                </label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="Deskripsi singkat tentang poliklinik ini..."
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            {/* Operating Hours */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="opening_time" className="block text-sm font-medium text-gray-700 mb-1">
                                        Jam Buka <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="opening_time"
                                        type="time"
                                        value={data.opening_time}
                                        onChange={(e) => setData('opening_time', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    />
                                    {errors.opening_time && (
                                        <p className="mt-1 text-sm text-red-600">{errors.opening_time}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="closing_time" className="block text-sm font-medium text-gray-700 mb-1">
                                        Jam Tutup <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="closing_time"
                                        type="time"
                                        value={data.closing_time}
                                        onChange={(e) => setData('closing_time', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    />
                                    {errors.closing_time && (
                                        <p className="mt-1 text-sm text-red-600">{errors.closing_time}</p>
                                    )}
                                </div>
                            </div>

                            {/* Active Status */}
                            <div className="flex items-center">
                                <input
                                    id="is_active"
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                />
                                <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                                    Poliklinik aktif dan dapat menerima antrian
                                </label>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end space-x-3 pt-4">
                                <Link
                                    href={route('polyclinics.index')}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Batal
                                </Link>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    {processing ? 'Menyimpan...' : '💾 Simpan Poliklinik'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Information */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl">
                    <h4 className="font-medium text-blue-900 mb-2">💡 Tips:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Gunakan nama yang jelas dan mudah dipahami pasien</li>
                        <li>• Pastikan nomor ruangan sesuai dengan denah puskesmas</li>
                        <li>• Jam operasional yang realistis sesuai ketersediaan dokter</li>
                        <li>• Deskripsi membantu pasien memahami layanan yang tersedia</li>
                    </ul>
                </div>
            </div>
        </AppShell>
    );
}