<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Stories extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'title',
        'description',
        'content_type',
        'author',
        'cover_image',
        'read_time',
        'published_date',
        'genres',
        'is_featured',
        'is_new_release'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_featured' => 'boolean',
        'is_new_release' => 'boolean',
        'published_date' => 'datetime',
        'read_time' => 'integer'
    ];

    /**
     * The relationships that should be eager loaded.
     *
     * @var array
     */

    /**
     * Get the content type that owns the story.
     */


    /**
     * Get the genre that owns the story.
     */

    /**
     * Scope a query to only include featured stories.
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope a query to only include new releases.
     */
    public function scopeNewReleases($query)
    {
        return $query->where('is_new_release', true);
    }

    /**
     * Get the base fields for content listing.
     */
    public function scopeBaseFields($query)
    {
        return $query->select([
            'id',
            'title',
            'description',
            'content_type',
            'author as creator',
            'cover_image',
            'read_time as duration',
            'published_date',
            'genres'
        ]);
    }
}