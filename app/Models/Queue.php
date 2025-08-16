<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Queue
 *
 * @property int $id
 * @property int $polyclinic_id
 * @property int $user_id
 * @property int $queue_number
 * @property string $queue_date
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $called_at
 * @property \Illuminate\Support\Carbon|null $served_at
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Polyclinic $polyclinic
 * @property-read \App\Models\User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Queue newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Queue newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Queue query()
 * @method static \Illuminate\Database\Eloquent\Builder|Queue whereCalledAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Queue whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Queue whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Queue whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Queue wherePolyclinicId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Queue whereQueueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Queue whereQueueNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Queue whereServedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Queue whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Queue whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Queue whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Queue today()
 * @method static \Illuminate\Database\Eloquent\Builder|Queue waiting()
 * @method static \Illuminate\Database\Eloquent\Builder|Queue served()
 * @method static \Database\Factories\QueueFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Queue extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'polyclinic_id',
        'user_id',
        'queue_number',
        'queue_date',
        'status',
        'called_at',
        'served_at',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'queue_date' => 'date',
        'called_at' => 'datetime',
        'served_at' => 'datetime',
    ];

    /**
     * Get the polyclinic that owns this queue.
     */
    public function polyclinic(): BelongsTo
    {
        return $this->belongsTo(Polyclinic::class);
    }

    /**
     * Get the user that owns this queue.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope a query to only include today's queues.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeToday($query)
    {
        return $query->whereDate('queue_date', today());
    }

    /**
     * Scope a query to only include waiting queues.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeWaiting($query)
    {
        return $query->where('status', 'waiting');
    }

    /**
     * Scope a query to only include served queues.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeServed($query)
    {
        return $query->where('status', 'served');
    }

    /**
     * Get the status badge color.
     */
    public function getStatusColor(): string
    {
        return match($this->status) {
            'waiting' => 'bg-yellow-100 text-yellow-800',
            'called' => 'bg-blue-100 text-blue-800',
            'serving' => 'bg-green-100 text-green-800',
            'served' => 'bg-gray-100 text-gray-800',
            'skipped' => 'bg-orange-100 text-orange-800',
            'cancelled' => 'bg-red-100 text-red-800',
            default => 'bg-gray-100 text-gray-800',
        };
    }

    /**
     * Get the status label.
     */
    public function getStatusLabel(): string
    {
        return match($this->status) {
            'waiting' => 'Menunggu',
            'called' => 'Dipanggil',
            'serving' => 'Sedang Dilayani',
            'served' => 'Selesai',
            'skipped' => 'Dilewati',
            'cancelled' => 'Dibatalkan',
            default => 'Unknown',
        };
    }
}