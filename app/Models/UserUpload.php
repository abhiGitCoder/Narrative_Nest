<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class UserUpload extends Model
{
    protected $fillable = [
        'user_id',
        'content_type',
        'content_id',
        'title',
        'description',
        'genres',
        'audio_url',
        'status',
        'file_path',
        'file_size',
        'file_type'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(Register::class, 'user_id');
    }

    public function content(): MorphTo
    {
        return $this->morphTo();
    }
}