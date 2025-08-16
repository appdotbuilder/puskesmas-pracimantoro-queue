<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Polyclinic;
use App\Models\Queue;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display admin dashboard.
     */
    public function index()
    {
        $today = today();
        
        $stats = [
            'total_polyclinics' => Polyclinic::active()->count(),
            'total_queues_today' => Queue::today()->count(),
            'waiting_queues' => Queue::today()->waiting()->count(),
            'served_queues' => Queue::today()->served()->count(),
        ];

        $polyclinics = Polyclinic::active()
            ->withCount([
                'queues as today_queues_count' => function ($query) use ($today) {
                    $query->whereDate('queue_date', $today);
                },
                'queues as waiting_queues_count' => function ($query) use ($today) {
                    $query->whereDate('queue_date', $today)->where('status', 'waiting');
                },
                'queues as served_queues_count' => function ($query) use ($today) {
                    $query->whereDate('queue_date', $today)->where('status', 'served');
                }
            ])
            ->get();

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'polyclinics' => $polyclinics
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Polyclinic $polyclinic)
    {
        return Inertia::render('admin/edit', [
            'polyclinic' => $polyclinic
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        // Store logic here
        return redirect()->route('admin.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Polyclinic $polyclinic)
    {
        $polyclinic->update($request->all());
        return redirect()->route('admin.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Queue $queue)
    {
        $queue->delete();
        return redirect()->route('admin.index');
    }
}