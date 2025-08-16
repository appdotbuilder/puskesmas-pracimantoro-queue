<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreQueueRequest;
use App\Models\Queue;
use App\Models\Polyclinic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QueueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $polyclinics = Polyclinic::active()
            ->with(['queues' => function ($query) {
                $query->whereDate('queue_date', today())->orderBy('queue_number');
            }])
            ->get();

        $userQueues = auth()->user()->queues()
            ->whereDate('queue_date', today())
            ->with('polyclinic')
            ->whereNotIn('status', ['cancelled', 'served'])
            ->get();

        return Inertia::render('queues/index', [
            'polyclinics' => $polyclinics,
            'userQueues' => $userQueues
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQueueRequest $request)
    {
        $polyclinic = Polyclinic::findOrFail($request->polyclinic_id);
        
        $queue = Queue::create([
            'polyclinic_id' => $polyclinic->id,
            'user_id' => auth()->id(),
            'queue_number' => $polyclinic->getNextQueueNumber(),
            'queue_date' => today(),
            'status' => 'waiting',
        ]);

        return redirect()->route('queues.show', $queue)
            ->with('success', 'Nomor antrian berhasil diambil.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Queue $queue)
    {
        $queue->load(['polyclinic', 'user']);
        
        // Check if user owns this queue or is admin
        if ($queue->user_id !== auth()->id() && !auth()->user()->isAdmin()) {
            abort(403);
        }

        return Inertia::render('queues/show', [
            'queue' => $queue,
            'position' => $queue->polyclinic->todayQueues()
                ->where('queue_number', '<', $queue->queue_number)
                ->waiting()
                ->count() + 1
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Queue $queue)
    {
        $request->validate([
            'status' => 'required|in:called,serving,served,skipped',
            'notes' => 'nullable|string',
        ]);

        $updateData = [
            'status' => $request->status,
            'notes' => $request->notes,
        ];

        if ($request->status === 'called') {
            $updateData['called_at'] = now();
        } elseif ($request->status === 'served') {
            $updateData['served_at'] = now();
        }

        $queue->update($updateData);

        return redirect()->back()
            ->with('success', 'Status antrian berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Queue $queue)
    {
        // Only allow cancellation by queue owner and only if not served
        if ($queue->user_id !== auth()->id() || $queue->status === 'served') {
            abort(403);
        }

        $queue->update(['status' => 'cancelled']);

        return redirect()->route('queues.index')
            ->with('success', 'Antrian berhasil dibatalkan.');
    }
}