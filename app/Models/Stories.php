<?php

// app/Models/Story.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Stories extends Model
{
    protected $fillable = [
        'title',
        'description',
        'content_type_id',
        'author',
        'cover_image',
        'read_time',
        'published_date',
        'genre_id',
        'is_featured',
        'is_new_release'
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_new_release' => 'boolean',
        'published_date' => 'datetime',
        'read_time' => 'integer'
    ];

    public function contentType(): BelongsTo
    {
        return $this->belongsTo(ContentType::class);
    }

    public function genre(): BelongsTo
    {
        return $this->belongsTo(Genre::class);
    }
}