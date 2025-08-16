<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Polyclinic
 *
 * @property int $id
 * @property string $name
 * @property string $room_number
 * @property string|null $description
 * @property string $opening_time
 * @property string $closing_time
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Queue> $queues
 * @property-read int|null $queues_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Polyclinic newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Polyclinic newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Polyclinic query()
 * @method static \Illuminate\Database\Eloquent\Builder|Polyclinic whereClosingTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Polyclinic whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Polyclinic whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Polyclinic whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Polyclinic whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Polyclinic whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Polyclinic whereOpeningTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Polyclinic whereRoomNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Polyclinic whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Polyclinic active()
 * @method static \Database\Factories\PolyclinicFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Polyclinic extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'room_number',
        'description',
        'opening_time',
        'closing_time',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
        'opening_time' => 'datetime:H:i',
        'closing_time' => 'datetime:H:i',
    ];

    /**
     * Get the queues for this polyclinic.
     */
    public function queues(): HasMany
    {
        return $this->hasMany(Queue::class);
    }

    /**
     * Scope a query to only include active polyclinics.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get today's queues for this polyclinic.
     */
    public function todayQueues()
    {
        return $this->queues()->whereDate('queue_date', today());
    }

    /**
     * Get the next queue number for today.
     */
    public function getNextQueueNumber(): int
    {
        $lastQueue = $this->todayQueues()->max('queue_number');
        return $lastQueue ? $lastQueue + 1 : 1;
    }

    /**
     * Get current serving queue number.
     */
    public function getCurrentServingNumber(): ?int
    {
        $serving = $this->todayQueues()->where('status', 'serving')->first();
        return $serving?->queue_number;
    }

    /**
     * Get waiting queues count for today.
     */
    public function getWaitingCount(): int
    {
        return $this->todayQueues()->where('status', 'waiting')->count();
    }
}