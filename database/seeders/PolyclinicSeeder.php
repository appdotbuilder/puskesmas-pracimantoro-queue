<?php

namespace Database\Seeders;

use App\Models\Polyclinic;
use App\Models\Queue;
use App\Models\User;
use Illuminate\Database\Seeder;

class PolyclinicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create specific polyclinics for Puskesmas
        $polyclinics = [
            [
                'name' => 'Poli Umum',
                'room_number' => 'R-01',
                'description' => 'Pelayanan kesehatan umum untuk dewasa',
                'opening_time' => '08:00:00',
                'closing_time' => '16:00:00',
            ],
            [
                'name' => 'Poli Anak',
                'room_number' => 'R-02',
                'description' => 'Pelayanan kesehatan khusus anak-anak',
                'opening_time' => '08:00:00',
                'closing_time' => '15:00:00',
            ],
            [
                'name' => 'Poli Gigi',
                'room_number' => 'R-03',
                'description' => 'Pelayanan kesehatan gigi dan mulut',
                'opening_time' => '08:30:00',
                'closing_time' => '16:30:00',
            ],
            [
                'name' => 'Poli Mata',
                'room_number' => 'R-04',
                'description' => 'Pelayanan kesehatan mata',
                'opening_time' => '09:00:00',
                'closing_time' => '15:00:00',
            ],
            [
                'name' => 'Poli KIA',
                'room_number' => 'R-05',
                'description' => 'Kesehatan Ibu dan Anak',
                'opening_time' => '08:00:00',
                'closing_time' => '16:00:00',
            ],
        ];

        foreach ($polyclinics as $polyclinic) {
            Polyclinic::create($polyclinic);
        }

        // Create some sample users
        $users = User::factory(10)->create();
        
        // Create some sample queues for today
        $activePolyclinics = Polyclinic::active()->get();
        
        foreach ($activePolyclinics as $polyclinic) {
            // Create 3-8 queues per polyclinic for today
            $queueCount = random_int(3, 8);
            
            for ($i = 1; $i <= $queueCount; $i++) {
                Queue::create([
                    'polyclinic_id' => $polyclinic->id,
                    'user_id' => $users->random()->id,
                    'queue_number' => $i,
                    'queue_date' => today(),
                    'status' => $i <= 2 ? 'served' : ($i === 3 ? 'serving' : 'waiting'),
                    'called_at' => $i <= 3 ? now()->subHours(random_int(1, 4)) : null,
                    'served_at' => $i <= 2 ? now()->subHours(random_int(0, 3)) : null,
                ]);
            }
        }
    }
}