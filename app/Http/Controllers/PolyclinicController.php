<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePolyclinicRequest;
use App\Http\Requests\UpdatePolyclinicRequest;
use App\Models\Polyclinic;
use Inertia\Inertia;

class PolyclinicController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $polyclinics = Polyclinic::latest()->paginate(10);
        
        return Inertia::render('polyclinics/index', [
            'polyclinics' => $polyclinics
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('polyclinics/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePolyclinicRequest $request)
    {
        $polyclinic = Polyclinic::create($request->validated());

        return redirect()->route('polyclinics.index')
            ->with('success', 'Poliklinik berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Polyclinic $polyclinic)
    {
        $polyclinic->load(['queues' => function ($query) {
            $query->today()->with('user')->orderBy('queue_number');
        }]);

        return Inertia::render('polyclinics/show', [
            'polyclinic' => $polyclinic,
            'stats' => [
                'total_today' => $polyclinic->todayQueues()->count(),
                'waiting' => $polyclinic->getWaitingCount(),
                'served' => $polyclinic->todayQueues()->served()->count(),
                'current_serving' => $polyclinic->getCurrentServingNumber(),
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Polyclinic $polyclinic)
    {
        return Inertia::render('polyclinics/edit', [
            'polyclinic' => $polyclinic
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePolyclinicRequest $request, Polyclinic $polyclinic)
    {
        $polyclinic->update($request->validated());

        return redirect()->route('polyclinics.index')
            ->with('success', 'Poliklinik berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Polyclinic $polyclinic)
    {
        $polyclinic->delete();

        return redirect()->route('polyclinics.index')
            ->with('success', 'Poliklinik berhasil dihapus.');
    }
}