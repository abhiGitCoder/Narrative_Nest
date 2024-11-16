<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
        'episode_number',
        'published_date',
        'audio_url',
        'genre_id',
        'is_featured',
        'is_new_release'
    ];

    public function contentType()
    {
        return $this->belongsTo(ContentType::class);
    }

    public function genre()
    {
        return $this->belongsTo(Genre::class);
    }
}