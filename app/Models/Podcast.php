<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Podcast extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'content_type_id',
        'host',
        'cover_image',
        'duration',
        'published_date',
        'genre_id',
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

    protected $with = ['contentType', 'genre'];

    public function contentType(): BelongsTo
    {
        return $this->belongsTo(ContentType::class);
    }

    public function genre(): BelongsTo
    {
        return $this->belongsTo(Genre::class);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeNewReleases($query)
    {
        return $query->where('is_new_release', true);
    }

    public function userUpload()
    {
        return $this->morphOne(UserUpload::class, 'content');
    }
}
