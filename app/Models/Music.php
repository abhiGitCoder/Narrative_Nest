<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Music extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'content_type',
        'artist',
        'cover_image',
        'duration',
        'published_date',
        'genre',
        'is_featured',
        'is_new_release',
        'audio_url'
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_new_release' => 'boolean',
        'published_date' => 'datetime',
        'duration' => 'integer'
    ];

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeNewReleases($query)
    {
        return $query->where('is_new_release', true);
    }
}